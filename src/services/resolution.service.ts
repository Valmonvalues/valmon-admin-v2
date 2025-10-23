import { resolution } from '@/api/resolution.api'
import type { Params } from '@/types/global.type'
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

  return {
    listingServices,
    listingMarketPlace,
  }
}
