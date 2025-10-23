import type { ReactNode } from 'react'
import { ActionIcon, Menu, Image, Badge } from '@mantine/core'
import { IconDotsVertical, IconEye, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Ticket } from '@/types/resolution.types'
import { formatDate } from '@/components/utils/helper'
import { perPage } from '@/constant/config'

interface ResolutionColumnHandlers {
  page: number
  handleView: (id: number) => void
  handleDeleteClick: (id: number) => void
}

export const resolutionServicesColumns = ({
  page,
  handleView,
  handleDeleteClick,
}: ResolutionColumnHandlers): ColumnDef<Ticket>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
  },
  {
    key: 'employer',
    header: 'Employer',
    render: (ticket): ReactNode => ticket.employer,
  },
  {
    key: 'provider',
    header: 'Provider',
    sortable: false,
    render: (ticket): ReactNode => ticket.provider,
  },
  {
    key: 'complainer',
    header: 'Complainer',
    render: (ticket): ReactNode => ticket.complainer,
  },
  {
    key: 'amount',
    header: 'Amount',
    render: (ticket): ReactNode => (
      <span className="font-medium text-gray-800">
        ₦{Number(ticket.amount).toLocaleString()}
      </span>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    render: (ticket): ReactNode => (
      <span className="text-sm text-gray-700">{ticket.category}</span>
    ),
  },
  {
    key: 'reason',
    header: 'Reason',
    render: (ticket): ReactNode => (
      <span className="text-sm text-gray-600 max-w-[200px] line-clamp-2">
        {ticket.reason}
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
          ticket.status === 'open'
            ? 'yellow'
            : ticket.status === 'resolved'
              ? 'green'
              : 'gray'
        }
      >
        {ticket.status}
      </Badge>
    ),
  },
  {
    key: 'image',
    header: 'Image',
    sortable: false,
    render: (ticket): ReactNode => (
      <Image
        src={ticket.image}
        alt="ticket image"
        width={40}
        height={40}
        radius="sm"
        className="object-cover"
      />
    ),
  },
  {
    key: 'created_at',
    header: 'Created At',
    render: (ticket): ReactNode => formatDate(ticket.created_at),
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
            onClick={() => handleView(ticket.id)}
          >
            View
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(ticket.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
