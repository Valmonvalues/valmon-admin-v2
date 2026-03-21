type ServiceRowProps = {
  service: any // or ServiceDetails if you have the type
  title: string
  pricing_type: string
  price: string
  onAction?: () => void
}

function ServiceRow({
  service,
  title,
  pricing_type,
  price,
  //   actionLabel = 'Hire',
  onAction,
}: ServiceRowProps) {
  return (
    <div className="grid grid-cols-6 items-center text-gray-700 border p-2 rounded-md border-gray-200">
      <div className="col-span-1 text-sm capitalize">{service.name}</div>
      <div className="col-span-2 font-medium text-sm capitalize">
        Title: {title || 'N/A'}
      </div>
      <div className="col-span-1 text-sm capitalize">
        Pricing Type: <span>{pricing_type || 'Per Hour'}</span>
      </div>
      <div className="col-span-1 text-sm">
        Price: <span className="font-semibold">NGN {price || '0'}</span>
      </div>
      <div className="col-span-1 text-right">
        <button
          onClick={onAction}
          className="px-3 py-1 text-xs font-semibold text-yellow-800"
        >
          Hire
        </button>
      </div>
    </div>
  )
}

export default ServiceRow
