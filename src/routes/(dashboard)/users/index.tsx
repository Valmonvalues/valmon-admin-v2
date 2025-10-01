import DashboardLayout from '@/layout/DashboardLayout'
import { useUser } from '@/services/user.service'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { listUsers } = useUser()
  const { data: users, isLoading } = listUsers

  console.log('users', users)
  return (
    <DashboardLayout>
      <div>Hello "/dashboard/users/"!</div>
    </DashboardLayout>
  )
}
