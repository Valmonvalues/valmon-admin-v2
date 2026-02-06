import { resolution } from '@/api/resolution.api'
import type { Id, Params } from '@/types/global.type'
import type { TicketsResponse } from '@/types/resolution.types'
import { useQuery } from '@tanstack/react-query'

export const useResolution = () => {
  //   const queryClient = useQueryClient()

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
    return useQuery({
      queryKey: ['services', id],
      queryFn: () => resolution.getTicketId(id),
    })
  }

  const listMessages = (id: Id) => {
    return useQuery({
      queryKey: ['services', id, 'messages'],
      queryFn: () => resolution.getMessages(id),
    })
  }

  return {
    listingServices,
    listingMarketPlace,
    ticketsById,
    listMessages,
  }
}
