import { useEffect, useRef, useState } from 'react'
import { routeGaurd } from '@/middleware/routeGuard'
import DashboardLayout from '@/layout/DashboardLayout'
import { useResolution } from '@/services/resolution.service'
import { useMarketPlaces } from '@/services/marketPlaces.service'
import { Avatar, Menu, Text } from '@mantine/core'
import {
  IconArrowLeft,
  IconDotsVertical,
  IconMoodSmile,
  IconPlus,
  IconSend2,
  IconStarFilled,
  IconUser,
} from '@tabler/icons-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Message, TicketParticipant } from '@/types/resolution.types'
import { formatDate } from '@/utils/helper'
import { formatNumber } from '@/utils/formatters'

export const Route = createFileRoute('/(dashboard)/resolution/$ticketId')({
  component: ChatView,
  loader: () =>
    routeGaurd([
      'view_service_conflicts',
      'manage_service_conflicts',
      'view_marketplace_conflicts',
      'manage_marketplace_conflicts',
    ]),
})

const fullName = (person?: TicketParticipant) =>
  person ? `${person.first_name} ${person.last_name}`.trim() : undefined

function ChatView() {
  const navigate = useNavigate()
  const { ticketId } = Route.useParams()
  const { ticketsById, listMessages, sendMessage, createConversation } =
    useResolution()
  const { listingId } = useMarketPlaces()
  const { data, isLoading } = ticketsById(ticketId)

  const transaction = data?.job ?? data?.order ?? null
  const isMarketplace = !!data?.order

  // The dispute gets its own conversation, separate from whatever chat the
  // two parties already had while working the job/order — reusing that one
  // would leak their pre-dispute messages into the admin's resolution chat.
  const [disputeConversationId, setDisputeConversationId] = useState<
    number | string
  >('')
  // create-conversation's response is richer than GET /tickets/:id — it
  // includes the real service/listing name, which has no other working
  // endpoint to fetch from right now.
  const [conversationTitle, setConversationTitle] = useState<string | null>(
    null,
  )
  const { mutate: startConversation, isPending: isCreatingConversation } =
    createConversation(ticketId)

  // The route component is reused across ticket ids (TanStack Router keeps
  // it mounted when only the $ticketId param changes), so state from the
  // previous ticket must be cleared before re-provisioning for the new one —
  // otherwise the stale conversation id sticks around and create-conversation
  // never fires again.
  useEffect(() => {
    setDisputeConversationId('')
    setConversationTitle(null)
  }, [ticketId])

  useEffect(() => {
    if (!isLoading && data && !disputeConversationId) {
      startConversation(undefined, {
        onSuccess: (res: any) => {
          const id =
            res?.data?.conversation_id ??
            res?.conversation_id ??
            res?.data?.id ??
            res?.id
          if (id) setDisputeConversationId(id)

          const title = res?.data?.service?.name ?? res?.data?.listing?.title
          if (title) setConversationTitle(title)
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data, disputeConversationId, ticketId])

  const conversationId = disputeConversationId

  const { data: rawMessages } = listMessages(conversationId)
  const { mutate: send, isPending } = sendMessage(conversationId)

  // `create-conversation` doesn't spin up a fresh thread — it hands back the
  // parties' existing job/order conversation, negotiation history included.
  // Since there's no backend concept of a dispute-only thread, hide anything
  // sent before the ticket itself was raised so the admin only sees messages
  // relevant to the dispute.
  const messages = rawMessages?.filter(
    (m) =>
      !data?.created_at || new Date(m.created_at) >= new Date(data.created_at),
  )

  const { data: listingDetail } = listingId(
    transaction?.listing_id ?? '',
    transaction?.listing_id ? undefined : 'categories',
  )

  const [draft, setDraft] = useState('')
  const [focusedId, setFocusedId] = useState<number | null>(null)
  const [readMessageIds, setReadMessageIds] = useState<Set<number>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFocusedId(null)
    setReadMessageIds(new Set())
    setDraft('')
  }, [ticketId])

  // No mark-as-read endpoint exists yet, so treat "has been visible on
  // screen for a moment" as read, purely for the unread-dot indicator.
  useEffect(() => {
    if (!messages?.length) return
    const timer = setTimeout(() => {
      setReadMessageIds((prev) => {
        const next = new Set(prev)
        messages.forEach((m) => next.add(m.id))
        return next
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [messages])

  const focusedParticipant =
    focusedId === data?.user.id
      ? data?.user
      : focusedId === data?.reported_user.id
        ? data?.reported_user
        : (data?.reported_user ?? data?.user)

  const complainerId = data?.user.id
  const reportedId = data?.reported_user.id

  const hasUnreadFrom = (participantId?: number) =>
    !!participantId &&
    messages?.some(
      (m) => m.user_id === participantId && !readMessageIds.has(m.id),
    )

  const transactionTitle =
    conversationTitle ||
    transaction?.title ||
    listingDetail?.title ||
    (transaction?.service_id
      ? `Service #${transaction.service_id}`
      : transaction?.listing_id
        ? `Listing #${transaction.listing_id}`
        : null)

  const handleSend = () => {
    if (!draft.trim() || isPending || !conversationId) return
    send(
      { content: draft.trim(), type: 'text' },
      { onSuccess: () => setDraft('') },
    )
  }

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || isPending || !conversationId) return
    const type = file.type.startsWith('image/') ? 'image' : 'document'
    send({ content: file.name, type, file })
    e.target.value = ''
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate({ to: '/resolution' })}
        className="flex items-center justify-center size-9 rounded-full bg-white shadow-sm hover:bg-gray-50 mb-4"
      >
        <IconArrowLeft size={18} />
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* PARTICIPANTS LIST */}
        <div className="w-full lg:w-64 flex flex-col gap-3">
          {[data?.user, data?.reported_user]
            .filter((p): p is TicketParticipant => !!p)
            .map((person) => (
              <button
                key={person.id}
                onClick={() => setFocusedId(person.id)}
                className={`flex items-center gap-3 rounded-xl p-3 text-left shadow-sm ${
                  focusedParticipant?.id === person.id
                    ? 'bg-yellow-50'
                    : 'bg-white'
                }`}
              >
                <Avatar src={person.profile_pic} radius="xl">
                  {!person.profile_pic && <IconUser size={18} />}
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Text fw={600} size="sm">
                      {fullName(person)}
                    </Text>
                    {hasUnreadFrom(person.id) && (
                      <span className="size-2 rounded-full bg-red-500" />
                    )}
                  </div>
                  <Text size="xs" c="dimmed" className="capitalize">
                    {person.account_type}
                  </Text>
                </div>
              </button>
            ))}
        </div>

        {/* CHAT PANEL */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Avatar src={focusedParticipant?.profile_pic} radius="xl">
                {!focusedParticipant?.profile_pic && <IconUser size={18} />}
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <Text fw={600}>{fullName(focusedParticipant)}</Text>
                  {focusedParticipant?.rating !== undefined && (
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <IconStarFilled size={14} className="text-yellow-500" />
                      {focusedParticipant.rating} (
                      {focusedParticipant.ratings_count} Ratings)
                    </span>
                  )}
                </div>
                <Text size="sm" c="dimmed" className="capitalize">
                  {focusedParticipant?.account_type}
                </Text>
              </div>
            </div>

            <Menu position="bottom-end">
              <Menu.Target>
                <button className="flex items-center justify-center size-8 rounded-full hover:bg-gray-100">
                  <IconDotsVertical size={18} />
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() =>
                    focusedParticipant &&
                    navigate({ to: `/users/${focusedParticipant.id}` })
                  }
                >
                  View Profile
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          {transactionTitle && (
            <div className="mb-4">
              <span className="inline-block text-xs font-medium bg-gray-100 text-gray-700 rounded-full px-3 py-1">
                Regarding: {transactionTitle}
              </span>
            </div>
          )}

          <div className="text-center text-gray-500 mb-2">
            Your conversation with {fullName(focusedParticipant) ?? 'the group'}{' '}
            starts here
          </div>
          <div className="border-t border-gray-200 my-4"></div>

          {data?.created_at && (
            <Text ta="center" fw={600} mb={4}>
              {formatDate(data.created_at)}
            </Text>
          )}

          <div className="h-[500px] space-y-6 mt-6 overflow-y-auto">
            {isCreatingConversation ? (
              <Text ta="center" c="dimmed" size="sm">
                Setting up conversation...
              </Text>
            ) : !conversationId ? (
              <Text ta="center" c="dimmed" size="sm">
                Conversation is not available for this ticket yet
              </Text>
            ) : !messages?.length ? (
              <Text ta="center" c="dimmed" size="sm">
                No messages yet
              </Text>
            ) : null}

            {messages?.map((msg: Message) => {
              const fromAdmin =
                msg.user_id !== complainerId && msg.user_id !== reportedId
              const fromReported = msg.user_id === reportedId

              const bubbleColor = fromAdmin
                ? 'bg-yellow-100 text-gray-800'
                : fromReported
                  ? 'bg-blue-50 text-gray-800'
                  : 'bg-gray-100 text-gray-800'

              return (
                <div
                  key={msg.id}
                  className={`flex ${fromAdmin ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`relative max-w-[75%] rounded-lg p-3 ${bubbleColor}`}
                  >
                    <Avatar
                      src={msg.user?.profile_pic}
                      radius="xl"
                      size="sm"
                      className={`absolute -top-3 border-2 border-white ${
                        fromAdmin ? '-left-3' : '-right-3'
                      }`}
                      title={`${msg.user?.first_name} ${msg.user?.last_name}`}
                    >
                      {!msg.user?.profile_pic && <IconUser size={12} />}
                    </Avatar>

                    {msg.type === 'image' && msg.file_path && (
                      <img
                        src={msg.file_path}
                        className="mb-2 max-h-60 rounded-md object-cover"
                      />
                    )}
                    {msg.type === 'negotiation' && msg.negotiation && (
                      <Text size="sm" fw={600}>
                        Offered NGN {formatNumber(msg.negotiation.price_offer)}
                      </Text>
                    )}
                    {msg.content && <Text size="sm">{msg.content}</Text>}

                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>
                        {msg.updated_at !== msg.created_at && (
                          <span className="italic text-blue-400 mr-1">
                            Edited
                          </span>
                        )}
                      </span>
                      <span>
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* MESSAGE INPUT */}
          <div className="flex items-center gap-2 mt-6 border border-gray-200 rounded-full px-2 py-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={!conversationId}
              className="flex items-center justify-center size-9 rounded-full bg-dark-gold text-white disabled:opacity-50 shrink-0"
            >
              <IconPlus size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleAttach}
            />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="New Message"
              className="flex-1 outline-none text-sm bg-transparent"
            />
            <IconMoodSmile size={18} className="text-gray-400 shrink-0" />
            <button
              onClick={handleSend}
              disabled={isPending || !draft.trim() || !conversationId}
              className="flex items-center justify-center size-9 rounded-full bg-dark-gold text-white disabled:opacity-50 shrink-0"
            >
              <IconSend2 size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT DETAILS SECTION */}
        <div className="w-full lg:w-[320px] flex flex-col gap-5">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <Text fw={600} mb="xs">
              {isMarketplace ? 'Listing Cost' : 'Service Cost'}
            </Text>
            <Text
              size="xl"
              fw={700}
              className="bg-gray-100 rounded-md px-3 py-2 text-gray-800"
            >
              {transaction?.amount
                ? `NGN ${formatNumber(transaction.amount)}`
                : '—'}
            </Text>

            <div className="flex flex-col gap-2 mt-4">
              <button className="btn rounded-2xl bg-layout text-white hover:opacity-90 border-none">
                {isMarketplace ? 'Pay Seller' : 'Pay Service Provider'}
              </button>
              <button className="btn rounded-2xl btn-outline border-2 border-gray-800 text-gray-800">
                {isMarketplace ? 'Refund Buyer' : 'Refund Employer'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <Text fw={600} mb="xs" className="capitalize">
              {data?.reason?.replaceAll('_', ' ') || 'Reason'}
            </Text>
            <Text size="sm" c="dimmed">
              {data?.description}
            </Text>
            {data?.image_url && (
              <img
                src={data.image_url}
                className="mt-3 w-full h-[140px] rounded-md object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
