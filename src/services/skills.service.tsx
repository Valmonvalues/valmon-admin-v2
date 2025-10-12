import { skillsApi } from '@/api/skills.api'
import type { Id, Params } from '@/types/global.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useSkills = () => {
  const queryClient = useQueryClient()
  const listSkills = (params?: Params) => {
    return useQuery({
      queryKey: ['transactions', params],
      queryFn: () => skillsApi.listTransaction(params),
    })
  }

  const listCategories = (params?: Params) => {
    return useQuery({
      queryKey: ['categories', params],
      queryFn: () => skillsApi.listCategories(params),
    })
  }

  const deleteTransaction = useMutation({
    mutationFn: (id: Id) => skillsApi.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const deleteParent = useMutation({
    mutationFn: (id: Id) => skillsApi.deleteParent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  return { listSkills, listCategories, deleteTransaction, deleteParent }
}
