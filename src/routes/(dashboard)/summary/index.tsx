import { createFileRoute } from '@tanstack/react-router'

import DashboardLayout from '@/layout/DashboardLayout'

import { routeGaurd } from '@/middleware/routeGuard'
import Summary from '@/components/pages/summary/Summary'

export const Route = createFileRoute('/(dashboard)/summary/')({
  component: Dashboard,
  loader: () => routeGaurd(['view_summary', 'manage_summary']),
})

function Dashboard() {
  return (
    <DashboardLayout>
      <Summary />
    </DashboardLayout>
  )
}

export default Dashboard
