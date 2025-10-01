import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/account/')({
  component: Account,
})

function Account() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/account/"!</div>
    </DashboardLayout>
  )
}
