// import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'

// Dashboard.tsx
// import wallet from '@/assets/icons/empty-wallet.svg'
// import walletCheck from '@/assets/icons/wallet-check.svg'
// import convertShape from '@/assets/icons/convertshape.svg'
// import cardblack from '@/assets/icons/card-pos-black.svg'

// import SharedLoader from './SharedLoader'
// import DashboardAreaChart from './DashboardAreaChart'
// import DashboardBarChart from './DashboardBarChart'
// import DashboardLineChart from './DashboardLineChart'
// import DashboardStatsCard from './DashboardStatsCard'
// import { summary } from '@/services/summary'
import DashboardLayout from '@/layout/DashboardLayout'
import StatCard from '@/components/StatCard'
import { formatNumber } from '@/utils/formatters'
import { AreaChart } from '@mantine/charts'

export const data = [
  { date: '2024-01-01', Apples: 20 },
  { date: '2024-01-02', Apples: 35 },
  { date: '2024-01-03', Apples: 50 },
  { date: '2024-01-04', Apples: 30 },
  { date: '2024-01-05', Apples: 70 },
  { date: '2024-01-06', Apples: 90 },
  { date: '2024-01-07', Apples: 55 },
  { date: '2024-01-08', Apples: 65 },
  { date: '2024-01-09', Apples: 40 },
  { date: '2024-01-10', Apples: 80 },
]

// interface PlatformOverview {
//   [key: string]: number | { value: number; percentage?: number }
// }

// interface SummaryData {
//   platform_overview: PlatformOverview
//   top_marketplace_categories: { name: string }[]
//   top_skill_categories: { name: string }[]
//   total_users: {
//     value: number
//     percentage_increase: number
//   }
//   income_from_skills: any
//   skilled_employments: any
//   market_place_sales: any
// }

// interface Card {
//   title: string
//   value: any
//   icon: string
//   id: string
//   bg: string
// }

export const Route = createFileRoute('/(dashboard)/summary/')({
  component: Dashboard,
})
// export const Route = createFileRoute('/dashboard')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/dashboard"!</div>
// }

// const Dashboard: React.FC = () => {
function Dashboard() {
  // const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')
  // const [, setLoading] = useState<boolean>(false)
  // const [topMarketCategory, setTopMarketCategory] = useState<
  //   { name: string }[]
  // >([])
  // const [topCategory, setTopCategory] = useState<{ name: string }[]>([])

  // const [appSummary, setAppSummary] = useState<{
  //   cards: { data: Card[]; icon: any[] }
  //   data: Partial<SummaryData>
  // }>({
  //   cards: {
  //     data: [
  //       {
  //         title: 'All Reports',
  //         value: 40,
  //         icon: walletCheck,
  //         id: 'all_reports',
  //         bg: 'bg-[#F45E5E1A]',
  //       },
  //       {
  //         title: 'Resolved Reports',
  //         value: 40,
  //         icon: wallet,
  //         id: 'resolved_reports',
  //         bg: 'bg-[#5E6DF41A]',
  //       },
  //       {
  //         title: 'In-Escrow',
  //         value: 40,
  //         icon: convertShape,
  //         id: 'in_escrow_count',
  //         bg: 'bg-[#F45E5E1A]',
  //       },
  //       {
  //         title: 'In-Escrow Value',
  //         value: 40,
  //         icon: cardblack,
  //         id: 'in_escrow_amount',
  //         bg: 'bg-[#5EF4881A]',
  //       },
  //     ],
  //     icon: [],
  //   },
  //   data: {},
  // })

  // //   const { summary } = SummaryController()

  // const fetchSummary = async (selectedPeriod: string) => {
  //   setLoading(true)
  //   try {
  //     const summaryRequest = summary()

  //     const { data, status } = await summaryRequest(selectedPeriod)
  //     console.log(status)
  //     if (status.value === 'success') {
  //       const _data: SummaryData = data.value.data
  //       setAppSummary((prev) => ({
  //         ...prev,
  //         data: _data,
  //       }))

  //       setTopMarketCategory(_data.top_marketplace_categories || [])
  //       setTopCategory(_data.top_skill_categories || [])

  //       setAppSummary((prev) => {
  //         const newCards = prev.cards.data.map((card) => {
  //           const overviewValue = _data.platform_overview[card.id]
  //           return {
  //             ...card,
  //             value: overviewValue ?? card.value,
  //           }
  //         })

  //         return {
  //           ...prev,
  //           cards: {
  //             ...prev.cards,
  //             data: newCards,
  //           },
  //         }
  //       })
  //     } else if (status.value === 'error') {
  //       console.error(error.value)
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchSummary(period)
  // }, [period])

  return (
    <DashboardLayout>
      {/* <div className="bg-primary_bg w-full p-8">
        <div className="bg-black w-fit text-sm p-2 mb-10 px-5 rounded-2xl text-white center gap-3">
          <span> Show Result For</span>
          <span className="ring ring-white ring-offset-0 center rounded-sm">
            <select
              value={period}
              onChange={(e) =>
                setPeriod(e.target.value as 'week' | 'month' | 'year')
              }
              className="select border max-w-xs ml-4 bg-black"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </span>
        </div>


        <div className="flex gap-4 mb-10">
          <div className="card card-compact bg-base-100 h-[500px] w-2/4 shadow-xl flex-1">
          <div className="card-body">
            {loading ? (
              <SharedLoader />
            ) : (
              <DashboardAreaChart
                incomeFromSkills={appSummary.data?.income_from_skills}
              />
            )}
          </div>
        </div>

          <div className="flex gap-4 flex-col">

            <div className="card card-compact bg-base-100 min-w-[19%] h-40 shadow-xl">
              <div className="card-body p-[16px] text-[#101828]">
                <h2 className="text-[#101828] text-sm font-semibold">
                  Total User
                </h2>
                <div className="flex flex-col justify-evenly gap-4">
                  <p className="flex items-center justify-between w-[70%] mx-auto">
                    <span className="text-[22px] font-bold">
                      {appSummary.data?.total_users?.value}
                    </span>
                    <svg
                      width="43"
                      height="43"
                      viewBox="0 0 43 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="43" height="43" rx="10" fill="#DADFFF" />
                      <path
                        opacity="0.59"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.7474 16.7394C14.7474 18.775 16.4543 20.4251 18.5598 20.4251C20.6652 20.4251 22.3721 18.775 22.3721 16.7394C22.3721 14.7039 20.6652 13.0537 18.5598 13.0537C16.4543 13.0537 14.7474 14.7039 14.7474 16.7394ZM24.2782 20.4252C24.2782 21.9519 25.5584 23.1895 27.1375 23.1895C28.7166 23.1895 29.9967 21.9519 29.9967 20.4252C29.9967 18.8986 28.7166 17.6609 27.1375 17.6609C25.5584 17.6609 24.2782 18.8986 24.2782 20.4252Z"
                        fill="#4C4C4C"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.5439 22.2678C14.044 22.2678 10.3521 24.5037 9.98268 28.9014C9.96255 29.1409 10.4364 29.6393 10.6754 29.6393H26.4196C27.1355 29.6393 27.1466 29.0822 27.1355 28.9021C26.8562 24.3808 23.1071 22.2678 18.5439 22.2678ZM32.3374 29.6393H28.6624V29.6392C28.6624 27.5652 27.9536 25.6512 26.7575 24.1113C30.0041 24.1457 32.655 25.7327 32.8545 29.0865C32.8625 29.2216 32.8545 29.6393 32.3374 29.6393Z"
                        fill="#4C4C4C"
                      />
                    </svg>
                  </p>
                  <div className="flex gap-2 items-center w-[70%] mx-auto">
                  {appSummary.data?.total_users?.percentage_increase > 0 ? (
                    <svg
                      width="22"
                      height="12"
                      viewBox="0 0 22 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0992 0L17.4679 2.29L12.4202 7.17L8.28283 3.17L0.618286 10.59L2.07672 12L8.28283 6L12.4202 10L18.9366 3.71L21.3053 6V0H15.0992Z"
                        fill="#00B69B"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="12"
                      viewBox="0 0 22 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0992 12L17.4679 9.71L12.4202 4.83L8.28283 8.83L0.618286 1.41L2.07672 0L8.28283 6L12.4202 2L18.9366 8.29L21.3053 6V12H15.0992Z"
                        fill="#FF0000"
                      />
                    </svg>
                  )}
                  <span
                    className={`${
                      appSummary.data?.total_users?.percentage_increase < 0
                        ? 'text-[#FF0000]'
                        : 'text-[#00B69B]'
                    }`}
                  >
                    {appSummary.data?.total_users?.percentage_increase}%
                  </span>
                  <span>Up from yesterday</span>
                </div>
                </div>
              </div>
            </div>

            <div className="card card-compact bg-base-100 w-80 shadow-xl">
              <div className="card-body gap-1">
                <h2 className="text-sm mb-1">Top Skill Categories</h2>
                <div className="text-[#606060] flex flex-wrap text-sm font-semibold justify-between items-center gap-4">
                  {topCategory.map((detail, index) => (
                    <div key={index}>
                      <span className="text-brightGold mr-2">{index + 1}.</span>
                      <span>{detail.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card card-compact bg-base-100 w-80 shadow-xl">
              <div className="card-body gap-1">
                <h2 className="text-sm mb-1">Top MarketPlace Categories</h2>
                <div className="text-[#606060] flex flex-wrap text-sm font-semibold justify-between items-center gap-4">
                  {topMarketCategory.map((detail, index) => (
                    <div key={index}>
                      <span className="text-brightGold mr-2">{index + 1}.</span>
                      <span>{detail.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 mb-10">
          <div className="card card-compact bg-base-100 h-[400px] w-2/4 shadow-xl flex-1">
          <div className="card-body">
            {loading ? (
              <SharedLoader />
            ) : (
              <DashboardBarChart
                skilledEmployments={appSummary.data?.skilled_employments}
              />
            )}
          </div>
        </div>
          <div className="card card-compact bg-base-100 h-[400px] w-2/4 shadow-xl flex-1">
          <div className="card-body">
            {loading ? (
              <SharedLoader />
            ) : (
              <DashboardLineChart
                marketplaceSales={appSummary.data?.market_place_sales}
              />
            )}
          </div>
        </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-between mb-10">
        {appSummary.cards.data.map((detail, index) => (
          <DashboardStatsCard
            key={index}
            title={detail.title}
            value={detail.value?.value ?? detail.value}
            percentage={detail.value?.percentage}
            icon={detail.icon}
            iconBg={detail.bg}
          />
        ))}
      </div>
      </div> */}
      <div className="">Coming Soon</div>
      <AreaChart
        h={300}
        data={data}
        dataKey="date"
        yAxisProps={{ domain: [0, 100] }}
        series={[{ name: 'Apples', color: 'indigo.6' }]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1000px] mb-6">
        <StatCard
          title="All Reports"
          value={0}
          color="bg-pink-100"
          // image={profile}
        />
        <StatCard
          title="Resolved Reports"
          value={formatNumber(0)}
          color="bg-purple-100"
          // image={cardblack}
        />
        <StatCard
          title="In-Escrow"
          value={formatNumber(0)}
          color="bg-dark-gold"
          // image={cardwhite}
        />
        <StatCard
          title="In-Escrow Value"
          value={formatNumber(0)}
          color="bg-green-100"
          // image={earningImage}
        />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
