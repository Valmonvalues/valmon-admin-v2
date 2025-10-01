import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from '@/types/auth.types'
import { apiClient } from './apiClient'

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> =>
    await apiClient.post('/login', payload),

  register: async (payload: RegisterPayload): Promise<RegisterResponse> =>
    await apiClient.post('/auth/register', payload),
}
