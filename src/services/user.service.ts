import { userApi } from '@/api/user.api'
import type { Id, Params } from '@/types/global.type'
import type { UserResponseType } from '@/types/user.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUser = () => {
  const queryClient = useQueryClient()
  // const listUsers = (params?: Params) => {
  //   return useQuery({
  //     queryKey: ['users', params],
  //     queryFn: () => userApi.list(params),
  //   })
  // }

  // const listUsers = (params?: Params) =>
  //   useQuery<UserResponseType>({
  //     queryKey: ['users', params?.page, params?.search],
  //     queryFn: () => userApi.list(params),
  //     keepPreviousData: true, // keeps UI stable between pages
  //   })

  const listUsers = (params?: Params & { search?: string }) =>
    useQuery<UserResponseType>({
      queryKey: ['users', params?.page, params?.search],
      queryFn: () => userApi.list(params),
      // keepPreviousData: true,
    })

  const getUsersSummary = useQuery({
    queryKey: ['userSummary'],
    queryFn: userApi.getUsersSummary,
  })

  const getUser = (id: Id) =>
    useQuery({
      queryKey: ['user', id],
      queryFn: () => userApi.getUser(id),
    })

  const getMe = () =>
    useQuery({
      queryKey: ['me'],
      queryFn: userApi.getMe,
    })

  const deleteUser = useMutation({
    mutationFn: (id: Id) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const suspendUser = useMutation({
    mutationFn: (id: Id) => userApi.suspendUser(id),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({ queryKey: ['user', variable] })
    },
  })

  const restoreUser = useMutation({
    mutationFn: (id: Id) => userApi.restoreUser(id),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({ queryKey: ['user', variable] })
    },
  })

  return {
    listUsers,
    getUsersSummary,
    getUser,
    getMe,
    deleteUser,
    suspendUser,
    restoreUser,
  }
}
