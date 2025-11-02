import { BackButton } from '@/components/BackButton'
import DashboardLayout from '@/layout/DashboardLayout'
import { useMarketPlaces } from '@/services/marketPlaces.service'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  // Loader,
  Stack,
  Text,
} from '@mantine/core'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(dashboard)/marketPlace/$marketPlaceId/',
)({
  component: MarketPlaceProduct,
})

interface InfoRowProps {
  label: string
  value: string | number | null | undefined
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center border-t border-gray-100 py-1">
      <Text fz="sm" fw={500}>
        {label}:
      </Text>
      <Text fz="sm" fw={500} c="dimmed">
        {value || '-'}
      </Text>
    </div>
  )
}

function MarketPlaceProduct() {
  const { marketPlaceId } = Route.useParams()
  const navigate = useNavigate()
  const { listingId } = useMarketPlaces()
  const { data: listing } = listingId(marketPlaceId)

  // if (!listing) return

  // console.log(listing)

  const seller = listing?.user
  // const profile = seller?.profile

  const handleView = () => {
    navigate({ to: `/marketPlace/${marketPlaceId}/chat` })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-wrap gap-4">
        <div className="flex-none">
          <BackButton color="black" className="min-w-[100px]" />
        </div>
        {/* <BackButton color="black" /> */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="flex-1 flex">
            <Card radius="md" padding="lg" className="bg-white flex-1">
              <Image
                src={
                  listing?.images?.[0] ||
                  'https://placehold.co/600x400?text=No+Image'
                }
                alt={listing?.title}
                radius="md"
                height={400}
                fit="cover"
                className=""
              />
              {/* Thumbnails */}
              {listing && listing?.images?.length > 0 && (
                <Group mt="md" gap="xs" justify="start" className="flex-wrap">
                  {listing?.images.map((img, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: 70,
                        height: 55,
                        overflow: 'hidden',
                        borderRadius: 8,
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        key={idx}
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        radius="sm"
                        fit="cover"
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: 'cover',
                          transition: 'all 0.2s ease',
                        }}
                        className="hover:scale-105"
                      />
                    </div>
                  ))}
                </Group>
              )}
            </Card>
          </div>
          <div className="flex-1 flex space-y-5">
            <Card
              shadow="xs"
              padding="lg"
              radius="md"
              className="bg-white flex-1"
            >
              <div className="flex justify-between items-center">
                <Text fz="xl" fw={700}>
                  {listing?.title}
                </Text>
                <Badge color="green" variant="light" size="lg" p="">
                  {listing?.status === 'ACTIVE' ? 'Escrow' : listing?.status}
                </Badge>
              </div>
              {/* Info section */}
              <div className="space-y-2 pt-2">
                <InfoRow
                  label="Price"
                  // ₦
                  value={`NGN${Number(listing?.price).toLocaleString()}`}
                />
                <InfoRow
                  label="Negotiable"
                  value={listing?.negotiable ? 'Yes' : 'No'}
                />
                <InfoRow label="Condition" value={listing?.condition} />
                <InfoRow label="Colour" value={listing?.color} />
                <InfoRow label="Location" value={listing?.location} />
                <InfoRow label="Category" value={listing?.category?.name} />
              </div>
              {/* Description */}
              <div className="mt-4 bg-gray-100 rounded-lg p-2">
                <Text fw={600} fz="sm" mb="xs">
                  Description
                </Text>
                <Text size="sm" lh={1.6} c="">
                  {listing?.description || 'No description provided.'}
                </Text>
              </div>
              {/* Seller Info */}
              <div className="border-t border-gray-200 mt-5 pt-4 flex items-center justify-between space-y-3">
                <Group>
                  <Avatar src={seller?.profile_pic} radius="xl" />
                  <Stack gap={0}>
                    <Text fw={600}>
                      {' '}
                      {seller?.first_name} {seller?.last_name}
                    </Text>
                    <Group>
                      <Text size="sm">⭐ {seller?.rating}</Text>
                      <Text size="sm" c="dimmed">
                        ({seller?.ratings_count} Ratings)
                      </Text>
                    </Group>
                  </Stack>
                </Group>
                <Button variant="outline" color="dark" radius="md">
                  Profile
                </Button>
              </div>
              <Button color="dark" onClick={handleView}>
                View Chat
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
