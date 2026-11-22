import type { Id, Params } from '@/types/global.type'
import { apiClient } from './apiClient'
import type {
  Message,
  SendMessagePayload,
  TicketDetail,
  TicketsResponse,
} from '@/types/resolution.types'

const toFormData = (payload: SendMessagePayload, extra?: Record<string, Id>) => {
  const formData = new FormData()
  Object.entries(extra ?? {}).forEach(([key, value]) =>
    formData.append(key, String(value)),
  )
  formData.append('content', payload.content)
  formData.append('type', payload.type ?? 'text')
  if (payload.file) formData.append('file', payload.file)
  return formData
}

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } }

export const resolution = {
  listServices: async (params?: Params): Promise<TicketsResponse> => {
    const response = await apiClient.get('/tickets/services', { params })
    return response.data
  },

  listMarketPlace: async (params?: Params): Promise<TicketsResponse> => {
    const response = await apiClient.get('/tickets/marketplace', { params })
    return response.data
  },

  getTicketId: async (id: Id): Promise<TicketDetail> => {
    const response = await apiClient.get(`/tickets/${id}`)
    return response.data
  },

  /**
   * First message to a party. Creates their private conversation with the
   * admin. The backend returns `data: []`, so re-fetch the ticket to get the
   * new conversation from `ticket.conversations`.
   */
  sendFirstMessage: async (
    ticketId: Id,
    participantId: Id,
    payload: SendMessagePayload,
  ) => {
    const response = await apiClient.post(
      `/tickets/${ticketId}/send`,
      toFormData(payload, { participant_id: participantId }),
      multipart,
    )
    return response.data
  },

  getMessages: async (conversationId: Id): Promise<Message[]> => {
    const response = await apiClient.get(
      `/tickets/conversations/${conversationId}/messages`,
    )
    return response.data
  },

  sendMessage: async (
    conversationId: Id,
    payload: SendMessagePayload,
  ): Promise<Message> => {
    const response = await apiClient.post(
      `/tickets/conversations/${conversationId}/send`,
      toFormData(payload),
      multipart,
    )
    return response.data
  },

  /** Marks the party's messages in this conversation as read. */
  markRead: async (conversationId: Id) => {
    const response = await apiClient.post(
      `/tickets/conversations/${conversationId}/read`,
    )
    return response.data
  },

  /** Closes the ticket with a written decision. No money moves. */
  resolve: async (ticketId: Id, resolutionDecision: string) => {
    const response = await apiClient.post(`/tickets/${ticketId}/resolve`, {
      status: 'resolved',
      resolution_decision: resolutionDecision,
    })
    return response.data
  },

  /**
   * Releases escrow to the provider/seller and resolves the ticket. The
   * decision is sent so the parties' notification carries the reason.
   */
  payProvider: async (
    ticketId: Id,
    isMarketplace: boolean,
    resolutionDecision: string,
  ) => {
    const path = isMarketplace ? 'marketplace/pay-seller' : 'skills/pay-worker'
    const response = await apiClient.post(`/tickets/${ticketId}/${path}`, {
      resolution_decision: resolutionDecision,
    })
    return response.data
  },

  /** Refunds escrow to the employer/buyer and resolves the ticket. */
  refundClient: async (
    ticketId: Id,
    isMarketplace: boolean,
    resolutionDecision: string,
  ) => {
    const path = isMarketplace
      ? 'marketplace/refund-buyer'
      : 'skills/refund-employer'
    const response = await apiClient.post(`/tickets/${ticketId}/${path}`, {
      resolution_decision: resolutionDecision,
    })
    return response.data
  },
}
