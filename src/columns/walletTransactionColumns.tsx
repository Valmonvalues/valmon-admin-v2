import type { ReactNode } from 'react'
import { ActionIcon, Badge, Menu } from '@mantine/core'
import {
  IconDotsVertical,
  IconEye,
  IconArrowDown,
  IconArrowUp,
} from '@tabler/icons-react'
import type { ColumnDef } from '@/components/table/ReusableTable'
import type { Id } from '@/types/global.type'
import type { WalletTransaction } from '@/types/wallet.types'
import { formatDate } from '@/components/utils/helper'

interface WalletTransactionColumnHandlers {
  handleView: (id: Id) => void
}

export const walletTransactionColumns = ({
  handleView,
}: WalletTransactionColumnHandlers): ColumnDef<WalletTransaction>[] => [
  {
    key: 'sn',
    header: 'SN',
    sortable: false,
    render: (_, index): ReactNode => index + 1,
  },
  {
    key: 'type',
    header: 'Type',
    render: (txn): ReactNode => {
      const isFunding = txn.type === 'funding'
      return (
        <div className="flex items-center gap-1">
          {isFunding ? (
            <IconArrowDown size={18} className="text-green-600" />
          ) : (
            <IconArrowUp size={18} className="text-red-600" />
          )}
          <span className="capitalize">{txn.type}</span>
        </div>
      )
    },
  },
  {
    key: 'amount',
    header: 'Amount',
    render: (txn): ReactNode =>
      `${txn.currency} ${Number(txn.amount).toLocaleString()}`,
  },
  {
    key: 'status',
    header: 'Status',
    render: (txn): ReactNode => (
      <Badge
        color={txn.status === 'success' ? 'green' : 'gray'}
        variant="light"
      >
        <div className="flex items-center gap-2">
          <div
            className={`size-2 rounded-full ${
              txn.status === 'success' ? 'bg-green-600' : 'bg-gray-500'
            }`}
          />
          {txn.status}
        </div>
      </Badge>
    ),
  },
  {
    key: 'created_at',
    header: 'Date',
    render: (txn): ReactNode => formatDate(txn.created_at),
  },
  {
    key: 'actions',
    header: '',
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
        </Menu.Dropdown>
      </Menu>
    ),
  },
]
