import type { Params } from '@/types/global.type'
import { apiClient } from './apiClient'
import type { MarketplaceResponse } from '@/types/marketPlaces.types'

export const marketPlaces = {
  listingSummary: async (params?: Params): Promise<MarketplaceResponse> => {
    const response = await apiClient.get('/listings/summary', { params })
    console.log(response.data)
    return response.data
  },
}
