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
  ThemeIcon,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { storage } from '@/constant/config'
import { routeGaurd } from '@/middleware/routeGuard'
import { allowedRoles } from '@/data/roles'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import { IconCheck, IconShieldCheckered, IconUsers } from '@tabler/icons-react'

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

  const [selectedRole, setSelectedRole] = useState('Super Admin')

  const navigate = useNavigate()

  const notificationItems: { label: string; key: NotificationKey }[] = [
    { label: 'Notifications', key: 'notifications' },
    { label: 'New Report', key: 'new_report' },
    { label: 'Sales Summary', key: 'sales_summary' },
    { label: 'New User', key: 'new_user' },
  ]

  const roles = [
    {
      name: 'Super Admin',
      description: 'Complete control over all platform features and settings',
      users: 2,
      color: 'purple',
    },
    {
      name: 'Admin',
      description: 'Manage users, Marketplace, and most content',
      users: 3,
      color: 'blue',
    },
    {
      name: 'Manager',
      description: 'Manage Marketplace',
      users: 4,
      color: 'green',
    },
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
        <div className="w-full max-w-[900px]">
          <TabHeader
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: 'platform rate', label: 'Platform Rate' },
              { id: 'reset password', label: 'Reset Password' },
              { id: 'notification settings', label: 'Notification Settings' },
              { id: 'role management', label: 'Role Management' },
            ]}
          />
        </div>

        <div className="w-full">
          {activeTab !== 'role management' && (
            <div className=" max-w-[600px]">
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
          )}

          {activeTab === 'role management' && (
            <div className="flex gap-6 w-full">
              <div className="w-[300px] bg-white rounded-xl p-4 shadow-sm">
                <Text fw={600} mb="sm">
                  User Roles
                </Text>

                <Stack gap="sm">
                  {roles.map((role) => (
                    <div
                      key={role.name}
                      onClick={() => setSelectedRole(role.name)}
                      className={`p-3 rounded-lg border cursor-pointer ${
                        selectedRole === role.name
                          ? 'bg-[var(--color-bg-primary)] border-[var(--color-bright-gold)]'
                          : 'border-gray-200'
                      }`}
                    >
                      <Group justify="space-between" mb={5}>
                        <Group gap={6}>
                          <ThemeIcon
                            size={20}
                            radius="xl"
                            style={{ backgroundColor: role.color }}
                          />
                          <Text fw={500}>{role.name}</Text>
                        </Group>

                        <Group
                          gap={5}
                          align="center"
                          className="px-2 py-0.5 rounded-xl border border-gray-200 bg-gray-100"
                        >
                          <IconUsers size={12} />
                          <Text size="xs">{role.users}</Text>
                        </Group>
                      </Group>
                      <Text size="xs" c="dimmed">
                        {role.description}
                      </Text>
                    </div>
                  ))}

                  <Button variant="outline" fullWidth mt="sm">
                    Add Role
                  </Button>
                </Stack>
              </div>

              {/* RIGHT PANEL */}
              <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
                {/* HEADER */}
                <Group justify="space-between" mb="md">
                  <Text fw={600}>Manage User Role</Text>

                  <Group>
                    <BaseButton
                      title="Delete"
                      outline
                      color="#ef4444"
                      className="px-4 py-2 w-auto"
                    />

                    <BaseButton
                      title="Save"
                      className="px-4 py-2 background w-auto"
                    />
                    {/* title={
                        loading ? <Loader size="sm" color="white" /> : title
                      } */}
                  </Group>
                </Group>

                {/* FORM */}
                <Stack gap="md">
                  <div>
                    {/* <Text size="sm">Role Name</Text> */}
                    {/* <input
                      className="w-full border rounded-md p-2 mt-1"
                      value={selectedRole}
                      readOnly
                    /> */}
                    <BaseInput
                      label="Role Name"
                      value={selectedRole}
                      onChange={() => {}}
                      disabled
                    />
                  </div>

                  <div>
                    <BaseInput
                      label="Description"
                      value="Complete control over all platform features and settings"
                      onChange={() => {}}
                      disabled
                    />
                  </div>

                  {/* STATS */}
                  <Group grow mt="md">
                    <Box className="p-4 bg-gray-50 rounded-lg">
                      <Group gap={4} align="center">
                        <IconUsers size={14} />
                        <Text size="xs">Active Users</Text>
                      </Group>
                      <Text fw={600}>2</Text>
                    </Box>

                    <Box className="p-4 bg-gray-50 rounded-lg">
                      <Group gap={4} align="center">
                        <IconShieldCheckered size={14} />
                        <Text size="xs">Permissions</Text>
                      </Group>
                      <Text fw={600}>12</Text>
                    </Box>

                    <Box className="p-4 bg-gray-50 rounded-lg">
                      <Group gap={4} align="center">
                        <IconCheck size={14} />
                        <Text size="xs">Access Level</Text>
                      </Group>
                      <Text fw={600}>100%</Text>
                    </Box>
                  </Group>

                  {/* PERMISSIONS */}
                  <Stack mt="md" gap="sm">
                    {[
                      'View Summary',
                      'Manage Summary',
                      'Manage Users',
                      'View Users',
                      'View Skills',
                      'Manage Skills',
                      'View Marketplace',
                      'Manage Marketplace',
                      'View Valmon Wallet',
                      'Manage Valmon Wallet',
                    ].map((perm) => (
                      <Group
                        key={perm}
                        justify="space-between"
                        className="px-3 py-2 rounded-lg bg-gray-50"
                      >
                        <Group gap="sm">
                          <div className="flex items-center justify-center w-5 h-5 rounded bg-orange-100">
                            <IconCheck
                              color="var(--color-dark-gold)"
                              className="p-1"
                            />
                          </div>

                          <Text size="sm">{perm}</Text>
                        </Group>

                        <Switch defaultChecked color="var(--color-dark-gold)" />
                      </Group>
                    ))}
                  </Stack>

                  {/* TIPS */}
                  <Box
                    mt="md"
                    p="md"
                    className="bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <Text fw={500} size="sm" mb="xs">
                      <p className="text-blue-900">💡 Role Management Tips</p>
                    </Text>
                    <ul className="text-xs text-blue-800 list-disc pl-4">
                      <li>
                        Assign the minimum permissions necessary for each user's
                        role
                      </li>
                      <li>
                        Regularly review and audit user permissions for security
                      </li>
                      <li>
                        Super Admin role should be limited to key personnel only
                      </li>
                      <li>
                        Custom roles can only be createdfor specific
                        organizational needs
                      </li>
                    </ul>
                  </Box>
                </Stack>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
