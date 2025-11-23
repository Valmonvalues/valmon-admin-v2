import { useMemo, useState } from 'react'
import { Card, Text, Image, Select, Loader } from '@mantine/core'
import { walletTransactionColumns } from '@/columns/walletTransactionColumns'
import { ReusableTable } from '@/components/table/ReusableTable'
import DashboardLayout from '@/layout/DashboardLayout'
import { useWallet } from '@/services/wallet.service'
import { createFileRoute } from '@tanstack/react-router'
import type { WalletTransaction } from '@/types/wallet.types'
import useSortedData from '@/hook/sortData'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import income from '@/assets/icons/import.svg'
import withdrawIcon from '@/assets/icons/export.svg'
import withdrawLight from '@/assets/icons/export-light.svg'
import { useGlobalContext } from '@/contexts/GlobalContext'
import BaseButton from '@/components/BaseButton'
import type { Field } from '@/components/modals/AddModal'
import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'

export const Route = createFileRoute('/(dashboard)/wallet/')({
  component: Wallet,
  loader: () => routeGaurd(allowedRoles.wallet),
})

function Wallet() {
  const { listingSummary, listingBanks, sendWithdrawOtp, withdrawal } =
    useWallet()
  const { data: walletData, isLoading: walletDataLoading } = listingSummary()
  const { data: bankNames } = listingBanks() // isLoading: bankNamesloading
  const { mutate: getOtp, isPending: getOtpIsLoading } = sendWithdrawOtp
  const { mutate: withdraw, isPending: withdrawIsLoading } = withdrawal

  const transaction = walletData?.transactions || []
  // console.log(walletData)

  const [showBalance, setShowBalance] = useState(true)
  // const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof WalletTransaction
    direction: 'asc' | 'desc'
  }>({ key: 'created_at', direction: 'asc' })

  const { setOpenFormModal } = useGlobalContext()
  const sortedTransaction = useSortedData(transaction, sortConfig)

  const handleSort = (key: keyof WalletTransaction) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  // const handleGetOtp = () => {
  //   getOtp(_, {
  //     onSuccess: () => {
  //       console.log('Withdrawal successful')
  //     },
  //   })
  // }

  const handleWithdraw = (formValues: any) => {
    const selectedBank = bankNames?.find(
      (bank) => bank.code === formValues.bank,
    )

    const payload = {
      account_number: formValues.account_number,
      amount: Number(formValues.amount),
      bank: selectedBank?.name,
      otp: formValues.otp,
      bank_code: formValues.bank,
    }

    console.log(payload)

    withdraw(payload, {
      onSuccess: () => {
        console.log('Withdrawal successful')
      },
    })
  }

  const withdrawFields: Field[] = useMemo(
    () => [
      {
        name: 'account_number',
        label: 'Account Number',
        type: 'number',
        placeholder: 'Enter 10-digit account number',
      },
      {
        name: 'amount',
        label: 'Amount (NGN)',
        type: 'number',
        placeholder: 'Enter amount to withdraw',
      },
      {
        name: 'bank',
        label: 'Select Bank',
        type: 'select',
        scrollAreaProps: { style: { maxHeight: 15 } },
        options:
          bankNames?.map((bank: any) => ({
            label: bank.name,
            value: bank.code,
          })) || [],
      },
      {
        name: 'otp',
        label: 'OTP',
        type: 'otp',
        placeholder: 'Enter OTP',
        maxLength: 6,
        buttonText: 'Get OTP',
        onClick: () => getOtp(),
        disabled: getOtpIsLoading,
      },
    ],
    [bankNames, getOtp],
  )

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {walletDataLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader color="gold" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {/* Wallet Balance Card */}
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              // className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-black col-span-2"
              className="activeMenu col-span-2 flex justify-between"
            >
              <div className="flex flex-col justify-between gap-4">
                <Text fw={600} size="md">
                  Wallet Balance
                </Text>

                <div className="flex justify-between items-center">
                  <Text fw={900} size="" className="!text-3xl mb-4">
                    {showBalance
                      ? `NGN ${Number(
                          walletData?.wallet_balance ?? 0,
                        ).toLocaleString('en-NG', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : '••••••••'}
                  </Text>
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
              </div>

              <BaseButton
                title="Withdraw"
                color="black"
                textColor="white"
                fields={withdrawFields}
                modalTitle="Withdraw Funds"
                // onSubmit={(data) => {
                //   console.log('Withdrawal data:', data)
                // }}
                onSubmit={handleWithdraw}
                loading={withdrawIsLoading}
                onClick={() => setOpenFormModal(true)}
                className="px-4 font-semibold flex items-center gap-2"
                src={withdrawLight}
              />
            </Card>

            <div className="flex flex-col gap-6 h-full col-span-2">
              {/* Total Income Card */}
              <Card
                shadow="xs"
                padding="lg"
                radius="md"
                className="bg-white flex justify-between flex-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center rounded-xl bg-green-50">
                    <Image
                      radius="md"
                      w={50}
                      h={50}
                      fit="contain"
                      src={income}
                      alt={'title'}
                      p="xs"
                      // className="w-12 h-12 object-contain self-end"
                    />
                  </div>
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
                </div>
                <Text size="xs" c="green" mt="">
                  📈 8.5% Up from last week
                </Text>
              </Card>

              {/* Total Withdrawn Card */}
              <Card
                shadow="xs"
                padding="lg"
                radius="md"
                className="bg-white flex justify-between flex-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center rounded-xl bg-red-50">
                    <Image
                      radius="md"
                      w={50}
                      h={50}
                      fit="contain"
                      src={withdrawIcon}
                      alt={'title'}
                      p="xs"
                      // className="w-12 h-12 object-contain self-end"
                    />
                  </div>

                  <div className="">
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
                </div>
                <Text size="xs" c="green" mt="">
                  📈 8.5% Up from last week
                </Text>
              </Card>
            </div>

            {/* Select Currency Card */}
            <Card
              shadow="xs"
              padding="lg"
              radius="md"
              className="bg-black-custom flex flex-col justify-center"
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
                className="bg-black-custom"
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
          // searchQuery={search}
          // onSearchChange={setSearch}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </DashboardLayout>
  )
}
