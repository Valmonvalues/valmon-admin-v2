'use client'

import { Modal, Text, Group, Button } from '@mantine/core'
import {
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconTrash,
} from '@tabler/icons-react'

interface ConfirmModalProps {
  opened: boolean
  onConfirm: () => void
  onCancel: () => void
  title?: string
  message?: string
  loading?: boolean
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: 'red' | 'green' | 'blue' | 'gray'
  icon?: 'alert' | 'info' | 'success' | 'delete'
}

export default function ConfirmModal({
  opened,
  onConfirm,
  onCancel,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  loading = false,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmColor = 'blue',
  icon = 'alert',
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (icon) {
      case 'delete':
        return <IconTrash color="red" size={22} />
      case 'success':
        return <IconCheck color="green" size={22} />
      case 'info':
        return <IconInfoCircle color="blue" size={22} />
      default:
        return <IconAlertTriangle color="orange" size={22} />
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      title={
        <Group>
          {getIcon()}
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
          {cancelLabel}
        </Button>
        <Button
          color={confirmColor}
          onClick={onConfirm}
          loading={loading}
          loaderProps={{ type: 'bars', color: 'white', size: 'sm' }}
          className={`text-white ${
            confirmColor === 'red'
              ? 'bg-red-600 hover:bg-red-700'
              : confirmColor === 'green'
                ? 'bg-green-600 hover:bg-green-700'
                : confirmColor === 'blue'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : ''
          }`}
        >
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  )
}
