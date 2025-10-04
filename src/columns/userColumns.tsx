import type { ReactNode } from 'react'
import { ActionIcon, Badge, Menu } from '@mantine/core'
import { IconDotsVertical, IconEye, IconTrash } from '@tabler/icons-react'
import type { Id } from '@/types/global.type'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { User } from '@/types/user.types'
import { perPage } from '@/constant/config'
import { formatDate } from '@/components/utils/helper'

interface UserColumnHandlers {
  page: number
  handleView: (id: Id) => void
  handleDeleteClick: (id: Id) => void
}

export const userColumns = ({
  page,
  handleView,
  handleDeleteClick,
}: UserColumnHandlers): ColumnDef<User>[] => [
  {
    key: 'sn',
    header: 'SN',
    render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
  },
  {
    key: 'image',
    header: 'Image',
    render: (user): ReactNode => (
      <img
        src={user.image}
        alt={user.name}
        width={32}
        height={32}
        className="rounded-full object-cover"
      />
    ),
  },
  { key: 'name', header: 'Name', render: (user): ReactNode => user.name },
  { key: 'email', header: 'Email', render: (user): ReactNode => user.email },
  {
    key: 'listings_count',
    header: 'Market Listing',
    render: (user): ReactNode => user.listings_count,
  },
  {
    key: 'join_date',
    header: 'Joined Date',
    render: (user): ReactNode => formatDate(user.join_date),
  },
  {
    key: 'reported_count',
    header: 'Times Reported',
    render: (user): ReactNode => user.reported_count,
  },
  { key: 'type', header: 'Types', render: (user): ReactNode => user.type },
  {
    key: 'last_seen_at',
    header: 'Last Seen',
    render: (user): ReactNode => user.last_seen_at,
  },
  {
    key: 'status',
    header: 'Status',
    render: (user): ReactNode => (
      <Badge
        color={
          user.status.toLocaleLowerCase() === 'active' ? '#AD7A22' : 'gray'
        }
        variant="light"
      >
        <div className="flex items-center gap-2">
          <div
            className={`size-2 ${user.status.toLocaleLowerCase() === 'active' ? 'bg-yellow-600' : 'bg-gray-800'} rounded-full`}
          />
          {user.status}
        </div>
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (user): ReactNode => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} stroke={2} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye size={16} />}
            onClick={() => handleView(user.id)}
          >
            View
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(user.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
