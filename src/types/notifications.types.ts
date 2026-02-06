export interface NotificationsResponse {
  status_code: number
  success: boolean
  message: string
  data: NotificationItem[]
}

export interface NotificationItem {
  id: string
  type: string // e.g. "App\\Notifications\\Admin\\NewHireNotification"
  notifiable_type: string
  notifiable_id: string
  data: NotificationData
  read_at: string | null
  created_at: string
  updated_at: string
}

export interface NotificationData {
  type: NotificationType // "job" | "order" | "conflict" | "user"
  title: string
  message: string
  meta: NotificationMeta
}

// union of all possible meta variants
export type NotificationMeta = JobMeta | OrderMeta | ConflictMeta | UserMeta

export type NotificationType = 'job' | 'order' | 'conflict' | 'user'

export interface JobMeta {
  job_id: number
}

export interface OrderMeta {
  order_id: number
}

export interface ConflictMeta {
  ticket_id: number
}

export interface UserMeta {
  user_id: number
  email: string
}
