import { notifications } from '@/api/notifications.api'
import { useQuery } from '@tanstack/react-query'

export const useNotifications = () => {
  const allNotifications = () => {
    return useQuery({
      queryKey: ['notifications'],
      queryFn: notifications.notifications,
    })
  }

  return { allNotifications }
}

// export const useNotifications = () => {
//   const allNotifications = useQuery({
//     queryKey: ['notifications'],
//     queryFn: notifications.notifications,
//   })

//   return { allNotifications }
// }
