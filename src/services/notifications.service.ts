import { notifications } from '@/api/notifications.api'
import type { Id } from '@/types/global.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useNotifications = () => {
  const queryClient = useQueryClient()

  const allNotifications = () => {
    return useQuery({
      queryKey: ['notifications'],
      queryFn: notifications.notifications,
    })
  }

  const unreadNotifications = () => {
    return useQuery({
      queryKey: ['notifications', 'unread'],
      queryFn: notifications.unreadNotifications,
    })
  }

  const readNotification = useMutation({
    mutationFn: (id: Id) => notifications.readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] })
    },
  })

  const readAllNotifications = useMutation({
    mutationFn: (ids: Id[]) => notifications.readAllNotifications(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread'] })
    },
  })

  return {
    allNotifications,
    unreadNotifications,
    readNotification,
    readAllNotifications,
  }
}
