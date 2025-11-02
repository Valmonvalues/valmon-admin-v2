import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(dashboard)/marketPlace/$marketPlaceId/$marketPlaceChatId',
)({
  component: ChatView,
})

function ChatView() {
  const { marketPlaceChatId } = Route.useParams()

  return (
    <div>
      {marketPlaceChatId}
      Hello "/(dashboard)/marketPlace/$marketPlaceId/$marketPlaceChatId"!
    </div>
  )
}
