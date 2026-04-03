import { userApi } from '@/api/user.api'
import { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

const queryClient = new QueryClient()

export const routeGaurd = async (allowedRoles: string[]) => {
  const me = await queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: userApi.getMe,
  })

  if (!me) {
    throw redirect({ to: '/' })
  }

  if (allowedRoles.includes('all') || allowedRoles.includes(me.role)) {
    return
  } else {
    throw redirect({ to: '/users' })
  }

  return
}
