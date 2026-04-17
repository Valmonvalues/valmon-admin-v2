import { accountManagersApi } from '@/api/accountManagers.api'
import type { Id, Params } from '@/types/global.type'
import { notifications } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAccountManagers = () => {
  const queryClient = useQueryClient()

  const listAccountManagers = (params?: Params) => {
    return useQuery({
      queryKey: ['accountManagers', params],
      queryFn: () => accountManagersApi.listManagers(params),
    })
  }

  const addManager = useMutation({
    mutationFn: accountManagersApi.addManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountManagers'] })
      notifications.show({
        title: 'Success',
        message: 'Admin added successfully',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to add Admin',
        color: 'red',
      })
    },
  })

  const updateManager = useMutation({
    mutationFn: ({ id, updatedData }: { id: Id; updatedData: FormData }) =>
      accountManagersApi.updateManager(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountManagers'] })
      notifications.show({
        title: 'Success',
        message: 'Admin updated successfully',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update admin',
        color: 'red',
      })
    },
  })

  const deleteManager = useMutation({
    mutationFn: (id: Id) => accountManagersApi.deleteManager(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['accountManagers'],
      })
    },
  })

  return { listAccountManagers, addManager, updateManager, deleteManager }
}
