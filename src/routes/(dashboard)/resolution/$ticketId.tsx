import { useState } from 'react'
import { routeGaurd } from '@/middleware/routeGuard'
import DashboardLayout from '@/layout/DashboardLayout'
import { useResolution } from '@/services/resolution.service'
import { useAccessManagement } from '@/hook/useAccessManagement'
import { Avatar, Badge, Loader, Menu, Text } from '@mantine/core'
import {
  IconArrowLeft,
  IconDotsVertical,
  IconStarFilled,
  IconUser,
} from '@tabler/icons-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type {
  TicketConversation,
  TicketDetail,
  TicketParticipant,
} from '@/types/resolution.types'
import PartyRoleBadge from '@/components/resolution/PartyRoleBadge'
import ResolutionChat from '@/components/resolution/ResolutionChat'
import ResolvePanel from '@/components/resolution/ResolvePanel'
import EvidenceViewer from '@/components/resolution/EvidenceViewer'

export const Route = createFileRoute('/(dashboard)/resolution/$ticketId')({
  component: TicketPage,
  loader: () =>
    routeGaurd([
      'view_service_conflicts',
      'manage_service_conflicts',
      'view_marketplace_conflicts',
      'manage_marketplace_conflicts',
    ]),
})

const fullName = (person?: TicketParticipant) =>
  person ? `${person.first_name} ${person.last_name}`.trim() : ''

/** A message from the party that the admin hasn't read yet. */
const hasUnreadFromParty = (conversation?: TicketConversation) =>
  !!conversation?.last_message &&
  conversation.last_message.user_id !== null &&
  !conversation.last_message.is_read

function TicketPage() {
  const { ticketId } = Route.useParams()
  // Keyed so selection state resets when moving between tickets.
  return <TicketView key={ticketId} ticketId={ticketId} />
}

function TicketView({ ticketId }: { ticketId: string }) {
  const navigate = useNavigate()
  const { ticketsById } = useResolution()
  const { data: ticket, isLoading, isError } = ticketsById(ticketId)

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate({ to: '/resolution' })}
        className="mb-4 flex size-9 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50"
      >
        <IconArrowLeft size={18} />
      </button>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : isError || !ticket ? (
        <Text c="dimmed" ta="center" py="xl">
          Couldn't load this ticket.
        </Text>
      ) : (
        <TicketContent ticket={ticket} ticketId={ticketId} />
      )}
    </DashboardLayout>
  )
}

function TicketContent({
  ticket,
  ticketId,
}: {
  ticket: TicketDetail
  ticketId: string
}) {
  const navigate = useNavigate()
  const { canAccess } = useAccessManagement()

  const isMarketplace = !!ticket.order
  const isResolved = ticket.status === 'resolved'
  const canManage = canAccess(
    isMarketplace ? 'manage_marketplace_conflicts' : 'manage_service_conflicts',
  )

  // Complainant first; they're usually the one to hear from first.
  const parties = [ticket.user, ticket.reported_user]
  const [selectedId, setSelectedId] = useState(ticket.user.id)
  const party = parties.find((p) => p.id === selectedId) ?? ticket.user
  const otherParty = parties.find((p) => p.id !== party.id) ?? ticket.reported_user

  const conversationFor = (partyId: number) =>
    ticket.conversations?.find((c) => c.user_id === partyId)

  const transaction = ticket.job ?? ticket.order

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* PARTIES — one private chat each */}
      <div className="flex w-full flex-col gap-3 lg:w-64">
        <Text size="xs" c="dimmed" fw={600} tt="uppercase">
          Private chats
        </Text>
        {parties.map((person) => {
          const conversation = conversationFor(person.id)
          const preview = conversation?.last_message
          return (
            <button
              key={person.id}
              onClick={() => setSelectedId(person.id)}
              className={`flex items-start gap-3 rounded-xl p-3 text-left shadow-sm ${
                party.id === person.id ? 'bg-yellow-50' : 'bg-white'
              }`}
            >
              <Avatar src={person.profile_pic} radius="xl">
                <IconUser size={18} />
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Text fw={600} size="sm" truncate>
                    {fullName(person)}
                  </Text>
                  {hasUnreadFromParty(conversation) && (
                    <span
                      className="size-2 shrink-0 rounded-full bg-red-500"
                      title="New message"
                    />
                  )}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <Text size="xs" c="dimmed" className="capitalize">
                    {person.account_type}
                  </Text>
                  <PartyRoleBadge isComplainer={person.id === ticket.user.id} />
                </div>
                <Text size="xs" c="dimmed" mt={4} truncate>
                  {preview
                    ? `${preview.user_id === null ? 'You: ' : ''}${
                        preview.content || 'Attachment'
                      }`
                    : 'Not contacted yet'}
                </Text>
              </div>
            </button>
          )
        })}
      </div>

      {/* CHAT WITH THE SELECTED PARTY */}
      <div className="flex flex-1 flex-col rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={party.profile_pic} radius="xl">
              <IconUser size={18} />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <Text fw={600}>{fullName(party)}</Text>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <IconStarFilled size={14} className="text-yellow-500" />
                  {party.rating} ({party.ratings_count} Ratings)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Text size="sm" c="dimmed" className="capitalize">
                  {party.account_type}
                </Text>
                <PartyRoleBadge isComplainer={party.id === ticket.user.id} />
              </div>
            </div>
          </div>

          <Menu position="bottom-end">
            <Menu.Target>
              <button className="flex size-8 items-center justify-center rounded-full hover:bg-gray-100">
                <IconDotsVertical size={18} />
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => navigate({ to: `/users/${party.id}` })}>
                View Profile
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {transaction?.title && (
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Regarding: {transaction.title}
            </span>
          )}
          <Badge
            variant="light"
            color={isResolved ? 'green' : 'yellow'}
            size="sm"
          >
            Ticket #{ticket.id} · {ticket.status}
          </Badge>
        </div>
        <div className="mb-4 border-t border-gray-200" />

        <ResolutionChat
          // Remount per party so the draft and scroll don't carry over.
          key={party.id}
          ticketId={ticketId}
          party={party}
          otherPartyName={fullName(otherParty)}
          conversation={conversationFor(party.id)}
          disabledReason={
            isResolved
              ? 'This dispute is resolved. Messaging is closed.'
              : !canManage
                ? 'You have view-only access to this dispute.'
                : null
          }
        />
      </div>

      {/* RESOLUTION + DETAILS */}
      <div className="flex w-full flex-col gap-5 lg:w-[320px]">
        <ResolvePanel ticket={ticket} canManage={canManage} />

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <Text fw={600} mb={4}>
            Reported by {fullName(ticket.user)}
          </Text>
          <Text size="sm" fw={600} mb="xs" className="capitalize">
            {ticket.reason?.replaceAll('_', ' ') || 'Reason'}
          </Text>
          <Text size="sm" c="dimmed" className="whitespace-pre-line">
            {ticket.description}
          </Text>
          {ticket.image_url && (
            <EvidenceViewer
              url={ticket.image_url}
              label={`Evidence from ${fullName(ticket.user)}`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
