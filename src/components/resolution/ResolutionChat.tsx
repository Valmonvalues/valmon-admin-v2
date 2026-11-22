import { useEffect, useRef, useState } from 'react'
import { Avatar, Loader, Text } from '@mantine/core'
import {
  IconFileText,
  IconLock,
  IconPlus,
  IconSend2,
  IconShieldCheck,
  IconUser,
} from '@tabler/icons-react'
import { useResolution } from '@/services/resolution.service'
import type {
  Message,
  SendMessagePayload,
  TicketConversation,
  TicketParticipant,
} from '@/types/resolution.types'
import { formatDate } from '@/utils/helper'
import EvidenceViewer from './EvidenceViewer'

type Props = {
  ticketId: string
  party: TicketParticipant
  otherPartyName: string
  conversation?: TicketConversation
  /** Messaging is off once the ticket is resolved or without manage access. */
  disabledReason?: string | null
}

const fullName = (p: TicketParticipant) =>
  `${p.first_name} ${p.last_name}`.trim()

const fileType = (file: File): NonNullable<SendMessagePayload['type']> =>
  file.type.startsWith('image/')
    ? 'image'
    : file.type.startsWith('video/')
      ? 'video'
      : 'document'

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

/** Admin ⇄ one party. Each party has their own private conversation. */
export default function ResolutionChat({
  ticketId,
  party,
  otherPartyName,
  conversation,
  disabledReason,
}: Props) {
  const { listMessages, sendToParty, markRead } = useResolution()
  const conversationId = conversation?.id ?? null

  const { data: messages = [], isLoading } = listMessages(conversationId)
  const { mutate: send, isPending: isSending } = sendToParty(ticketId)
  const { mutate: markAsRead, isPending: isMarkingRead } = markRead(ticketId)

  const [draft, setDraft] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  // Messages from the party the admin hasn't read yet. (The conversation's
  // unread_count also counts the admin's own unread messages, so it can't
  // be used for this.)
  const unreadFromParty = messages.filter(
    (m) => m.user_id !== null && !m.is_read,
  ).length

  useEffect(() => {
    if (conversationId && unreadFromParty > 0 && !isMarkingRead) {
      markAsRead(conversationId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, unreadFromParty])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, conversationId])

  const canSend = !disabledReason && !isSending

  const sendPayload = (payload: SendMessagePayload, onSuccess?: () => void) =>
    send(
      { conversationId, participantId: party.id, payload },
      { onSuccess },
    )

  const handleSend = () => {
    const content = draft.trim()
    if (!content || !canSend) return
    sendPayload({ content, type: 'text' }, () => setDraft(''))
  }

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !canSend) return
    sendPayload({ content: file.name, type: fileType(file), file })
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="h-[500px] overflow-y-auto pr-1">
        {!conversation ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <IconLock size={28} className="text-gray-300" />
            <Text fw={600}>You haven't contacted {fullName(party)} yet</Text>
            <Text size="sm" c="dimmed" maw={420}>
              Your first message opens a private chat with {fullName(party)}.{' '}
              {otherPartyName} won't see it — each party has their own chat
              with Valmon.
            </Text>
          </div>
        ) : isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader size="sm" />
          </div>
        ) : (
          <>
            <Text ta="center" size="xs" c="dimmed" mb="md">
              Private chat with {fullName(party)} · started{' '}
              {formatDate(conversation.created_at)}
            </Text>
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageRow key={msg.id} msg={msg} party={party} />
              ))}
            </div>
          </>
        )}
        <div ref={endRef} />
      </div>

      {disabledReason ? (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gray-50 px-4 py-3 text-sm text-gray-500">
          <IconLock size={16} />
          {disabledReason}
        </div>
      ) : (
        <div className="mt-6 flex items-center gap-2 rounded-full border border-gray-200 px-2 py-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!canSend}
            title="Attach a file"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-dark-gold text-white disabled:opacity-50"
          >
            <IconPlus size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleAttach}
          />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              conversation
                ? `Message ${fullName(party)}`
                : `Start a private chat with ${fullName(party)}`
            }
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend || !draft.trim()}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-dark-gold text-white disabled:opacity-50"
          >
            {isSending ? (
              <Loader size={14} color="white" />
            ) : (
              <IconSend2 size={16} />
            )}
          </button>
        </div>
      )}
    </div>
  )
}

function MessageRow({ msg, party }: { msg: Message; party: TicketParticipant }) {
  // Admin messages have no user (admins live in a separate table).
  const fromAdmin = msg.user_id === null

  return (
    <div className={`flex ${fromAdmin ? 'justify-end' : 'justify-start'}`}>
      <div className="flex max-w-[75%] items-end gap-2">
        {!fromAdmin && (
          <Avatar src={party.profile_pic} radius="xl" size="sm">
            <IconUser size={12} />
          </Avatar>
        )}
        <div
          className={`rounded-lg p-3 ${
            fromAdmin ? 'bg-yellow-100 text-gray-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-gray-500">
            {fromAdmin ? (
              <>
                <IconShieldCheck size={12} /> Valmon Support
              </>
            ) : (
              fullName(party)
            )}
          </div>

          <MessageBody msg={msg} />

          <div className="mt-1 text-right text-xs text-gray-500">
            {formatTime(msg.created_at)}
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageBody({ msg }: { msg: Message }) {
  if (msg.type === 'image' && msg.file_path) {
    return (
      <EvidenceViewer
        url={msg.file_path}
        label={msg.file_name || 'Image'}
        thumbnailClassName="max-h-60 rounded-md object-cover"
      />
    )
  }
  if (msg.type === 'video' && msg.file_path) {
    return (
      <video src={msg.file_path} controls className="max-h-60 rounded-md" />
    )
  }
  if (msg.file_path) {
    return (
      <a
        href={msg.file_path}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-sm text-blue-700 underline"
      >
        <IconFileText size={16} />
        {msg.file_name || msg.content || 'Attachment'}
      </a>
    )
  }
  return <Text size="sm">{msg.content}</Text>
}
