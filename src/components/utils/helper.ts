export const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-GB')
}

export function capitalizeKey<T extends Record<string, any>, K extends keyof T>(
  data: T[],
  key: K,
): T[] {
  return data.map((item) => {
    const value = item[key]

    if (typeof value !== 'string' || value.length === 0) return item

    const capitalized = value.charAt(0).toUpperCase() + value.slice(1)

    return {
      ...item,
      [key]: capitalized,
    }
  })
}
