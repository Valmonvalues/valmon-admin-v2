import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(dashboard)/marketPlace/$marketPlaceId/$marketPlaceId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/(dashboard)/marketPlace/$marketPlaceId/$marketPlaceId"!</div>
  )
}
