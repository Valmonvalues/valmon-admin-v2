import { notifications } from '@mantine/notifications'

export const useHandleAdd = ({
  mutate,
  item,
}: {
  mutate: any
  item: string
}) => {
  const handleAdd = (data: FormData) => {
    mutate.mutate(data, {
      onSuccess: () => {
        notifications.show({
          title: 'Success',
          message: `${item} added successfully`,
          color: 'green',
        })
      },
      onError: (error: any) => {
        notifications.show({
          title: 'Error',
          message: error.response?.data?.message || 'Failed to add category',
          color: 'red',
        })
      },
    })
  }

  return { handleAdd }
}
