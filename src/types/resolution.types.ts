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

export interface TicketParticipant {
  id: number
  first_name: string
  last_name: string
  rating: number
  profile_pic: string | null
  account_type: 'worker' | 'employer' | string
  ratings_count: number
  inbox_response_time: number
  inbox_response_rate: number
  active_jobs_count: number
  completed_jobs_count: number
}

// Shared shape of the job/order attached to a ticket — the transaction the
// conflict is about. Its conversation_id is the parties' ORIGINAL chat with
// each other, not a resolution chat (see TicketDetail.conversations).
export interface TicketTransaction {
  id: number
  conversation_id: number
  amount: string
  fee: string
  status: string
  meta: unknown
  created_at: string
  updated_at: string
  completed_at: string | null
  title: string | null
  description: string | null
  service_id?: number
  listing_id?: number
}

// Actual shape of GET /tickets/:id.
export interface TicketDetail {
  id: number
  user_id: number
  reported_id: number
  job_id: number | null
  order_id: number | null
  reason: string
  status: 'open' | 'closed' | 'resolved' | string
  description: string
  image_path?: string
  image_url?: string
  created_at: string
  updated_at: string
  user: TicketParticipant
  reported_user: TicketParticipant
  job: TicketTransaction | null
  order: TicketTransaction | null
  resolution_decision: string | null
  resolved_at: string | null
  /**
   * One private conversation per party (admin ⇄ that party), created by the
   * admin's first message to them. A party without one hasn't been
   * contacted yet.
   */
  conversations: TicketConversation[]
}

/** Admin ⇄ one party. `user_id` is the party; there is no recipient. */
export interface TicketConversation {
  id: number
  user_id: number
  recipient_id: null
  ticket_id: number
  admin_id: number
  last_message_id: number | null
  last_message: Message | null
  /** Unread messages in BOTH directions, so not "unread from the party". */
  unread_count: number
  created_at: string
  updated_at: string
  user: MessageUser & { account_type?: string }
}

export interface MessageUser {
  id: number
  first_name: string
  last_name: string
  email?: string
  rating?: number
  ratings_count?: number
  profile_pic?: string | null
}

export interface Negotiation {
  id: number
  user_id: number
  price_offer: string
  accepted: boolean
  accepted_at: string | null
  rejected: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: number
  conversation_id: number
  /** null for messages sent by an admin (admins aren't in the users table). */
  user_id: number | null
  type: 'text' | 'image' | 'audio' | 'video' | 'document' | 'negotiation'
  content: string | null
  is_read: number
  file_path: string | null
  file_name: string | null
  mime_type: string | null
  parent_id: number | null
  created_at: string
  updated_at: string
  negotiation_id: number | null
  user: MessageUser | null
  negotiation: Negotiation | null
}

export interface SendMessagePayload {
  content: string
  type?: 'text' | 'image' | 'audio' | 'video' | 'document'
  file?: File
}

/** The three ways an admin can close a ticket. */
export type ResolutionAction = 'pay' | 'refund' | 'close'

