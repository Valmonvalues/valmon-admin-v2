import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/settings/')({
  component: Settings,
})

function Settings() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/settings/"!</div>
    </DashboardLayout>
  )
}
