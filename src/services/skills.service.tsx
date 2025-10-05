import { skillsApi } from '@/api/skills.api'
import type { Params } from '@/types/global.type'
import { useQuery } from '@tanstack/react-query'

export const useSkills = () => {
  const listSkills = (params?: Params) => {
    return useQuery({
      queryKey: ['/skills/transaction', params],
      queryFn: () => skillsApi.listTransaction(params),
    })
  }

  const listCategories = (params?: Params) => {
    return useQuery({
      queryKey: ['/skills/categories', params],
      queryFn: () => skillsApi.listCategories(params),
    })
  }

  return { listSkills, listCategories }
}
