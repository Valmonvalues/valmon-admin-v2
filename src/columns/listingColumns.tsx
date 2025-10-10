import type { ReactNode } from 'react'
import { ActionIcon, Badge, Menu } from '@mantine/core'
import { IconDotsVertical, IconEye, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import { perPage } from '@/constant/config'
import { formatDate } from '@/components/utils/helper'

// Define your ListingItem type
export interface ListingItem {
  id: number
  image: string | null
  name: string
  condition: string
  color: string
  category: string
  price: string
  seller_name: string
  seller_image: string
  listing_date: string
  status: string
}

// Define handlers for view & delete actions
interface ListingColumnHandlers {
  page: number
  handleView: (id: number) => void
  handleDeleteClick: (id: number) => void
}

// Define your columns
export const listingColumns = ({
  page,
  handleView,
  handleDeleteClick,
}: ListingColumnHandlers): ColumnDef<ListingItem>[] => [
  {
    key: 'sn',
    header: 'SN',
    render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
  },
  {
    key: 'image',
    header: 'Image',
    render: (listing): ReactNode =>
      listing.image ? (
        <img
          src={listing.image}
          alt={listing.name}
          width={48}
          height={48}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded-md" />
      ),
  },
  {
    key: 'name',
    header: 'Name',
    render: (listing): ReactNode => listing.name,
  },
  {
    key: 'condition',
    header: 'Condition',
    render: (listing): ReactNode => listing.condition,
  },
  {
    key: 'color',
    header: 'Color',
    render: (listing): ReactNode => listing.color,
  },
  {
    key: 'category',
    header: 'Category',
    render: (listing): ReactNode => listing.category,
  },
  {
    key: 'price',
    header: 'Price',
    render: (listing): ReactNode => `$${listing.price}`,
  },
  {
    key: 'seller',
    header: 'Seller',
    render: (listing): ReactNode => (
      <div className="flex items-center gap-2">
        <img
          src={listing.seller_image}
          alt={listing.seller_name}
          width={28}
          height={28}
          className="rounded-full object-cover"
        />
        <span>{listing.seller_name}</span>
      </div>
    ),
  },
  {
    key: 'listing_date',
    header: 'Listed On',
    render: (listing): ReactNode => formatDate(listing.listing_date),
  },
  {
    key: 'status',
    header: 'Status',
    render: (listing): ReactNode => (
      <Badge
        color={
          listing.status.toLocaleLowerCase() === 'active' ? '#AD7A22' : 'gray'
        }
        variant="light"
      >
        <div className="flex items-center gap-2">
          <div
            className={`size-2 ${
              listing.status.toLocaleLowerCase() === 'active'
                ? 'bg-yellow-600'
                : 'bg-gray-800'
            } rounded-full`}
          />
          {listing.status}
        </div>
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (listing): ReactNode => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} stroke={2} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye size={16} />}
            onClick={() => handleView(listing.id)}
          >
            View
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(listing.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
