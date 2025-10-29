import { useMemo } from 'react'

type SortConfig<T> = {
  key: keyof T
  direction: 'asc' | 'desc'
}

function useSortedData<T>(data: T[], sortConfig: SortConfig<T>) {
  return useMemo(() => {
    // if (!sortConfig.key) return data

    const sortableItems = [...data]

    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return sortableItems
  }, [data, sortConfig])
}

export default useSortedData
