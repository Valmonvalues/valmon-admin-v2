export interface Pagination {
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: string | null
  prev_page_url: string | null
}

export interface Params {
  page: number
  perpage: number
}
