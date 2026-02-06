export const formatNumber = (
  value: number | string | undefined | null,
): string => {
  if (value === undefined || value === null) return '0'

  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) return '0'

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(num)
}

// export const formatCurrency = (
//   value: number | string | undefined | null,
//   currency: string = 'NGN',
// ): string => {
//   if (value === undefined || value === null) return `${currency} 0`

//   const num = typeof value === 'string' ? parseFloat(value) : value

//   if (isNaN(num)) return `${currency} 0`

//   return `${currency} ${new Intl.NumberFormat('en-US', {
//     maximumFractionDigits: 0,
//     minimumFractionDigits: 0,
//   }).format(num)}`
// }
