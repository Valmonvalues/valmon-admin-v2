import DashboardLayout from '@/layout/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/marketPlace/')({
  component: MarketPlace,
})

function MarketPlace() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/marketPlace/"!</div>
    </DashboardLayout>
  )
}
