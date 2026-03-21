import type { Listing } from '@/types/user.types'
import ProductCard from './ProductCard'
import EmptyState from './EmptyState'

function Listings({ listings }: { listings?: Listing[] }) {
  if (!listings || listings.length === 0)
    return <EmptyState message="No Listing found" />

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {listings.map((product) => (
        <ProductCard
          key={product.id}
          images={product.images}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  )
}

export default Listings
