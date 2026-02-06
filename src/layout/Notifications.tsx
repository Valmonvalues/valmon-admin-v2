import { useNotifications } from '@/services/notifications.service'
import type { NotificationItem } from '@/types/notifications.types'
import { Group, Loader, Text } from '@mantine/core'

const Notifications = () => {
  const { allNotifications } = useNotifications()
  const { data: notifications, isLoading } = allNotifications()

  return (
    <div className="absolute right-0 px-4 my-3 w-100 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
      <div className="py-3 font-semibold text-gray-700 bg-gray-50">
        <Group justify="space-between">
          <Text fw={900}>Notifications</Text>
          {/* <Text fw={900} c="red">
            Clear
          </Text> */}
        </Group>
      </div>
      <ul className="flex flex-col gap-3 pb-5 max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="p-5 flex justify-center">
            <Loader size="sm" />
          </div>
        ) : (
          notifications?.map((note: NotificationItem) => (
            <li
              key={note.id}
              className="p-3 border border-gray-300 rounded-2xl hover:bg-gray-50 text-sm text-gray-700 transition"
            >
              <Text fw={800}>{note.data.title}</Text>
              <Text>{note.data.message}</Text>
            </li>
          ))
        )}
        {notifications?.length === 0 && (
          <li className="px-4 py-5 text-center text-gray-500 text-sm">
            No unread notifications
          </li>
        )}
      </ul>
    </div>
  )
}

export default Notifications

//  {notificationOpen && <Notifications />}
