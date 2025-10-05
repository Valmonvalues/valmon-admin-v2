import type { TransactionResponse } from '@/types/skills.types'
import { apiClient } from './apiClient'
import type { Params } from '@/types/global.type'

export const skillsApi = {
  listTransaction: async (params?: Params): Promise<TransactionResponse> => {
    const response = await apiClient.get('/skills/transactions', { params })
    // console.log(response)
    return response.data
  },

  listCategories: async (params?: Params) => {
    const response = await apiClient.get('/skills/categories', { params })
    return response.data
  },
}
