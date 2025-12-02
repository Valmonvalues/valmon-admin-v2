export interface CategoryRequest {
  id: number
  category_id: string
  requester_name: string
  category_name: string
  category_description: string
  status: 'pending' | 'approved' | 'rejected'
  reason_for_rejection: string | null
  created_at: string // ISO timestamp
  updated_at: string // ISO timestamp
}

export interface CategoryRequestResponse {
  status_code: number
  success: boolean
  message: string
  data: CategoryRequest[]
}
