import { adminBaseApi } from './adminBaseApi'

export const summary = () => {
  const { get, post, put, del } = adminBaseApi()
  const summary = (period: string) => get(`summary?period=${period}`)

  return summary
  //   return (
  //     <div class="">summary</div>
  // )
}
