import { summaryApi } from '@/api/summary.api'
import type { Params } from '@/types/global.type'
import { useQuery } from '@tanstack/react-query'

export const useSummary = () => {
  const getSummary = (params?: Params) => {
    return useQuery({
      queryKey: ['summary', params],
      queryFn: () => summaryApi.summary(params),
    })
  }

  return {
    getSummary,
  }
}
