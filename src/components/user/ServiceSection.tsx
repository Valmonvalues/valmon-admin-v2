import type { Gig } from '@/types/user.types'

function ServicesSection({ gigs }: { gigs: Gig[] | undefined }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Services</h2>
        <p className="text-sm font-bold text-yellow-800 hover:text-gray-800 transition-colors">
          View All
        </p>
      </div>

      <div className="space-y-4">
        {gigs?.map((gig) => (
          <div
            key={gig.service_id}
            className="grid grid-cols-6 items-center text-gray-700 border p-2 rounded-md border-gray-200"
          >
            <div className="col-span-1 text-sm capitalize">
              {gig.service.name}
            </div>
            <div className="col-span-2 font-medium text-sm capitalize">
              Title: {gig.title || 'N/A'}
            </div>
            <div className="col-span-1 text-sm capitalize">
              Pricing Type: <span>{gig.pricing_type || 'Per Hour'}</span>
            </div>
            <div className="col-span-1 text-sm">
              Price:{' '}
              <span className="font-semibold">NGN {gig.price || '0'}</span>
            </div>
            <div className="col-span-1 text-right">
              <button className="px-3 py-1 text-xs font-semibold text-yellow-800">
                Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesSection
