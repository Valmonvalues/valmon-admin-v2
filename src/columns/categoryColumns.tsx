import type { ReactNode } from 'react'
import { ActionIcon, Menu } from '@mantine/core'
import { IconDotsVertical, IconEye, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import { perPage } from '@/constant/config'

export interface CategoryItem {
  id: number
  name: string
  products_listed: string
  products_sold: number
  active_listings_cost: number
  sold_amount: number
}

interface CategoryColumnHandlers {
  page: number
  handleView: (id: number) => void
  handleDeleteClick: (id: number) => void
}

export const categoryColumns = ({
  page,
  handleView,
  handleDeleteClick,
}: CategoryColumnHandlers): ColumnDef<CategoryItem>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => (page - 1) * perPage + index + 1,
  },
  {
    key: 'name',
    header: 'Category Name',
    render: (category): ReactNode => (
      <div className="max-w-[200px]">
        <span
          title={category.name}
          className="truncate text-sm font-medium text-gray-900"
        >
          {category.name}
        </span>
      </div>
    ),
  },
  {
    key: 'products_listed',
    header: 'Products Listed',
    render: (category): ReactNode => category.products_listed,
  },
  {
    key: 'products_sold',
    header: 'Products Sold',
    render: (category): ReactNode => category.products_sold,
  },
  {
    key: 'active_listings_cost',
    header: 'Active Listings Cost',
    render: (category): ReactNode => (
      <span className="font-medium text-gray-800">
        NGN {category.active_listings_cost.toLocaleString()}
      </span>
    ),
  },
  {
    key: 'sold_amount',
    header: 'Sold Amount',
    render: (category): ReactNode => (
      <span className="font-medium text-gray-800">
        NGN {category.sold_amount.toLocaleString()}
      </span>
    ),
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
