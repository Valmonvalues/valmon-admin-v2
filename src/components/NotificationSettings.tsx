import { useAccessManagement } from '@/hook/useAccessManagement'
import { useSettings } from '@/services/settings.service'
import {
  Box,
  Button,
  Center,
  Loader,
  Stack,
  Switch,
  Group,
  Text,
} from '@mantine/core'
import { useEffect, useState } from 'react'

type NotificationKey =
  | 'notifications'
  | 'new_report'
  | 'sales_summary'
  | 'new_user'

function NotificationSettings() {
  const { getNotificationSettings, updateNotificationSettings } = useSettings()
  const { canAccess } = useAccessManagement()

  const canManage = canAccess('manage_notification_settings')

  const { data: notifData, isLoading: notifDataLoading } =
    getNotificationSettings()
  const { mutate: updateNotification, isPending: updating } =
    updateNotificationSettings

  const [notificationSettings, setNotificationSettings] = useState({
    notifications: false,
    new_report: false,
    sales_summary: false,
    new_user: false,
  })

  useEffect(() => {
    if (notifData) {
      setNotificationSettings(notifData)
    }
  }, [notifData])

  const notificationItems: { label: string; key: NotificationKey }[] = [
    { label: 'Notifications', key: 'notifications' },
    { label: 'New Report', key: 'new_report' },
    { label: 'Sales Summary', key: 'sales_summary' },
    { label: 'New User', key: 'new_user' },
  ]

  const handleNotificationUpdate = () => {
    if (!canManage) return

    updateNotification(notificationSettings)
  }

  return (
    <Box
      className="w-full"
      p="lg"
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      }}
    >
      {notifDataLoading ? (
        <Center style={{ height: 200 }}>
          <Loader color="gold" size="lg" />
        </Center>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleNotificationUpdate()
          }}
        >
          <Stack gap="lg">
            {notificationItems.map((item) => (
              <Group key={item.key} justify="space-between">
                <Text c="gray" size="sm">
                  {item.label}
                </Text>

                <Switch
                  color="var(--color-dark-gold)"
                  checked={notificationSettings[item.key]}
                  onChange={(e) => {
                    if (!canManage) return

                    setNotificationSettings((prev) => ({
                      ...prev,
                      [item.key]: e.target?.checked,
                    }))
                  }}
                  disabled={updating}
                  styles={{
                    input: {
                      cursor: canManage ? 'pointer' : 'not-allowed',
                      opacity: 1,
                    },
                    track: {
                      cursor: canManage ? 'pointer' : 'not-allowed',
                      opacity: 1,
                    },
                    thumb: {
                      cursor: canManage ? 'pointer' : 'not-allowed',
                      opacity: 1,
                    },
                  }}
                />
              </Group>
            ))}

            {!canManage && (
              <Text size="xs" c="dimmed">
                You have view-only access to notification settings.
              </Text>
            )}

            <Button
              type="submit"
              color="dark"
              radius="md"
              fullWidth
              loading={updating}
              disabled={!canManage}
              // onClick={handleNotificationUpdate}
              mt="md"
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  )
}

export default NotificationSettings
