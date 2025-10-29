import { useState, useMemo, useEffect } from 'react'
import { debounce } from 'lodash'

export function useDebouncedSearch(delay = 400) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value)
      }, delay),
    [delay],
  )

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel()
    }
  }, [debouncedUpdate])

  const handleSearch = (value: string) => {
    setSearch(value)
    debouncedUpdate(value)
  }

  return { search, debouncedSearch, handleSearch, setSearch }
}
