import { BackButton } from '@/components/BackButton'
import DashboardLayout from '@/layout/DashboardLayout'
import { Card, Image } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(dashboard)/marketPlace/$marketPlaceId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/marketPlace/$marketPlaceId/"!</div>
      <BackButton color="black" />

      <div className="flex-col lg:flex-row gap-8">
        <div className="">
          <Card radius="md" padding="lg">
            <Image src={} alt={} radius="" className="" />
          </Card>
        </div>

        <div className=""></div>
      </div>
    </DashboardLayout>
  )
}
