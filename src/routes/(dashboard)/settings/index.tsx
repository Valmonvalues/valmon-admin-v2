import TabHeader from '@/components/TabHeader'
import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { routeGaurd } from '@/middleware/routeGuard'
import { allowedRoles } from '@/data/roles'
import PlatformRate from '@/components/PlatformRate'
import ResetPassword from '@/components/ResetPassword'
import NotificationSettings from '@/components/NotificationSettings'
import RoleManagement from '@/components/RoleManagement'

export const Route = createFileRoute('/(dashboard)/settings/')({
  component: Settings,
  loader: () => routeGaurd(allowedRoles.settings),
})

function Settings() {
  const [activeTab, setActiveTab] = useState('platform rate')

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
              {activeTab === 'platform rate' && <PlatformRate />}
              {activeTab === 'reset password' && <ResetPassword />}
              {activeTab === 'notification settings' && (
                <NotificationSettings />
              )}
            </div>
          )}

          {activeTab === 'role management' && <RoleManagement />}
        </div>
      </div>
    </DashboardLayout>
  )
}
