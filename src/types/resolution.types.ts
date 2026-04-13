export interface Ticket {
  id: number
  employer: string
  provider: string
  conversation_id: number
  complainer: string
  category: string
  completed_at: string | null
  amount: string
  reason: string
  description: string
  image: string
  status: 'open' | 'closed' | 'resolved' | string
  created_at: string
  buyer?: string
  seller?: string
}

export interface Pagination {
  current_page: number
  total_pages: number
  total_items: number
  items_per_page: number
}

export interface TicketSummary {
  ticketsAmount: string
  ticketAmountGrowthPercentage: string
  ticketCount: number
  resolvedTicketCount: number
  resolvedTicketValue: number
}

export interface TicketsResponse {
  tickets: Ticket[]
  pagination: Pagination
  summary: TicketSummary
}
