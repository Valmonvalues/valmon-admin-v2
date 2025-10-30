import { skillsApi } from '@/api/skills.api'
import type { Id, Params } from '@/types/global.type'
import { notifications } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useSkills = () => {
  const queryClient = useQueryClient()
  const listSkills = (params?: Params) => {
    return useQuery({
      queryKey: ['transactions', params],
      queryFn: () => skillsApi.listTransaction(params),
    })
  }

  const listCategories = (params?: Params) => {
    return useQuery({
      queryKey: ['categories', params],
      queryFn: () => skillsApi.listCategories(params),
    })
  }

  const addCategory = useMutation({
    mutationFn: skillsApi.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      notifications.show({
        title: 'Success',
        message: 'Category added successfully',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to add category',
        color: 'red',
      })
    },
  })

  const addSubCategory = useMutation({
    mutationFn: skillsApi.addSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
      notifications.show({
        title: 'Success',
        message: 'Sub-category added successfully',
        color: 'green',
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to add sub-category',
        color: 'red',
      })
    },
  })

  const editSubCategory = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: Id
      data: { name: string; description?: string; image?: File | string }
    }) => skillsApi.editSubCategory(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
      notifications.show({
        title: 'Success',
        message: 'Sub-category updated successfully',
        color: 'green',
      })
    },

    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message:
          error.response?.data?.message || 'Failed to update sub-category',
        color: 'red',
      })
    },
  })

  const listParentSubCategory = (id: Id, params?: Params) => {
    return useQuery({
      queryKey: ['sub-categories', id, params],
      queryFn: () => skillsApi.getParentSubCategory(id, params),
    })
  }

  const listCustomers = (id: Id, params?: Params) => {
    return useQuery({
      queryKey: ['customers', id, params],
      queryFn: () => skillsApi.getCustomers(id, params),
    })
  }

  const deleteTransaction = useMutation({
    mutationFn: (id: Id) => skillsApi.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const deleteParent = useMutation({
    mutationFn: (id: Id) => skillsApi.deleteParent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const deleteSubCategory = useMutation({
    mutationFn: (id: Id) => skillsApi.deleteSubCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sub-categories'] })
    },
  })

  return {
    listSkills,
    listCategories,
    addCategory,
    addSubCategory,
    editSubCategory,
    listParentSubCategory,
    listCustomers,
    deleteTransaction,
    deleteParent,
    deleteSubCategory,
  }
}
