import { categoryRequestApi } from '@/api/categoryRequest.api'
import type { Id, Params } from '@/types/global.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface ActionPayload {
  request_ids: Id[]
  action: 'approve' | 'reject'
  reason?: string
}

export const useCategoryRequest = () => {
  const queryClient = useQueryClient()

  const listCategoryRequest = (params?: Params) => {
    return useQuery({
      queryKey: ['categoryRequest', params],
      queryFn: () => categoryRequestApi.listCategoryRequest(params),
    })
  }

  const actionCategoryRequest = useMutation({
    mutationFn: (payload: ActionPayload) =>
      categoryRequestApi.actionCategoryRequest(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryRequest'] })
      queryClient.invalidateQueries({ queryKey: ['listing'] })
    },
  })

  return { listCategoryRequest, actionCategoryRequest }
}
