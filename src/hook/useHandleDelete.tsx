import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import type { Id } from '@/types/global.type'
import type { UseMutationResult } from '@tanstack/react-query'

interface UseDeleteOptions {
  mutation: UseMutationResult<any, unknown, Id>
  entityName?: string // Optional name to customize notification messages
}

export const useHandleDelete = ({
  mutation,
  entityName = 'item',
}: UseDeleteOptions) => {
  const [selectedId, setSelectedId] = useState<Id | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleDeleteClick = (id: Id) => {
    setSelectedId(id)
    setModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!selectedId) return
    mutation.mutate(selectedId, {
      onSuccess: () => {
        setSelectedId(null)
        setModalOpen(false)
        notifications.show({
          title: 'Deleted',
          message: `${entityName} deleted successfully.`,
          color: 'green',
        })
      },
      onError: (error) => {
        console.error(`Error deleting ${entityName}:`, error)
        notifications.show({
          title: 'Error',
          message: `Failed to delete ${entityName}. Please try again.`,
          color: 'red',
        })
      },
    })
  }

  return {
    selectedId,
    modalOpen,
    setModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
  }
}
