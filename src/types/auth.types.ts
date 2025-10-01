export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  phone_number: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface AuthResponse {
  data: {
    token: string
    refreshToken: string
    user: {
      id: string
      firstName: string
      lastName: string
      email: string
    }
  }
}

export interface RegisterResponse {
  data: {
    user: {
      UserConfirmed: boolean
      CodeDeliveryDetails: {
        Destination: string
      }
    }
  }
}

export interface ConfirmEmailPayload {
  email: string | null
  confirmationCode: string
}

export interface ResendCodePayload {
  email: string | null
}

export interface ResetPasswordPayload {
  oldPassword: string
  newPassword: string
}

export interface ConfirmForgotPasswordPayload {
  email: string | null
  confirmationCode: string
  password: string
}
