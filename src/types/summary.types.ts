export interface ValuePercentage {
  value: number
  percentage_increase: number
}

export interface PlatformOverview {
  all_reports: ValuePercentage
  resolved_reports: ValuePercentage
  in_escrow_count: number
  in_escrow_amount: number
}

export interface TotalUsers {
  value: number
  percentage_increase: number
}

export interface MarketplaceCategory {
  id: number
  name: string
  status: string
  description: string | null
  created_at: string
  updated_at: string
  listings_count: string
}

export interface SkillCategory {
  id: number
  name: string
  status: string
  description: string | null
  created_at: string
  updated_at: string
  jobs_count?: string
}

export interface ChartData {
  labels: string[]
  values: number[]
}

export interface SummaryData {
  platform_overview: PlatformOverview
  total_users: TotalUsers
  //   top_skill_categories: SkillCategory[]
  top_skill_categories: any[]
  top_marketplace_categories: MarketplaceCategory[]
  skilled_employments: ChartData
  income_from_skills: ChartData
  market_place_sales: ChartData
}

export interface SummaryResponse {
  status_code: number
  success: boolean
  message: string
  data: SummaryData
}
