import { dummyServices } from '../Navigation/data/dummyData'

function ServicesSection() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Services</h2>
        <p className="text-sm font-bold text-yellow-800 hover:text-gray-800 transition-colors">
          View All
        </p>
      </div>

      <div className="space-y-4">
        {dummyServices.map((service) => (
          <div
            key={service.id}
            className="grid grid-cols-6 items-center text-gray-700 border p-2 rounded-md border-gray-200"
          >
            {/* Tailwind's grid system for alignment */}
            <div className="col-span-1 text-sm">{service.type}</div>
            <div className="col-span-2 font-medium text-sm">
              Title: {service.title}
            </div>
            <div className="col-span-1 text-sm">
              Pricing Type: <span>{service.pricingType}</span>
            </div>
            <div className="col-span-1 text-sm">
              Price: <span className="font-semibold">NGN {service.price}</span>
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
