import { marketPlaces } from '@/api/marketPlaces.api'
import type { Id, Params } from '@/types/global.type'
import type {
  CategoryItem,
  MarketplaceResponse,
} from '@/types/marketPlaces.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useMarketPlaces = () => {
  const queryClient = useQueryClient()
  const listingSummary = (params?: Params) => {
    return useQuery<MarketplaceResponse>({
      queryKey: ['listing', params],
      queryFn: () => marketPlaces.listingSummary(params),
    })
  }

  const listingApproval = (params?: Params) => {
    return useQuery<MarketplaceResponse>({
      queryKey: ['approval', params],
      queryFn: () => marketPlaces.listingApproval(params),
    })
  }

  const listingClosed = (params?: Params) => {
    return useQuery<MarketplaceResponse>({
      queryKey: ['closed', params],
      queryFn: () => marketPlaces.listingClosed(params),
    })
  }

  const listingCategories = (params?: Params) => {
    return useQuery<CategoryItem[]>({
      queryKey: ['categories', params],
      queryFn: () => marketPlaces.listingCategories(params),
    })
  }

  const listingId = (id: Id) => {
    return useQuery({
      queryKey: ['listingId', id],
      queryFn: () => marketPlaces.getListingId(id),
    })
  }

  // const addCategory = useMutation({
  //   mutationFn: marketPlaces.addCategory,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['categories'] })
  //     notifications.show({
  //       title: 'Success',
  //       message: 'Category added successfully',
  //       color: 'green',
  //     })
  //   },
  //   onError: (error: any) => {
  //     notifications.show({
  //       title: 'Error',
  //       message: error.response?.data?.message || 'Failed to add category',
  //       color: 'red',
  //     })
  //   },
  // })

  const deleteProduct = useMutation({
    mutationFn: (id: Id) => marketPlaces.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing'] })
    },
  })

  const deleteClosed = useMutation({
    mutationFn: (id: Id) => marketPlaces.deleteClosed(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['closed'] })
    },
  })

  const deleteCategories = useMutation({
    mutationFn: (id: Id) => marketPlaces.deleteCategories(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return {
    listingSummary,
    listingApproval,
    listingClosed,
    listingCategories,
    listingId,
    // addCategory,
    deleteProduct,
    deleteClosed,
    deleteCategories,
  }
}
