import { useNotifications } from '@/services/notifications.service'
import { useState, useEffect } from 'react'
import type { NotificationItem } from '@/types/notifications.types'
import { Group, Loader, Text, Modal, Button } from '@mantine/core'
import { notifications as toast } from '@mantine/notifications'

type NotificationsProps = {
  onModalToggle?: (open: boolean) => void
}

const Notifications = ({ onModalToggle }: NotificationsProps) => {
  const {
    allNotifications,
    unreadNotifications,
    readNotification,
    readAllNotifications,
  } = useNotifications()

  const [tab, setTab] = useState<'all' | 'unread'>('unread')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<NotificationItem | null>(
    null,
  )

  const allQ = allNotifications()
  const unreadQ = unreadNotifications()

  const notifications = tab === 'all' ? allQ.data : unreadQ.data
  // const isLoading: boolean =
  //   tab === 'all' ? Boolean(allQ.isLoading) : Boolean(unreadQ.isLoading)
  const isLoading = tab === 'all' ? allQ.isLoading : unreadQ.isLoading

  useEffect(() => {
    onModalToggle?.(modalOpen)
  }, [modalOpen, onModalToggle])

  const openNote = (note: NotificationItem) => {
    setSelectedNote(note)
    setModalOpen(true)
  }

  // const closeModal = () => {
  //   setModalOpen(false)
  //   setSelectedNote(null)
  // }

  const handleMarkRead = async () => {
    if (!selectedNote) return
    try {
      await readNotification.mutateAsync(selectedNote.id)
      setModalOpen(false)
      setSelectedNote(null)
    } catch (error: any) {
      toast.show({
        title: 'Error',
        message: error?.message || 'Failed to mark notification as read',
        color: 'red',
      })
    }
  }

  const handleReadAll = async () => {
    try {
      const ids = notifications?.map((note) => note.id) || []
      if (!ids.length) return

      await readAllNotifications.mutateAsync(ids)
    } catch (error: any) {
      toast.show({
        title: 'Error',
        message: error?.message || 'Failed to mark all as read',
        color: 'red',
      })
    }
  }

  return (
    <div className="absolute right-0 px-4 my-3 w-100 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
      <div className="py-3 font-semibold text-gray-700 bg-gray-50">
        <Group justify="space-between">
          <Text fw={900}>Notifications</Text>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('unread')}
              className={`text-sm font-semibold ${tab === 'unread' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              Unread
            </button>
            <button
              type="button"
              onClick={() => setTab('all')}
              className={`text-sm font-semibold ${tab === 'all' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              All
            </button>
          </div>
          {/* <Text fw={900} c="red">
            Clear
          </Text> */}

          {!!notifications?.length && (
            <button
              type="button"
              onClick={handleReadAll}
              disabled={readAllNotifications.isPending}
              className="text-sm font-semibold text-red-500 disabled:opacity-50"
            >
              Mark all read
            </button>
          )}
        </Group>
      </div>

      <ul className="flex flex-col gap-3 pb-5 max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="p-5 flex justify-center">
            <Loader size="sm" />
          </div>
        ) : notifications?.length ? (
          notifications?.map((note: NotificationItem) => (
            <li
              key={note.id}
              role="button"
              tabIndex={0}
              onClick={() => openNote(note)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openNote(note)
                }
              }}
              className="p-3 border border-gray-300 rounded-2xl hover:bg-gray-50 text-sm text-gray-700 transition"
            >
              {/* <Text fw={800}>{note.data.title}</Text>
              <Text>{note.data.message}</Text> */}

              <Group justify="space-between" align="start">
                <div className="flex-1">
                  <Text fw={800} c={note.read_at ? 'dimmed' : undefined}>
                    {note.data.title}
                  </Text>
                  <Text size="sm" c={note.read_at ? 'dimmed' : undefined}>
                    {note.data.message}
                  </Text>
                </div>

                {!note.read_at && (
                  <span
                    className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"
                    aria-hidden
                  />
                )}
              </Group>
            </li>
          ))
        ) : (
          // }{notifications?.length === 0 && (

          <li className="px-4 py-5 text-center text-gray-500 text-sm">
            {tab === 'all' ? 'No notifications' : 'No unread notifications'}
          </li>
        )}
      </ul>

      <Modal
        opened={modalOpen}
        // onClose={closeModal}
        onClose={() => setModalOpen(false)}
        title={selectedNote?.data.title}
        size="sm"
      >
        <div className="space-y-4">
          <Text size="sm" c={selectedNote?.read_at ? 'dimmed' : undefined}>
            {selectedNote?.data.message}
          </Text>

          <div className="flex justify-end gap-2">
            <Button variant="default" onClick={() => setModalOpen(false)}>
              {/* <Button variant="default" onClick={closeModal}> */}
              Close
            </Button>
            {!selectedNote?.read_at && (
              <Button
                color="red"
                onClick={handleMarkRead}
                loading={readNotification.isPending}
              >
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Notifications
