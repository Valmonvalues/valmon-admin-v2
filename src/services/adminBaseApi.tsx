// import { useState } from 'react'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useNavigate } from '@tanstack/react-router'

// Simulate useCookie from Nuxt
const useCookie = (key: string): { value: any } => {
  const cookieValue = localStorage.getItem(key)
  return {
    value: cookieValue ? JSON.parse(cookieValue) : null,
  }
}

export const adminBaseApi = () => {
  const navigate = useNavigate()

  const apiFetch = async (url: string, options: AxiosRequestConfig = {}) => {
    const tokenData = useCookie('token').value

    const config: AxiosRequestConfig = {
      baseURL: 'https://valmon.ctrixx.com/admin/',
      url,
      method: options.method || 'GET',
      headers: {
        ...(options.headers || {}),
      },
      ...options,
    }

    // onRequest logic
    if (tokenData && tokenData.type === 'Admin') {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${tokenData.token}`,
      }
    }

    try {
      const response: AxiosResponse = await axios(config)
      console.log('This is from AdminApi ->', response)
      return response
    } catch (error: any) {
      const status = error?.response?.status

      // onResponseError logic
      //   if (status === 401) {
      //     navigate('/dashboard/')
      //   }

      throw error
    }
  }

  const get = (url: string, options: AxiosRequestConfig = {}) =>
    apiFetch(url, {
      ...options,
      method: 'GET',
    })

  const post = (url: string, body: any, options: AxiosRequestConfig = {}) =>
    apiFetch(url, { ...options, method: 'POST', data: body })

  const put = (url: string, body: any, options: AxiosRequestConfig = {}) =>
    apiFetch(url, { ...options, method: 'PUT', data: body })

  const del = (url: string, options: AxiosRequestConfig = {}) =>
    apiFetch(url, { ...options, method: 'DELETE' })

  return {
    apiFetch,
    get,
    post,
    put,
    del,
  }
}
