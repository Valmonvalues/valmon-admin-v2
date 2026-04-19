import TabHeader from '@/components/TabHeader'
import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { routeGaurd } from '@/middleware/routeGuard'
import PlatformRate from '@/components/PlatformRate'
import ResetPassword from '@/components/ResetPassword'
import NotificationSettings from '@/components/NotificationSettings'
import RoleManagement from '@/components/RoleManagement'
import { useAccessManagement } from '@/hook/useAccessManagement'
import NoAccess from '@/components/NoAccess'

export const Route = createFileRoute('/(dashboard)/settings/')({
  component: Settings,
  loader: () =>
    routeGaurd([
      'view_platform_rates',
      'manage_platform_rates',
      'view_notification_settings',
      'manage_notification_settings',
      'view_admin_roles',
      'manage_admin_roles',
    ]),
})

function Settings() {
  const [activeTab, setActiveTab] = useState('platform rate')
  const { canAccess } = useAccessManagement()

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
            <div className="max-w-[600px]">
              {activeTab === 'platform rate' ? (
                canAccess('view_platform_rates') ? (
                  <PlatformRate />
                ) : (
                  <NoAccess />
                )
              ) : (
                ''
              )}
              {activeTab === 'reset password' && <ResetPassword />}
              {activeTab === 'notification settings' ? (
                canAccess('view_notification_settings') ? (
                  <NotificationSettings />
                ) : (
                  <NoAccess />
                )
              ) : (
                ''
              )}
            </div>
          )}

          {activeTab === 'role management' ? (
            canAccess('view_admin_roles') ? (
              <RoleManagement />
            ) : (
              <NoAccess />
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
