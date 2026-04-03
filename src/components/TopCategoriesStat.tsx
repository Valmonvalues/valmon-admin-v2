type TopCategory = {
  name: string
  total: number
}

type Props = {
  categories: TopCategory[]
  max?: number
}

const TopCategoriesStat = ({ categories, max = 3 }: Props) => {
  if (!categories || categories.length === 0) {
    return <span className="text-sm text-gray-400">No data</span>
  }

  return (
    <div className="gap-x-4 gap-y-2 text-sm">
      {categories.slice(0, max).map((cat, index) => (
        <div
          key={index}
          className="flex w-full items-center gap-1 text-gray-700"
        >
          <span className="font-medium text-yellow-600">{index + 1}.</span>
          <span className="line-clamp-1">{cat.name}</span>
        </div>
      ))}
    </div>
  )
}

export default TopCategoriesStat
