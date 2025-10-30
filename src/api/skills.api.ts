import type {
  // CustomersResponse,
  TransactionResponse,
} from '@/types/skills.types'
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

  addCategory: async (categoryData: FormData) => {
    const response = await apiClient.post('/create/category', categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  addSubCategory: async (subCategoryData: {
    name: string
    description?: string
    image?: File | string
  }) => {
    const response = await apiClient.post('/create/service', subCategoryData)
    return response.data
  },

  editSubCategory: async (
    id: Id,
    subCategoryData: {
      name: string
      description?: string
      image?: File | string
    },
  ) => {
    const response = await apiClient.put(`/services/${id}`, subCategoryData)
    return response.data
  },

  getParentSubCategory: async (id: Id, params?: Params) => {
    const response = await apiClient.get(`/skills/${id}/sub-categories`, {
      params,
    })
    return response.data
  },

  getCustomers: async (id: Id, params?: Params) => {
    const response = await apiClient.get(`/skills/${id}/customers`, {
      params,
    })
    return response.data
  },

  deleteTransaction: async (id: Id) =>
    await apiClient.delete(`/skills/transactions/${id}`),

  deleteParent: async (id: Id) =>
    await apiClient.delete(`/skills/categories/${id}`),

  deleteSubCategory: async (id: Id) =>
    await apiClient.delete(`/services/${id}`),
}
