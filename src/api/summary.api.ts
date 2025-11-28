import type { SummaryData } from '@/types/summary.types'
import { apiClient } from './apiClient'
import type { Params } from '@/types/global.type'

export const summaryApi = {
  summary: async (params?: Params): Promise<SummaryData> => {
    const response = await apiClient.get('/summary', { params })
    return response.data
  },
}
