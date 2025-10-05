import type { ReactNode } from 'react'
import { ActionIcon, Badge, Menu } from '@mantine/core'
import { IconDotsVertical, IconEye, IconTrash } from '@tabler/icons-react'
import type { Id } from '@/types/global.type'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Transaction } from '@/types/skills.types'
// import { perPage } from '@/constant/config'
import { formatDate } from '@/components/utils/helper'

interface TransactionColumnHandlers {
  handleView: (id: Id) => void
  handleDeleteClick: (id: Id) => void
}

export const transactionColumns = ({
  handleView,
  handleDeleteClick,
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
    key: 'amount',
    header: 'Amount',
    render: (txn): ReactNode => `$${txn.amount}`,
  },
  {
    key: 'to_valmon',
    header: 'To Valmon',
    render: (txn): ReactNode => `$${txn.to_valmon}`,
  },
  {
    key: 'job_created_at',
    header: 'Job Created',
    render: (txn): ReactNode => formatDate(txn.job_created_at),
  },
  {
    key: 'job_completed_at',
    header: 'Job Completed',
    render: (txn): ReactNode =>
      txn.job_completed_at ? formatDate(txn.job_completed_at) : '—',
  },
  {
    key: 'date',
    header: 'Transaction Date',
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
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => handleDeleteClick(txn.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
