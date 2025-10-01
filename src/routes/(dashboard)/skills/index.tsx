import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/skills/')({
  component: Skills,
})

function Skills() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/skills/"!</div>
    </DashboardLayout>
  )
}
