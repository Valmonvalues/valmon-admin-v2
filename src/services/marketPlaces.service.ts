import { marketPlaces } from '@/api/marketPlaces.api'
import type { Id, Params } from '@/types/global.type'
import type {
  CategoryItem,
  MarketplaceResponse,
} from '@/types/marketPlaces.types'
import { notifications } from '@mantine/notifications'
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

  const chat = (id: Id) => {
    return useQuery({
      queryKey: ['conversation', id],
      queryFn: () => marketPlaces.getChat(id),
    })
  }

  const addCategory = useMutation({
    mutationFn: marketPlaces.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to add category',
        color: 'red',
      })
    },
  })

  const approveListing = useMutation({
    mutationFn: (id: Id) => marketPlaces.approveListing(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approval'] })
      queryClient.invalidateQueries({ queryKey: ['listing'] })
    },
  })

  const denyListing = useMutation({
    mutationFn: (id: Id) => marketPlaces.denyListing(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approval'] })
      queryClient.invalidateQueries({ queryKey: ['listing'] })
    },
  })

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
    chat,
    addCategory,
    approveListing,
    denyListing,
    deleteProduct,
    deleteClosed,
    deleteCategories,
  }
}
