import type { ReactNode } from 'react'
import { ActionIcon, Menu, Badge, Text } from '@mantine/core'
import { IconDotsVertical, IconEye } from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Ticket } from '@/types/resolution.types'
import { formatDate } from '@/utils/helper'
import { perPage } from '@/constant/config'

interface ResolutionColumnHandlers {
  page: number
  handleView: (id: number) => void
}

export const resolutionMarketplaceColumns = ({
  page,
  handleView,
}: ResolutionColumnHandlers): ColumnDef<Ticket>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
  },
  {
    key: 'buyer',
    header: 'Buyer',
    render: (ticket): ReactNode => (
      <Text className="capitalize">{ticket?.buyer}</Text>
    ),
  },
  {
    key: 'seller',
    header: 'Seller',
    render: (ticket): ReactNode => (
      <Text className="capitalize">{ticket?.seller}</Text>
    ),
  },
  {
    key: 'complainer',
    header: 'Complainer',
    render: (ticket): ReactNode => (
      <Text className="capitalize">{ticket?.complainer}</Text>
    ),
  },
  {
    key: 'amount',
    header: 'Amount',
    render: (ticket): ReactNode => (
      <span className="font-medium text-gray-800">
        {/* ₦ */}
        NGN {Number(ticket?.amount)?.toLocaleString()}
      </span>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    render: (ticket): ReactNode => (
      <span className="text-sm text-gray-700">{ticket?.category}</span>
    ),
  },
  {
    key: 'reason',
    header: 'Reason',
    render: (ticket): ReactNode => (
      <span className="text-sm text-gray-600 max-w-[200px] line-clamp-2">
        {ticket?.reason}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (ticket): ReactNode => (
      <Badge
        variant="light"
        color={
          ticket?.status === 'open'
            ? 'yellow'
            : ticket?.status === 'resolved'
              ? 'green'
              : 'gray'
        }
      >
        {ticket?.status}
      </Badge>
    ),
  },
  {
    key: 'created_at',
    header: 'Created At',
    render: (ticket): ReactNode => formatDate(ticket?.created_at),
  },
  {
    key: 'actions',
    header: 'Actions',
    sortable: false,
    render: (ticket): ReactNode => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} stroke={2} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye size={16} />}
            onClick={() => handleView(ticket?.id)}
          >
            View
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
