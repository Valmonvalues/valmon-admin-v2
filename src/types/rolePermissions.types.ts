export interface Permission {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  pivot?: {
    role_id: number
    permission_id: number
  }
}

export interface Role {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  users_count: number
  permissions: Permission[]
  access_level?: string
}

export interface NewRole {
  name: string
  permissions: number[]
}
