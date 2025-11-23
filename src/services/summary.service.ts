import { summaryApi } from '@/api/summary.api'
import { useQuery } from '@tanstack/react-query'

export const useSummary = () => {
  const getSummary = () => {
    return useQuery({
      queryKey: ['summary'],
      queryFn: () => summaryApi.summary(),
    })
  }

  return {
    getSummary,
  }
}
