import type { Id, Params } from '@/types/global.type'
import { apiClient } from './apiClient'
import type {
  CategoryItem,
  MarketplaceResponse,
} from '@/types/marketPlaces.types'

export const marketPlaces = {
  listingSummary: async (params?: Params): Promise<MarketplaceResponse> => {
    const response = await apiClient.get('/listings/summary', { params })
    return response.data
  },

  listingApproval: async (params?: Params): Promise<MarketplaceResponse> => {
    const response = await apiClient.get('/listings/awaiting', { params })
    return response.data
  },

  listingClosed: async (params?: Params): Promise<MarketplaceResponse> => {
    const response = await apiClient.get('/listings/closed', { params })
    return response.data
  },

  listingCategories: async (params?: Params): Promise<CategoryItem[]> => {
    const response = await apiClient.get('/listings/categories', { params })
    // console.log(response.data)
    return response.data
  },

  deleteProduct: async (id: Id) =>
    await apiClient.delete(`/listings/summary/${id}`),

  // deleteApproval: async (id: Id) =>
  //   await apiClient.delete(`/listings/awaiting${id}`),

  deleteClosed: async (id: Id) =>
    await apiClient.delete(`/listings/closed/${id}`),

  deleteCategories: async (id: Id) =>
    await apiClient.delete(`/listings/categories/${id}`),
}
