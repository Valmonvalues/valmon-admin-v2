import type { Id, Params } from '@/types/global.type'
import { apiClient } from './apiClient'
import type { TicketsResponse } from '@/types/resolution.types'

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

  getTicketId: async (id: Id) => {
    const response = await apiClient.get(`/tickets/${id}`)
    return response.data
  },

  getMessages: async (id: Id) => {
    const response = await apiClient.get(`/ticket/conversations/${id}/messages`)
    return response.data
  },
}
// ?perpage=10&page=1&search=
