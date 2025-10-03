import { userApi } from '@/api/user.api'
import type { Id, Params } from '@/types/global.type'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
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

  return { listUsers, getUsersSummary, getUser }
}
