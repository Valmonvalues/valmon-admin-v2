import type { Params } from '@/types/global.type'
import { apiClient } from './apiClient'

export const categoryRequestApi = {
  listCategoryRequest: async (params?: Params) => {
    const response = await apiClient.get('/get/category-requests', { params })
    return response.data
  },

  //   category-requests/action
  approveCategoryRequest: async (): Promise<{ message: string }> => {
    const response = await apiClient.put(`/category-requests/approve`)
    return response.data
  },
  denyCategoryRequest: async (): Promise<{ message: string }> => {
    const response = await apiClient.put(`/category-requests/deny`)
    return response.data
  },
}

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
