import ServiceRow from './ServiceRow'
import type { Gig } from '@/types/user.types'
import EmptyState from './EmptyState'

function Services({ services }: { services?: Gig[] }) {
  if (!services || services.length === 0)
    return <EmptyState message="No Service found" />

  return (
    <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
      <div className="space-y-4">
        {services.map((service) => (
          <ServiceRow
            key={service.service_id}
            service={service.service}
            title={service.title}
            pricing_type={service.pricing_type}
            price={service.price}
            onAction={() => console.log(service)}
          />
        ))}
      </div>
    </div>
  )
}

export default Services
