import type { Id, Params } from '@/types/global.type'
import { apiClient } from './apiClient'

interface ActionPayload {
  request_ids: Id[]
  action: 'approve' | 'reject'
  reason?: string // Required if action is 'reject'
}

export const categoryRequestApi = {
  listCategoryRequest: async (params?: Params) => {
    const response = await apiClient.get('/get/category-requests', { params })
    return response.data
  },

  //   category-requests/action
  actionCategoryRequest: async (
    payload: ActionPayload,
  ): Promise<{ message: string }> => {
    const response = await apiClient.post(`/category-requests/action`, payload)
    return response.data
  },
}

// API DOCUMENTATION:
// POST —  /request-service
// Sample :
// {
//     "category_id"  : 1,
//     "requester_name" : "Tobi",
//     "custom_name" : "Lawyer",
//     "custom_description" : "None"
// }
// GET - /get/category-requests      (ADMIN ROUTE)
// POST — /category-requests/action.   (ADMIN ROUTE)
// Sample
// {
//     "request_ids" : [1],
//     "action" : "approve",     // approve or reject
//     "reason" : "Some reason"      // required if reject
// }
