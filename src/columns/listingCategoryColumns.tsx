import type { ReactNode } from 'react'
import { ActionIcon, Avatar, Badge, Menu, Tooltip } from '@mantine/core'
import { IconDotsVertical, IconEye } from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Id } from '@/types/global.type'
import { perPage } from '@/constant/config'
import { formatDate } from '@/utils/helper'
import { formatNumber } from '@/utils/formatters'
import type { ListingCategoryItems } from '@/types/marketPlaces.types'

interface ListingColumnsProps {
  page: number
  handleView: (id: Id) => void
  handleDeleteClick?: (id: Id) => void
  handleApprove?: (id: Id) => void
  handleReject?: (id: Id) => void
  buttonLayout?: 'menu' | 'horizontal'
  showActions?: string[]
}

export const listingCategoryColumns = ({
  page,
  handleView,
}: ListingColumnsProps): ColumnDef<ListingCategoryItems>[] => {
  const columns: ColumnDef<ListingCategoryItems>[] = [
    {
      key: 'sn',
      header: 'SN',
      sortable: false,
      render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
    },
    {
      key: 'image',
      header: 'Image',
      sortable: false,
      render: (listing): ReactNode => (
        <Avatar src={listing?.image ?? undefined} size="md" />
      ),
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (listing): ReactNode => (
        <p className="capitalize">{listing?.name}</p>
      ),
    },
    {
      key: 'condition',
      header: 'Condition',
      sortable: false,
      render: (listing): ReactNode => listing?.condition,
    },
    {
      key: 'color',
      header: 'Color',
      sortable: false,
      render: (listing): ReactNode => listing?.color,
    },
    {
      key: 'category',
      header: 'Category',
      render: (listing): ReactNode => listing?.category,
    },
    {
      key: 'price',
      header: 'Price',
      sortable: false,
      render: (listing): ReactNode => `NGN ${formatNumber(listing?.price)}`,
    },
    {
      key: 'seller_image',
      header: 'Seller Image',
      sortable: false,
      render: (listing): ReactNode => (
        <Avatar
          src={listing?.seller_image}
          alt={listing?.seller_name}
          size="md"
        />
      ),
    },
    {
      key: 'seller_name',
      header: 'Seller Name',
      render: (listing): ReactNode => (
        <div className="max-w-[180px]">
          <span
            title={listing?.seller_name}
            className="truncate text-sm font-medium"
          >
            {listing?.seller_name}
          </span>
        </div>
      ),
    },
    {
      key: 'listing_date',
      header: 'Listed On',
      render: (listing): ReactNode => formatDate(listing?.listing_date),
    },
    {
      key: 'status',
      header: 'Status',
      render: (listing): ReactNode => (
        <Tooltip label={listing?.status?.toLowerCase()} withArrow>
          <Badge
            color={
              listing?.status?.toLowerCase() === 'active'
                ? 'green'
                : listing?.status?.toLowerCase() === 'denied'
                  ? 'red'
                  : 'gray'
            }
            variant="light"
          >
            <div className="flex items-center gap-2">
              <div
                className={`size-2 rounded-full ${
                  listing?.status?.toLowerCase() === 'active'
                    ? 'bg-green-600'
                    : listing?.status?.toLowerCase() === 'denied'
                      ? 'bg-red-600'
                      : 'bg-gray-500'
                }`}
              />
              {listing?.status}
            </div>
          </Badge>
        </Tooltip>
      ),
    },
  ]

  columns.push({
    key: 'actions',
    sortable: false,
    header: 'Actions',
    render: (listing): ReactNode => {
      return (
        <Menu>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDotsVertical size={18} stroke={2} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEye size={16} />}
              onClick={() => handleView(listing?.id)}
            >
              View
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )
    },
  })

  return columns
}
