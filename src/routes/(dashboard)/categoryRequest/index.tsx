import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/categoryRequest/')({
  component: CategoryRequest,
})

function CategoryRequest() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/categoryRequest/"!</div>
    </DashboardLayout>
  )
}
