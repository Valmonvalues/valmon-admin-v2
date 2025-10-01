import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/resolution/')({
  component: Resolution,
})

function Resolution() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/resolution/"!</div>
    </DashboardLayout>
  )
}
