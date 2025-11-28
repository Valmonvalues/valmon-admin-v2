import type { ReactNode } from 'react'
import { Avatar, Badge, Menu, ActionIcon } from '@mantine/core'
import { IconDotsVertical, IconEye, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import { perPage } from '@/constant/config'
import type { AccountManager } from '@/types/accountManagers.types'

interface AccountManagerColumnHandlers {
  page: number
  handleView: (id: number) => void
  handleDeleteClick: (id: number) => void
}

export const accountManagerColumns = ({
  page,
  handleView,
  handleDeleteClick,
}: AccountManagerColumnHandlers): ColumnDef<AccountManager>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
  },
  //   {
  //     key: 'name',
  //     header: 'Name',
  //     sortable: false,
  //     render: (manager): ReactNode => (
  //       <div className="flex items-center gap-3">
  //         <Avatar src={manager.image} alt={manager.name} radius="xl" />
  //         <div>
  //           <p className="text-sm font-medium text-gray-900">{manager.name}</p>
  //           <p className="text-xs text-gray-500">{manager.email}</p>
  //         </div>
  //       </div>
  //     ),
  //   },
  {
    key: 'image',
    header: 'Avatar',
    sortable: false,
    render: (manager): ReactNode => (
      <Avatar src={manager.image} alt={manager.name} radius="xl" />
    ),
  },
  {
    key: 'name',
    header: 'Name & Email',
    // sortable: false,
    render: (manager): ReactNode => (
      <div>
        <p className="text-sm font-medium text-gray-900 capitalize">
          {manager.name}
        </p>
        <p className="text-xs text-gray-500">{manager.email}</p>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    render: (manager): ReactNode => (
      <Badge
        color={manager.role === 'super_admin' ? 'blue' : 'gray'}
        variant="light"
        radius="sm"
        size="sm"
      >
        {manager.role.replace('_', ' ')}
      </Badge>
    ),
  },
  {
    key: 'last_seen',
    header: 'Last Seen',
    render: (manager): ReactNode => (
      <span className="text-sm text-gray-700">{manager.last_seen}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (manager): ReactNode => (
      <Badge
        color={manager.status === 'active' ? 'green' : 'red'}
        variant="light"
        radius="sm"
        size="sm"
      >
        {manager.status}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    sortable: false,
    render: (manager): ReactNode => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} stroke={2} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye size={16} />}
            onClick={() => handleView(manager.id)}
          >
            View
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(manager.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
