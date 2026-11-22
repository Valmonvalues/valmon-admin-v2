import { resolution } from '@/api/resolution.api'
import type { Id, Params } from '@/types/global.type'
import type {
  Message,
  ResolutionAction,
  SendMessagePayload,
  TicketDetail,
  TicketsResponse,
} from '@/types/resolution.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const ticketKey = (id: Id) => ['resolution-ticket', String(id)]
const messagesKey = (conversationId: Id) => [
  'resolution-messages',
  String(conversationId),
]

// How often an open ticket/chat re-checks for replies from the parties.
const POLL_MS = 15_000

const showError = (fallback: string) => (error: any) =>
  notifications.show({
    title: 'Error',
    message: error?.message || fallback,
    color: 'red',
  })

export const useResolution = () => {
  const queryClient = useQueryClient()

  const listingServices = (params?: Params) => {
    return useQuery<TicketsResponse>({
      queryKey: ['services', params],
      queryFn: () => resolution.listServices(params),
    })
  }

  const listingMarketPlace = (params?: Params) => {
    return useQuery<TicketsResponse>({
      queryKey: ['marketplace', params],
      queryFn: () => resolution.listMarketPlace(params),
    })
  }

  const ticketsById = (id: Id) => {
    return useQuery<TicketDetail>({
      queryKey: ticketKey(id),
      queryFn: () => resolution.getTicketId(id),
      enabled: !!id,
      // Keeps each party's last message / unread state fresh in the sidebar.
      refetchInterval: POLL_MS,
    })
  }

  const listMessages = (conversationId?: Id | null) => {
    return useQuery<Message[]>({
      queryKey: messagesKey(conversationId ?? ''),
      queryFn: () => resolution.getMessages(conversationId as Id),
      enabled: !!conversationId,
      refetchInterval: POLL_MS,
    })
  }

  /**
   * Sends to a party: into their existing conversation, or — if the admin
   * hasn't contacted them yet — as the first message, which creates it.
   */
  const sendToParty = (ticketId: Id) => {
    return useMutation({
      mutationFn: ({
        conversationId,
        participantId,
        payload,
      }: {
        conversationId?: Id | null
        participantId: Id
        payload: SendMessagePayload
      }) =>
        conversationId
          ? resolution.sendMessage(conversationId, payload)
          : resolution.sendFirstMessage(ticketId, participantId, payload),
      onSuccess: (_, { conversationId }) => {
        if (conversationId) {
          queryClient.invalidateQueries({
            queryKey: messagesKey(conversationId),
          })
        }
        queryClient.invalidateQueries({ queryKey: ticketKey(ticketId) })
      },
      onError: showError('Failed to send message'),
    })
  }

  const markRead = (ticketId: Id) => {
    return useMutation({
      mutationFn: (conversationId: Id) => resolution.markRead(conversationId),
      onSuccess: (_, conversationId) => {
        queryClient.invalidateQueries({ queryKey: messagesKey(conversationId) })
        queryClient.invalidateQueries({ queryKey: ticketKey(ticketId) })
      },
      // Silent: failing to mark read shouldn't interrupt the admin.
    })
  }

  const resolveTicket = (ticketId: Id, isMarketplace: boolean) => {
    return useMutation({
      mutationFn: ({
        action,
        decision,
      }: {
        action: ResolutionAction
        decision: string
      }) => {
        if (action === 'pay') {
          return resolution.payProvider(ticketId, isMarketplace, decision)
        }
        if (action === 'refund') {
          return resolution.refundClient(ticketId, isMarketplace, decision)
        }
        return resolution.resolve(ticketId, decision)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ticketKey(ticketId) })
        queryClient.invalidateQueries({ queryKey: ['services'] })
        queryClient.invalidateQueries({ queryKey: ['marketplace'] })
        notifications.show({
          title: 'Dispute resolved',
          message: 'Both parties have been notified of the decision.',
          color: 'green',
        })
      },
      onError: showError('Failed to resolve dispute'),
    })
  }

  return {
    listingServices,
    listingMarketPlace,
    ticketsById,
    listMessages,
    sendToParty,
    markRead,
    resolveTicket,
  }
}
