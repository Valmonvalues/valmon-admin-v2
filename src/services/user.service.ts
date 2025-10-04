import { userApi } from '@/api/user.api'
import type { Id, Params } from '@/types/global.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUser = () => {
  const queryClient = useQueryClient()
  const listUsers = (params?: Params) => {
    return useQuery({
      queryKey: ['users', params],
      queryFn: () => userApi.list(params),
    })
  }

  const getUsersSummary = useQuery({
    queryKey: ['userSummary'],
    queryFn: userApi.getUsersSummary,
  })

  const getUser = (id: Id) =>
    useQuery({
      queryKey: ['user', id],
      queryFn: () => userApi.getUser(id),
    })

  const deleteUser = useMutation({
    mutationFn: (id: Id) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return { listUsers, getUsersSummary, getUser, deleteUser }
}
