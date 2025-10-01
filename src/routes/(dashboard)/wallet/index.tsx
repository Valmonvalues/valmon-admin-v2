import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/wallet/')({
  component: Wallet,
})

function Wallet() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/wallet/"!</div>
    </DashboardLayout>
  )
}
