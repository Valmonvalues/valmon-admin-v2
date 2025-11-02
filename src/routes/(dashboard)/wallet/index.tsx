import { useState } from 'react'
import { Card, Text, Button, Image, Select, Loader } from '@mantine/core'
import { walletTransactionColumns } from '@/columns/walletTransactionColumns'
import { ReusableTable } from '@/components/table/ReusableTable'
import DashboardLayout from '@/layout/DashboardLayout'
import { useWallet } from '@/services/wallet.service'
import { createFileRoute } from '@tanstack/react-router'
import type { WalletTransaction } from '@/types/wallet.types'
import useSortedData from '@/hook/sortData'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import shop from '@/assets/icons/shop.svg'
import cardpos from '@/assets/icons/card-pos-black.svg'

export const Route = createFileRoute('/(dashboard)/wallet/')({
  component: Wallet,
})

function Wallet() {
  const { listingSummary } = useWallet()
  const { data: walletData, isLoading: walletDataLoading } = listingSummary()
  const transaction = walletData?.transactions || []
  console.log(walletData)

  const [showBalance, setShowBalance] = useState(true)
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

  // const handleView = (transactionId: Id) => {
  //   // navigate({ to: `/users/${transactionId}` })
  //   console.log(transactionId)
  // }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {walletDataLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader color="gold" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Wallet Balance Card */}
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              // className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-black col-span-2"
              className="bg-yellow-500 text-black col-span-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text fw={600} size="md">
                    Wallet Balance
                  </Text>

                  <Text fw={700} size="xl" className="text-4xl mb-4">
                    {showBalance
                      ? `NGN ${Number(
                          walletData?.wallet_balance ?? 0,
                        ).toLocaleString('en-NG', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : '••••••••'}
                  </Text>
                </div>
                <button
                  onClick={() => setShowBalance((prev) => !prev)}
                  className="p-2 rounded-full hover:bg-yellow-200 transition"
                  aria-label="Toggle balance visibility"
                >
                  {showBalance ? (
                    <IconEye size={24} color="#333" />
                  ) : (
                    <IconEyeOff size={24} color="#333" />
                  )}
                </button>
              </div>

              <Button
                color="dark"
                radius="md"
                size="md"
                className="px-6 font-semibold"
              >
                Withdraw
              </Button>
            </Card>

            {/* Total Income Card */}
            <Card
              shadow="xs"
              padding="lg"
              radius="md"
              className="bg-white flex flex-col justify-between"
            >
              <Image
                radius="md"
                // h={imageSize}
                w="auto"
                src={shop}
                alt={'title'}
                // className={imageClassName}
              />
              {/* <img src={shop} alt="bell icon" /> */}

              <div>
                <Text fw={600} size="sm" c="dimmed">
                  Total Income
                </Text>
                <Text fw={700} size="lg" mt="xs">
                  NGN
                  {Number(walletData?.total_income ?? 0).toLocaleString(
                    'en-NG',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  )}
                </Text>
              </div>
              <Text size="xs" c="green" mt="xs">
                📈 8.5% Up from last week
              </Text>
            </Card>

            {/* Total Withdrawn Card */}
            <Card
              shadow="xs"
              padding="lg"
              radius="md"
              className="bg-white flex flex-col justify-between"
            >
              <Image
                radius="md"
                h={30}
                w="auto"
                src={cardpos}
                alt={'title'}
                // className={imageClassName}
              />
              {/* <img src={cardpos} alt="bell icon" /> */}

              <div>
                <Text fw={600} size="sm" c="dimmed">
                  Total Withdrawn
                </Text>
                <Text fw={700} size="lg" mt="xs">
                  NGN
                  {Number(walletData?.total_withdrawal ?? 0).toLocaleString(
                    'en-NG',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  )}
                </Text>
              </div>
              <Text size="xs" c="green" mt="xs">
                📈 8.5% Up from last week
              </Text>
            </Card>

            {/* Select Currency Card */}
            <Card
              shadow="xs"
              padding="lg"
              radius="md"
              className="bg-white flex flex-col justify-between"
            >
              <Text fw={600} size="sm">
                Select Currency
              </Text>
              <Select
                data={[
                  { value: 'NGN', label: '🇳🇬 NGN' },
                  { value: 'USD', label: '🇺🇸 USD' },
                  { value: 'EUR', label: '🇪🇺 EUR' },
                ]}
                defaultValue="NGN"
                size="md"
                mt="md"
              />
            </Card>
          </div>
        )}
        <ReusableTable
          title="Transactions"
          totalCount={transaction.length}
          data={sortedTransaction}
          // columns={walletTransactionColumns({ handleView })}
          columns={walletTransactionColumns()}
          isLoading={walletDataLoading}
          searchQuery={search}
          onSearchChange={setSearch}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </DashboardLayout>
  )
}
