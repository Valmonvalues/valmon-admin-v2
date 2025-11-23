import { createFileRoute } from '@tanstack/react-router'
import { Avatar, Badge, Card, Group, Image, Text } from '@mantine/core'
import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'

export const Route = createFileRoute(
  '/(dashboard)/marketPlace/$marketPlaceId/$marketPlaceId',
)({
  component: ChatView,
  loader: () => routeGaurd(allowedRoles.marketPlace),
})

type Message = {
  id: number
  text: string
  time: string
  sender: 'buyer' | 'seller'
  edited?: boolean
  replies?: number
  emoji?: string
}

type ListingInfo = {
  title: string
  price: number
  image: string
  proofImage: string
}

function ChatView() {
  const messages: Message[] = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur. Tortor a eget egestas vel nibh enim vestibulum nibh molestie.',
      time: '9:13AM',
      sender: 'buyer',
      edited: true,
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet consectetur. Tortor a eget egestas vel nibh enim vestibulum nibh molestie.',
      time: '9:14AM',
      sender: 'seller',
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet consectetur. Tortor a eget egestas vel nibh enim vestibulum nibh molestie.',
      time: '9:24AM',
      sender: 'buyer',
      replies: 3,
      emoji: '😊',
    },
  ]

  const listing: ListingInfo = {
    title: 'Mercedes Benz AMG',
    price: 195799,
    image:
      'https://images.unsplash.com/photo-1606813902778-8b8b3d2a19e4?auto=format&fit=crop&w=800&q=60',
    proofImage:
      'https://images.unsplash.com/photo-1613211739580-df0e8c7a0b1c?auto=format&fit=crop&w=800&q=60',
  }
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* LEFT CHAT SECTION */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <Group>
            <Avatar
              src="https://randomuser.me/api/portraits/women/44.jpg"
              radius="xl"
            />
            <div>
              <Text fw={600}>John Doe</Text>
              <Text size="sm" c="dimmed">
                ★ 4.7 (53 Ratings)
              </Text>
            </div>
            <Badge color="gray" variant="light">
              Buyer
            </Badge>
          </Group>
          <Group>
            <Badge color="gray" variant="light">
              Seller
            </Badge>
            <Avatar
              src="https://randomuser.me/api/portraits/men/45.jpg"
              radius="xl"
            />
          </Group>
        </div>

        <div className="text-center text-gray-500 mb-2">
          Your conversation with Daniel starts here
        </div>
        <div className="border-t border-gray-200 my-4"></div>

        <Text ta="center" fw={600} mb={4}>
          June 1, 2020
        </Text>

        <div className="space-y-4 mt-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'buyer' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  msg.sender === 'buyer'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-gray-800'
                }`}
              >
                <Text size="sm">{msg.text}</Text>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>
                    {msg.edited && (
                      <span className="italic text-blue-400 mr-1">Edited</span>
                    )}
                  </span>
                  <span>
                    {msg.time} {msg.emoji}
                  </span>
                </div>
                {msg.replies && (
                  <Text size="xs" className="text-blue-600 mt-1">
                    {msg.replies} Replies
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT DETAILS SECTION */}
      <div className="w-full lg:w-[320px] flex flex-col gap-5">
        <Card radius="md" shadow="sm" className="bg-white">
          <Image src={listing.image} radius="md" height={160} fit="cover" />
          <Text fw={600} mt="md">
            {listing.title}
          </Text>
          <div className="mt-3">
            <Text fw={600}>Listing Cost</Text>
            <Text
              size="xl"
              fw={700}
              className="bg-gray-100 rounded-md px-3 py-1 mt-1 text-gray-800"
            >
              NGN {listing.price.toLocaleString()}
            </Text>
          </div>
        </Card>

        <Card radius="md" shadow="sm" className="bg-white">
          <Text fw={600} mb="xs">
            Proof Of Delivery
          </Text>
          <Text size="sm" c="blue">
            Seller Proof Of Delivery
          </Text>
          <Image
            src={listing.proofImage}
            radius="md"
            height={140}
            fit="cover"
            className="mt-2"
          />
        </Card>
      </div>
    </div>
  )
}
