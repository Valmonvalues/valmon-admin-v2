import { createFileRoute } from '@tanstack/react-router'

import DashboardLayout from '@/layout/DashboardLayout'

import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'
import Summary from '@/components/pages/summary/Summary'

export const Route = createFileRoute('/(dashboard)/summary/')({
  component: Dashboard,
  loader: () => routeGaurd(allowedRoles.summary),
})

function Dashboard() {
  return (
    <DashboardLayout>
      <Summary />
    </DashboardLayout>
  )
}

export default Dashboard
