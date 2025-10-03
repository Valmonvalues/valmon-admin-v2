import { userApi } from '@/api/user.api'
import type { Params } from '@/types/global.type'
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

  return { listUsers, getUsersSummary }
}
