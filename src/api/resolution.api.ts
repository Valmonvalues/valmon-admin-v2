import type { Id, Params } from '@/types/global.type'
import { apiClient } from './apiClient'
import type {
  Message,
  SendMessagePayload,
  TicketDetail,
  TicketsResponse,
} from '@/types/resolution.types'

export const resolution = {
  listServices: async (params?: Params): Promise<TicketsResponse> => {
    const response = await apiClient.get('/tickets/services', {
      params,
    })
    return response.data
  },

  listMarketPlace: async (params?: Params): Promise<TicketsResponse> => {
    const response = await apiClient.get('/tickets/marketplace', {
      params,
    })
    return response.data
  },

  getTicketId: async (id: Id): Promise<TicketDetail> => {
    const response = await apiClient.get(`/tickets/${id}`)
    return response.data
  },

  createConversation: async (id: Id) => {
    const response = await apiClient.post(`/tickets/${id}/create-conversation`)
    return response.data
  },

  getMessages: async (id: Id): Promise<Message[]> => {
    const response = await apiClient.get(
      `/tickets/conversations/${id}/messages`,
    )
    return response.data
  },

  sendMessage: async (id: Id, payload: SendMessagePayload): Promise<Message> => {
    const formData = new FormData()
    formData.append('content', payload.content)
    formData.append('type', payload.type ?? 'text')
    if (payload.file) {
      formData.append('file', payload.file)
    }

    const response = await apiClient.post(
      `/tickets/conversations/${id}/send`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return response.data
  },
}
// ?perpage=10&page=1&search=
