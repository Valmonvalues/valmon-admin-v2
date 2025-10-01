// src/api/apiClient.ts
// import { storage, API } from '@/constant/config'
import { API, storage } from '@/constant/config'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(async (config: any) => {
  let token = storage.getItem('valmon_adminToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: any) => {
    // Any status code within 2xx will trigger this
    return response.data
  },
  (error: any) => {
    // Any status codes outside 2xx will trigger this
    console.log('API error API API:', error)
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status, data } = error.response
      if (
        [403, 401].includes(status) ||
        data.message === 'Access Token has been revoked'
      ) {
        // localStorage.removeItem('authToken')
        // window.location.href = '/login'
        return Promise.reject(new Error('Unauthorized access'))
      }
      // Create a custom error object with the server's message
      const apiError = new Error(
        data?.message ||
          data?.error ||
          `Request failed with status code ${status}`,
      )

      // Attach additional properties
      Object.assign(apiError, {
        status,
        data,
        isApiError: true,
      })

      return Promise.reject(apiError)
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('Network error - no response received'))
    } else {
      // Something happened in setting up the request
      return Promise.reject(new Error('Request setup error'))
    }
  },
)

// Type for our enhanced error
export interface ApiError extends Error {
  status?: number
  data?: any
  isApiError?: boolean
}

// Helper function to check if error is an API error
export function isApiError(error: any): error is ApiError {
  return error?.isApiError === true
}
