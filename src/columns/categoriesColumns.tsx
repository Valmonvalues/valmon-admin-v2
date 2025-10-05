import type { ReactNode } from 'react'
import { ActionIcon, Menu, Image, Text } from '@mantine/core'
import { IconDotsVertical, IconEye, IconTrash } from '@tabler/icons-react'
import type { Id } from '@/types/global.type'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { CategoriesResponse } from '@/types/skills.types'

interface CategoriesColumnHandlers {
  handleView: (id: Id) => void
  handleDeleteClick: (id: Id) => void
}

export const categoriesColumns = ({
  handleView,
  handleDeleteClick,
}: CategoriesColumnHandlers): ColumnDef<CategoriesResponse>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => index + 1,
  },
  {
    key: 'image',
    header: 'Image',
    sortable: false,
    render: (category): ReactNode => (
      <Image
        src={category.image}
        alt={category.name}
        // width={12}
        // height={12}
        style={{ width: 35, height: 30, objectFit: 'cover', borderRadius: 8 }}
        radius="xl"
        fit="cover"
      />
    ),
  },
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (category): ReactNode => <Text fw={500}>{category.name}</Text>,
  },
  {
    key: 'sub_categories_count',
    header: 'Sub Categories',
    render: (category): ReactNode => category.sub_categories_count,
  },
  {
    key: 'total_users',
    header: 'Users',
    render: (category): ReactNode => category.total_users,
  },
  {
    key: 'total_transactionst',
    header: 'Transactions',
    render: (category): ReactNode => category.total_transactionst,
  },
  {
    key: 'transaction_value',
    header: 'Transaction Value',
    render: (category): ReactNode =>
      category.transaction_value != null
        ? `$${Number(category.transaction_value).toFixed(2)}`
        : '—',
  },
  {
    key: 'valmon_earning',
    header: 'Valmon Earning',
    render: (category): ReactNode =>
      category.valmon_earning != null
        ? `$${Number(category.valmon_earning).toFixed(2)}`
        : '—',
  },
  {
    key: 'actions',
    header: 'Actions',
    sortable: false,
    render: (category): ReactNode => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} stroke={2} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye size={16} />}
            onClick={() => handleView(category.id)}
          >
            View
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(category.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
