import { userApi } from '@/api/user.api'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  const listUsers = useQuery({
    queryKey: ['categories'],
    queryFn: userApi.list,
  })

  return { listUsers }
}
