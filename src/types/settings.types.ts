export interface PlatformRateResponse {
  charge_percentage: number
  sale_percentage: number
}

export interface ResetPasswordForm {
  current_password: string
  password: string
  password_confirmation: string
}

export interface NotificationSettings {
  notifications: boolean
  new_report: boolean
  sales_summary: boolean
  new_user: boolean
}

export interface NotificationSettingsResponse {
  status_code: number
  success: boolean
  message: string
  data: NotificationSettings
}
