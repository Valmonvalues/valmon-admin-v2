import { categoryRequestApi } from '@/api/categoryRequest.api'
import type { Params } from '@/types/global.type'
import { useQuery } from '@tanstack/react-query'

export const useCategoryRequest = () => {
  //   const queryClient = useQueryClient()
  const listCategoryRequest = (params?: Params) => {
    return useQuery({
      queryKey: ['categoryRequest', params],
      queryFn: () => categoryRequestApi.listCategoryRequest(params),
    })
  }

  //    const approveListing = useMutation({
  //     mutationFn: (id: Id) => marketPlaces.approveListing(id),

  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['approval'] })
  //       queryClient.invalidateQueries({ queryKey: ['listing'] })
  //     },
  //   })

  //   const denyListing = useMutation({
  //     mutationFn: (id: Id) => marketPlaces.denyListing(id),

  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['approval'] })
  //       queryClient.invalidateQueries({ queryKey: ['listing'] })
  //     },
  //   })

  return { listCategoryRequest }
}
