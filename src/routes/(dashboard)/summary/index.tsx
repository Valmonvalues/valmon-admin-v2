import { createFileRoute } from '@tanstack/react-router'

import DashboardLayout from '@/layout/DashboardLayout'
import StatCard from '@/components/StatCard'
import { formatNumber } from '@/utils/formatters'
// import { AreaChart, BarChart } from '@mantine/charts'
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { useSummary } from '@/services/summary.service'
import {
  Card,
  Group,
  Loader,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import { useState } from 'react'
import { routeGaurd } from '@/components/utils/routeGuard'
import { allowedRoles } from '@/data/roles'

export const Route = createFileRoute('/(dashboard)/summary/')({
  component: Dashboard,
  loader: () => routeGaurd(allowedRoles.summary),
})

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState('This Year')
  const { getSummary } = useSummary()
  const { data: summaryData, isLoading } = getSummary()
  console.log(summaryData)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-orange-500 text-white px-3 py-2 rounded-md shadow-lg">
          <p className="text-sm font-semibold">
            {payload[0].value.toLocaleString('en-NG', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      )
    }
    return null
  }

  const platformIncomeData =
    summaryData?.income_from_skills?.labels.map((label, index) => ({
      month: label,
      income: summaryData?.income_from_skills?.values[index],
    })) || []

  const skilledEmploymentsData =
    summaryData?.skilled_employments?.labels.map((label, index) => ({
      month: label,
      count: summaryData?.skilled_employments?.values[index],
    })) || []

  const marketplaceSalesData =
    summaryData?.market_place_sales.labels.map((label, index) => ({
      month: label,
      sales: summaryData?.market_place_sales?.values[index],
    })) || []

  const allReports =
    formatNumber(
      summaryData?.platform_overview?.all_reports.value.toLocaleString(),
    ) || '0'
  const allReportsTrend =
    summaryData?.platform_overview?.all_reports.percentage_increase.toLocaleString() ||
    '0'

  const resolvedReports =
    formatNumber(
      summaryData?.platform_overview?.resolved_reports.value.toLocaleString(),
    ) || '0'
  const resolvedReportsTrend =
    summaryData?.platform_overview?.resolved_reports.percentage_increase.toLocaleString() ||
    '0'

  const inEscrowCount =
    formatNumber(
      summaryData?.platform_overview?.in_escrow_count.toLocaleString(),
    ) || '0'

  const inEscrowAmount =
    formatNumber(
      summaryData?.platform_overview?.in_escrow_amount.toLocaleString(),
    ) || '0'

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="orange" size="lg" />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header with filter */}
        {/* <Group mb="xl" p={7} w={300} className="bg-black text-white">
          <Text size="sm" fw={400}>
            Show Result For
          </Text>
          <Select
            value={selectedYear}
            onChange={(value) => setSelectedYear(value || 'This Year')}
            data={['This Year', 'Last Year', '2022', '2021']}
            w={150}
            styles={{
              input: {
                backgroundColor: '#000',
                color: '#fff',
                border: '1px solid #fff',
                borderRadius: 6,
              },
            }}
          />
        </Group> */}

        <Paper
          p={5}
          mb="lg"
          radius="md"
          withBorder
          maw={300}
          bg="black"
          c="white"
        >
          <Group justify="space-between">
            <Text size="sm" fw={500}>
              Show Result For
            </Text>

            <Select
              value={selectedYear}
              onChange={(value) => setSelectedYear(value || 'This Year')}
              data={['This Year', 'Last Year', '2022', '2021']}
              w={150}
              styles={{
                input: {
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid #fff',
                },
              }}
            />
          </Group>
        </Paper>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg" mb="xl">
          {/* Platform Income Chart */}
          <Card shadow="sm" padding="lg" radius="md" className="col-span-2">
            <Text size="lg" fw={600} mb="md">
              Platform Income From Skills
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={platformIncomeData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FCD34D" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fill="url(#colorIncome)"
                  dot={{ r: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Right side cards */}
          <Stack gap="lg">
            <Card shadow="xs" padding="lg" radius="md" className="bg-white">
              <Group justify="space-between" mb="xs">
                <div>
                  <Text size="sm" fw={600}>
                    Total Users
                  </Text>
                  <Text size="xl" fw={700} mt="xs">
                    {summaryData?.total_users.value.toLocaleString()}
                  </Text>
                  <Text size="xs" c="teal" fw={500} mt="xs">
                    📈 {summaryData?.total_users.percentage_increase}% Up from
                    Last Year
                  </Text>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                  <IconUsers size={24} color="#1e1e1e" />
                </div>
              </Group>
            </Card>

            <Card shadow="xs" padding="lg" radius="md" className="bg-white">
              <Text size="sm" fw={600} mb="sm">
                Top Skill Categories
              </Text>
              <SimpleGrid cols={3} spacing="xs">
                {summaryData?.top_skill_categories.length === 0 ? (
                  <Text size="xs" c="dimmed">
                    No data available
                  </Text>
                ) : (
                  summaryData?.top_skill_categories
                    .slice(0, 9)
                    .map((category, idx) => (
                      <Text key={category.id} size="xs" c="dimmed">
                        {idx + 1}. {category.name}
                      </Text>
                    ))
                )}
              </SimpleGrid>
            </Card>

            <Card shadow="xs" padding="lg" radius="md" className="bg-white">
              <Text size="sm" fw={600} mb="sm">
                Top Marketplace Categories
              </Text>
              <SimpleGrid cols={3} spacing="xs">
                {summaryData?.top_marketplace_categories
                  .slice(0, 9)
                  .map((category, idx) => (
                    <Text key={category.id} size="xs">
                      <span className="text-dark-gold">{idx + 1}. </span>{' '}
                      {category.name}
                    </Text>
                  ))}
              </SimpleGrid>
            </Card>
          </Stack>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
          {/* Skilled Employments Chart */}
          <Card shadow="sm" padding="lg" radius="md">
            <Text size="lg" fw={600} mb="xs">
              Skilled Employments
            </Text>
            <Text size="sm" c="dimmed" mb="md">
              Number Of employments on the platform
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={skilledEmploymentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Marketplace Sales Chart */}
          <Card shadow="sm" padding="lg" radius="md">
            <Text size="lg" fw={600} mb="xs">
              Marketplace Sales
            </Text>
            <Text size="sm" c="dimmed" mb="md">
              Income Over Time
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={marketplaceSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </SimpleGrid>

        {/* max-w-[1000px] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  mb-6">
          <StatCard
            title="All Reports"
            value={allReports}
            trend={allReportsTrend}
            color="bg-pink-100"
            // image={profile}
          />
          <StatCard
            title="Resolved Reports"
            value={resolvedReports}
            trend={resolvedReportsTrend}
            color="bg-purple-100"
            // image={cardblack}
          />
          <StatCard
            title="In-Escrow"
            value={inEscrowCount}
            color="bg-dark-gold"
            // image={cardwhite}
          />
          <StatCard
            title="In-Escrow Value"
            value={inEscrowAmount}
            color="bg-green-100"
            // image={earningImage}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
