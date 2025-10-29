import type { ReactNode } from 'react'
import { ActionIcon, Menu, Text } from '@mantine/core'
import {
  IconDotsVertical,
  IconEye,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import type { Id } from '@/types/global.type'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { SubCategory } from '@/types/skills.types'

// export interface SubCategory {
//   id: number
//   name: string
//   total_users: number
//   total_transactions: number
//   transacted_value: number | string
//   valmon_earning: number | string
// }

interface SubCategoriesColumnHandlers {
  handleView: (id: Id) => void
  handleEditSubCategory: (
    id: Id,
    updatedData: { name: string; description?: string },
  ) => void
  handleDeleteClick: (id: Id) => void
}

export const subCategoriesColumns = ({
  handleView,
  handleEditSubCategory,
  handleDeleteClick,
}: SubCategoriesColumnHandlers): ColumnDef<SubCategory>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => index + 1,
  },
  {
    key: 'name',
    header: 'Subcategory Name',
    sortable: true,
    render: (subCategory): ReactNode => (
      <Text fw={500}>{subCategory.name}</Text>
    ),
  },
  {
    key: 'total_users',
    header: 'Users',
    sortable: true,
    render: (subCategory): ReactNode => subCategory.total_users ?? 0,
  },
  {
    key: 'total_transactions',
    header: 'Transactions',
    sortable: true,
    // render: (subCategory): ReactNode => subCategory.total_tansactions ?? 0,
    render: (subCategory): ReactNode => subCategory.total_transactions ?? 0,
  },
  {
    key: 'transacted_value',
    header: 'Transaction Value',
    sortable: true,
    render: (subCategory): ReactNode =>
      `NGN ${Number(subCategory.transacted_value).toFixed(2)}`,

    // subCategory.transacted_value
    //   ? `$${Number(subCategory.transacted_value).toFixed(2)}`
    //   : '—',
  },
  {
    key: 'valmon_earning',
    header: 'Valmon Earning',
    sortable: true,
    render: (subCategory): ReactNode =>
      `NGN ${Number(subCategory.valmon_earning).toFixed(2)}`,

    // subCategory.valmon_earning
    //   ? `$${Number(subCategory.valmon_earning).toFixed(2)}`
    //   : '—',
  },
  {
    key: 'actions',
    header: 'Actions',
    sortable: false,
    render: (subCategory): ReactNode => (
      <Menu position="bottom-end" shadow="md">
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} stroke={2} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye size={16} />}
            onClick={() => handleView(subCategory.id)}
          >
            View
          </Menu.Item>
          <Menu.Item
            leftSection={<IconPencil size={16} />}
            onClick={() => handleEditSubCategory(subCategory.id)}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(subCategory.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
