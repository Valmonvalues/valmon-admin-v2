import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/getstarted')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/getstarted"!</div>
}
