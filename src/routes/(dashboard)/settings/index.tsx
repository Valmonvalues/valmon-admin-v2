import TabHeader from '@/components/TabHeader'
import DashboardLayout from '@/layout/DashboardLayout'
import { useSettings } from '@/services/settings.service'
import type { ResetPasswordForm } from '@/types/settings.types'
import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  PasswordInput,
  Slider,
  Stack,
  Switch,
  Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { storage } from '@/constant/config'
import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'

export const Route = createFileRoute('/(dashboard)/settings/')({
  component: Settings,
  loader: () => routeGaurd(allowedRoles.settings),
})

type NotificationKey =
  | 'notifications'
  | 'new_report'
  | 'sales_summary'
  | 'new_user'

function Settings() {
  const [activeTab, setActiveTab] = useState('platform rate')
  // const [loading, setLoading] = useState(false)
  const [skillRange, setSkillRange] = useState<number>(0)
  const [salesRange, setSalesRange] = useState<number>(0)
  const [notificationSettings, setNotificationSettings] = useState({
    notifications: false,
    new_report: false,
    sales_summary: false,
    new_user: false,
  })

  const {
    getPlatformRate,
    getNotificationSettings,
    updateNotificationSettings,
    setPlatformRate,
    resetPassword,
  } = useSettings()
  const { data: platformRateData, isLoading: platformRateLoading } =
    getPlatformRate()
  const { data: notifData, isLoading: notifDataLoading } =
    getNotificationSettings()
  const { mutate: savePlatformRate, isPending: saving } = setPlatformRate
  const { mutate: changePassword, isPending: resetting } = resetPassword
  const { mutate: updateNotification, isPending: updating } =
    updateNotificationSettings

  const navigate = useNavigate()

  const notificationItems: { label: string; key: NotificationKey }[] = [
    { label: 'Notifications', key: 'notifications' },
    { label: 'New Report', key: 'new_report' },
    { label: 'Sales Summary', key: 'sales_summary' },
    { label: 'New User', key: 'new_user' },
  ]

  useEffect(() => {
    if (platformRateData) {
      setSkillRange(platformRateData.charge_percentage || 0)
      setSalesRange(platformRateData.sale_percentage || 0)
    }
  }, [platformRateData])

  useEffect(() => {
    if (notifData) {
      setNotificationSettings(notifData)
    }
  }, [notifData])

  // useEffect(() => {
  //   const leftOffSettingValue = localStorage.getItem('leftOffSetting')
  //   if (leftOffSettingValue) {
  //     setActiveTab(leftOffSettingValue)
  //   } else {
  //     setActiveTab('platform rate')
  //   }
  // }, [])

  const marks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ]

  const form = useForm({
    // mode: 'uncontrolled',
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    validate: {
      current_password: (value) =>
        value.length < 6
          ? 'Current password must be at least 6 characters'
          : null,

      password: (value) =>
        value.length < 6 ? 'New password must be at least 6 characters' : null,

      password_confirmation: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  })

  const handleResetPassword = (values: ResetPasswordForm) => {
    changePassword(values, {
      onSuccess: () => {
        console.log('Onsuccess')
        form.reset()
        storage.removeItem('valmon_adminToken')
        // window.history.navigate({ to: '/' })
        navigate({ to: '/', replace: true })
      },
    })
  }

  const handleSave = () => {
    savePlatformRate({
      charge_percentage: skillRange,
      sale_percentage: salesRange,
    })
  }

  const handleNotificationUpdate = () => {
    updateNotification(notificationSettings)
  }

  return (
    <DashboardLayout>
      <div className="mb-4 w-full flex flex-col gap-6">
        <div className="w-full max-w-[600px]">
          <TabHeader
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: 'platform rate', label: 'Platform Rate' },
              { id: 'reset password', label: 'Reset Password' },
              { id: 'notification settings', label: 'Notification Settings' },
            ]}
          />
        </div>

        <div className="w-full max-w-[500px]">
          {activeTab === 'platform rate' && (
            <Box
              className="w-full"
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              }}
            >
              {platformRateLoading ? (
                <Center style={{ height: 200 }}>
                  <Loader color="gold" size="lg" />
                </Center>
              ) : (
                <div className="p-6 sm:p-10">
                  <div className="pb-5">
                    <Group justify="space-between">
                      <Text fw={700}>Skill Charge Percentage</Text>
                      <Text fw={700} c="var(--color-dark-gold)">
                        {skillRange}%
                      </Text>
                    </Group>

                    <Slider
                      color="var(--color-bright-gold)"
                      value={skillRange}
                      onChange={setSkillRange}
                      step={0.1}
                      marks={marks}
                      disabled={saving}
                    />
                  </div>

                  <div className="py-6 sm:py-10">
                    <Group justify="space-between">
                      <Text fw={700}>Listing Sale Percentage</Text>
                      <Text fw={700} c="var(--color-dark-gold)">
                        {salesRange}%
                      </Text>
                    </Group>

                    <Slider
                      color="var(--color-bright-gold)"
                      value={salesRange}
                      onChange={setSalesRange}
                      step={25}
                      marks={marks}
                      disabled={saving}
                    />
                  </div>

                  <Button
                    fullWidth
                    color="dark"
                    mt={30}
                    loading={saving}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </Box>
          )}

          {activeTab === 'reset password' && (
            <Box
              className="w-full"
              p="xl"
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              }}
            >
              {resetting ? (
                <Center style={{ height: 200 }}>
                  <Loader color="gold" size="lg" />
                </Center>
              ) : (
                <form onSubmit={form.onSubmit(handleResetPassword)}>
                  <PasswordInput
                    label="Current Password"
                    {...form.getInputProps('current_password')}
                    required
                    mt="sm"
                    size="sm"
                  />

                  <PasswordInput
                    label="New Password"
                    {...form.getInputProps('password')}
                    required
                    mt="sm"
                    size="sm"
                  />

                  <PasswordInput
                    label="Confirm Password"
                    {...form.getInputProps('password_confirmation')}
                    required
                    mt="sm"
                    size="sm"
                  />

                  <Button
                    loading={resetting}
                    type="submit"
                    fullWidth
                    mt="md"
                    color="dark"
                  >
                    Reset Password
                  </Button>
                </form>
              )}
            </Box>
          )}

          {activeTab === 'notification settings' && (
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
                          color="var(--color-bright-gold)"
                          checked={notificationSettings[item.key]}
                          onChange={(e) =>
                            setNotificationSettings((prev) => ({
                              ...prev,
                              [item.key]: e.target?.checked,
                            }))
                          }
                          disabled={updating}
                        />
                      </Group>
                    ))}

                    <Button
                      type="submit"
                      color="dark"
                      radius="md"
                      fullWidth
                      loading={updating}
                      // onClick={handleNotificationUpdate}
                      mt="md"
                    >
                      Save Changes
                    </Button>
                  </Stack>
                </form>
              )}
            </Box>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
