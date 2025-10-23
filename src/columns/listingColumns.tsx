import type { ReactNode } from 'react'
import { ActionIcon, Avatar, Badge, Button, Group, Menu } from '@mantine/core'
import {
  IconCheck,
  IconDotsVertical,
  IconEye,
  IconTrash,
  IconX,
  IconEdit,
} from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Id } from '@/types/global.type'
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

interface ListingColumnsProps {
  page: number
  handleView: (id: Id) => void
  handleDeleteClick?: (id: Id) => void
  handleApprove?: (id: Id) => void
  handleReject?: (id: Id) => void
  buttonLayout?: 'menu' | 'horizontal' // Changed from isButtons to buttonLayout
  showActions?: string[]
}

// Define your columns
export const listingColumns = ({
  page,
  handleView,
  handleDeleteClick,
  handleApprove,
  handleReject,
  buttonLayout = 'menu', // Use buttonLayout instead of isButtons
  showActions = ['view', 'edit', 'delete'],
}: ListingColumnsProps): ColumnDef<ListingItem>[] => [
  {
    key: 'sn',
    header: 'SN',
    render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
  },
  {
    key: 'image',
    header: 'Image',
    render: (listing): ReactNode => <Avatar src={listing.image} size="md" />,
  },
  {
    key: 'name',
    header: 'Product Name',
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
    key: 'seller_image',
    header: 'Seller Image',
    render: (listing): ReactNode => (
      <div className="flex justify-center">
        <div className="w-9 h-9 flex-shrink-0">
          <img
            src={listing.seller_image}
            alt={listing.seller_name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    key: 'seller_name',
    header: 'Seller Name',
    render: (listing): ReactNode => (
      <div className="max-w-[180px]">
        <span
          title={listing.seller_name}
          className="truncate text-sm font-medium"
        >
          {listing.seller_name}
        </span>
      </div>
    ),
  },
  {
    key: 'price',
    header: 'Price',
    render: (listing): ReactNode => `$${listing.price}`,
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
    render: (listing): ReactNode => {
      // Use buttonLayout instead of isButtons
      if (buttonLayout === 'horizontal') {
        return (
          <Group gap="xs" wrap="nowrap">
            {showActions.includes('approve') && (
              <Button
                size="xs"
                variant="light"
                color="green"
                leftSection={<IconCheck size={14} />}
                onClick={() => handleApprove?.(listing.id)} // Fixed: listing.id not item.id
              >
                Approve
              </Button>
            )}
            {showActions.includes('reject') && (
              <Button
                size="xs"
                variant="light"
                color="red"
                leftSection={<IconX size={14} />}
                onClick={() => handleReject?.(listing.id)} // Fixed: listing.id not item.id
              >
                Reject
              </Button>
            )}
            {showActions.includes('view') && (
              <Button
                size="xs"
                variant="light"
                leftSection={<IconEye size={14} />}
                onClick={() => handleView(listing.id)} // Fixed: listing.id not item.id
              >
                View
              </Button>
            )}
            {showActions.includes('edit') && (
              <Button
                size="xs"
                variant="light"
                leftSection={<IconEdit size={14} />}
                onClick={() => handleView(listing.id)} // You might want a separate edit handler
              >
                Edit
              </Button>
            )}
          </Group>
        )
      } else {
        // Menu layout
        return (
          <Menu position="bottom-end" withArrow>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDotsVertical size={18} stroke={2} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {showActions.includes('view') && (
                <Menu.Item
                  leftSection={<IconEye size={16} />}
                  onClick={() => handleView(listing.id)}
                >
                  View
                </Menu.Item>
              )}
              {showActions.includes('edit') && (
                <Menu.Item
                  leftSection={<IconEdit size={16} />}
                  onClick={() => handleView(listing.id)} // You might want a separate edit handler
                >
                  Edit
                </Menu.Item>
              )}
              {showActions.includes('delete') && handleDeleteClick && (
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  onClick={() => handleDeleteClick(listing.id)}
                >
                  Delete
                </Menu.Item>
              )}
              {showActions.includes('approve') && handleApprove && (
                <Menu.Item
                  leftSection={<IconCheck size={16} />}
                  color="green"
                  onClick={() => handleApprove(listing.id)}
                >
                  Approve
                </Menu.Item>
              )}
              {showActions.includes('reject') && handleReject && (
                <Menu.Item
                  leftSection={<IconX size={16} />}
                  color="red"
                  onClick={() => handleReject(listing.id)}
                >
                  Reject
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        )
      }
    },
  },
]
