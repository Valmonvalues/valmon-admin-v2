'use client'

import { Modal, Text, Group, Button } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'

interface ConfirmDeleteModalProps {
  opened: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  message?: string
  loading?: boolean
}

export default function ConfirmDeleteModal({
  opened,
  onConfirm,
  onCancel,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  loading = false,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      title={
        <Group>
          <IconAlertTriangle color="red" size={22} />
          <Text fw={600}>{title}</Text>
        </Group>
      }
      centered
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text className="text-gray-600 mb-4">{message}</Text>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={onConfirm}
          loading={loading}
          loaderProps={{ type: 'bars', color: 'white', size: 'sm' }}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Delete
        </Button>
      </Group>
    </Modal>
  )
}
