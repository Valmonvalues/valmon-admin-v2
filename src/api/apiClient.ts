// src/api/apiClient.ts
// import { storage, API } from '@/constant/config'
import { API, API_BASE, storage } from '@/constant/config'
import axios from 'axios'

export type ApiType = 'admin' | 'client'

const createApiClient = (baseURL: string) => {
  console.log(baseURL)
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  client.interceptors.request.use(async (config: any) => {
    let token = storage.getItem('valmon_adminToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  // Response interceptor for error handling
  client.interceptors.response.use(
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
        // console.log(status, data)

        if ([403, 401].includes(status)) {
          if (
            ['token', 'access', 'unauthorized', 'unauthenticated.'].includes(
              data.message.toLowerCase(),
            )
          ) {
            storage.removeItem('valmon_adminToken')
            window.location.href = '/'
          }

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

  return client
}

const clients = {
  admin: createApiClient(API),
  client: createApiClient(API_BASE),
}

export const apiClient = clients.admin
export const baseApiClient = clients.client

// export const api = (type: ApiType = 'admin') => clients[type]

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

// export const apiClient = axios.create({
//   baseURL: API,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// apiClient.interceptors.request.use(async (config: any) => {
//   let token = storage.getItem('valmon_adminToken')

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response: any) => {
//     // Any status code within 2xx will trigger this
//     return response.data
//   },
//   (error: any) => {
//     // Any status codes outside 2xx will trigger this
//     console.log('API error API API:', error)
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       const { status, data } = error.response
//       console.log(status, data)

//       if ([403, 401].includes(status)) {
//         if (
//           ['token', 'access', 'unauthorized', 'unauthenticated.'].includes(
//             data.message.toLowerCase(),
//           )
//         ) {
//           storage.removeItem('valmon_adminToken')
//           window.location.href = '/'
//         }

//         return Promise.reject(new Error('Unauthorized access'))
//       }
//       // Create a custom error object with the server's message
//       const apiError = new Error(
//         data?.message ||
//           data?.error ||
//           `Request failed with status code ${status}`,
//       )

//       // Attach additional properties
//       Object.assign(apiError, {
//         status,
//         data,
//         isApiError: true,
//       })

//       return Promise.reject(apiError)
//     } else if (error.request) {
//       // The request was made but no response was received
//       return Promise.reject(new Error('Network error - no response received'))
//     } else {
//       // Something happened in setting up the request
//       return Promise.reject(new Error('Request setup error'))
//     }
//   },
// )

// Type for our enhanced error
// export interface ApiError extends Error {
//   status?: number
//   data?: any
//   isApiError?: boolean
// }

// // Helper function to check if error is an API error
// export function isApiError(error: any): error is ApiError {
//   return error?.isApiError === true
// }
