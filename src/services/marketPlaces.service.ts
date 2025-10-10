import { marketPlaces } from '@/api/marketPlaces.api'
import type { Params } from '@/types/global.type'
import type { MarketplaceResponse } from '@/types/marketPlaces.types'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useMarketPlaces = () => {
  //   const queryClient = useQueryClient()
  const listingSummary = (params?: Params) => {
    return useQuery<MarketplaceResponse>({
      queryKey: ['/marketPlace/listing', params],
      queryFn: () => marketPlaces.listingSummary(params),
    })
  }

  return { listingSummary }
}
