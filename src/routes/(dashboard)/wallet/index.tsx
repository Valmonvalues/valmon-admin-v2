import { useState } from 'react'
// import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal'
import { walletTransactionColumns } from '@/columns/walletTransactionColumns'
import { ReusableTable } from '@/components/table/ReusableTable'
import DashboardLayout from '@/layout/DashboardLayout'
import { useWallet } from '@/services/wallet.service'
import { createFileRoute } from '@tanstack/react-router'
import type { WalletTransaction } from '@/types/wallet.types'
import useSortedData from '@/hook/sortData'
import type { Id } from '@/types/global.type'

export const Route = createFileRoute('/(dashboard)/wallet/')({
  component: Wallet,
})

function Wallet() {
  const { listingSummary } = useWallet()
  const { data: walletData, isLoading: walletDataLoading } = listingSummary()
  const transaction = walletData?.transactions || []

  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof WalletTransaction
    direction: 'asc' | 'desc'
  }>({ key: 'created_at', direction: 'asc' })

  const sortedTransaction = useSortedData(transaction, sortConfig)

  const handleSort = (key: keyof WalletTransaction) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleView = (transactionId: Id) => {
    // navigate({ to: `/users/${transactionId}` })
    console.log(transactionId)
  }

  // console.log(walletData)

  return (
    <DashboardLayout>
      <div className="">
        <div className="">
          <ReusableTable
            title="Awaiting Approval List"
            totalCount={transaction.length}
            data={sortedTransaction}
            columns={walletTransactionColumns({ handleView })}
            isLoading={walletDataLoading}
            searchQuery={search}
            onSearchChange={setSearch}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        {/* <ConfirmDeleteModal
          opened={deleteModalOpen}
          onCancel={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Transaction"
          message="Are you sure you want to delete this user? This action cannot be undone."
          loading={deleteTransaction.isPending}
        /> */}
      </div>
    </DashboardLayout>
  )
}
