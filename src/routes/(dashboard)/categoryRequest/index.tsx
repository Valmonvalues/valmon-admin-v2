import DashboardLayout from '@/layout/DashboardLayout'
import { useCategoryRequest } from '@/services/categoryRequest.service'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/categoryRequest/')({
  component: CategoryRequest,
})

function CategoryRequest() {
  const { listCategoryRequest } = useCategoryRequest()
  const { data } = listCategoryRequest()
  console.log(data)

  return (
    <DashboardLayout>
      <div>Hello "/(dashboard)/categoryRequest/"!</div>
    </DashboardLayout>
  )
}
