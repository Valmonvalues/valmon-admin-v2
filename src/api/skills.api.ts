import type { TransactionResponse } from '@/types/skills.types'
import { apiClient } from './apiClient'
import type { Id, Params } from '@/types/global.type'

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

  addCategory: async (categoryData: {
    name: string
    description?: string
    image?: File | string
  }) => {
    const response = await apiClient.post('/create/category', categoryData)
    // console.log(categoryData)
    // console.log(response)
    return response.data
  },

  deleteTransaction: async (id: Id) =>
    await apiClient.delete(`/skills/transactions/${id}`),

  deleteParent: async (id: Id) =>
    await apiClient.delete(`/skills/categories/${id}`),
}
