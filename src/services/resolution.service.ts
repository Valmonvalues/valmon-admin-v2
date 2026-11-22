import { resolution } from '@/api/resolution.api'
import type { Id, Params } from '@/types/global.type'
import type {
  Message,
  SendMessagePayload,
  TicketDetail,
  TicketsResponse,
} from '@/types/resolution.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
      queryKey: ['services', id],
      queryFn: () => resolution.getTicketId(id),
      enabled: !!id,
    })
  }

  const listMessages = (id: Id) => {
    return useQuery<Message[]>({
      queryKey: ['services', id, 'messages'],
      queryFn: () => resolution.getMessages(id),
      enabled: !!id,
    })
  }

  const sendMessage = (id: Id) => {
    return useMutation({
      mutationFn: (payload: SendMessagePayload) =>
        resolution.sendMessage(id, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['services', id, 'messages'],
        })
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error',
          message: error?.message || 'Failed to send message',
          color: 'red',
        })
      },
    })
  }

  const createConversation = (ticketId: Id) => {
    return useMutation({
      mutationFn: () => resolution.createConversation(ticketId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['services', ticketId] })
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error',
          message: error?.message || 'Failed to start conversation',
          color: 'red',
        })
      },
    })
  }

  return {
    listingServices,
    listingMarketPlace,
    ticketsById,
    listMessages,
    sendMessage,
    createConversation,
  }
}
