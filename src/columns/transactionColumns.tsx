import type { ReactNode } from 'react'
import { ActionIcon, Badge, Menu } from '@mantine/core'
import { IconDotsVertical, IconEye } from '@tabler/icons-react'
import type { Id } from '@/types/global.type'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Transaction } from '@/types/skills.types'
import { formatDate } from '@/components/utils/helper'
import { formatNumber } from '@/utils/formatters'

interface TransactionColumnHandlers {
  handleView: (id: Id) => void
  handleDeleteClick: (id: Id) => void
}

export const transactionColumns = ({
  handleView,
}: TransactionColumnHandlers): ColumnDef<Transaction>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => index + 1,
  },
  {
    key: 'employer_name',
    header: 'Employer',
    sortable: true,
    render: (txn): ReactNode => txn.employer_name,
  },
  {
    key: 'employee_name',
    header: 'Employee',
    render: (txn): ReactNode => txn.employee_name,
  },
  {
    key: 'category',
    header: 'Category',
    render: (txn): ReactNode => txn.category || 'N/A',
  },
  {
    key: 'skill',
    header: 'Skill',
    render: (txn): ReactNode => txn?.skill || 'N/A',
  },
  {
    key: 'job_time',
    header: 'Job Time',
    render: (txn): ReactNode => txn?.job_time || '13 Hours',
  },
  {
    key: 'amount',
    header: 'Amount',
    render: (txn): ReactNode => `NGN ${formatNumber(txn.amount)}`,
  },
  {
    key: 'to_valmon',
    header: 'To Valmon',
    render: (txn): ReactNode => `NGN ${formatNumber(txn.to_valmon)}`,
  },
  {
    key: 'date',
    header: 'Date',
    render: (txn): ReactNode => formatDate(txn.date),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: false,
    render: (txn): ReactNode => (
      <Badge
        color={txn.status.toLowerCase() === 'completed' ? 'green' : 'gray'}
        variant="light"
      >
        <div className="flex items-center gap-2">
          <div
            className={`size-2 ${
              txn.status.toLowerCase() === 'completed'
                ? 'bg-green-600'
                : 'bg-gray-500'
            } rounded-full`}
          />
          {txn.status}
        </div>
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    sortable: false,
    render: (txn): ReactNode => (
      <Menu>
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <IconDotsVertical size={18} stroke={2} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye size={16} />}
            onClick={() => handleView(txn.id)}
          >
            View
          </Menu.Item>
          {/* <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(txn.id)}
          >
            Delete
          </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
