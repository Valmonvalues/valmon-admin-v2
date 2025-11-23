import type { SummaryData } from '@/types/summary.types'
import { apiClient } from './apiClient'

export const summaryApi = {
  summary: async (): Promise<SummaryData> => {
    const response = await apiClient.get('/summary')
    return response.data
  },
}
