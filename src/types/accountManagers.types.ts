export interface AccountManager {
  id: number
  image: string
  name: string
  email: string
  role: 'admin' | 'super_admin'
  last_seen: string
  status: 'active' | 'inactive'
}

// export type AccountManagersResponse =  AccountManager[]
