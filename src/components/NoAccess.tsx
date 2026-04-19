import React from 'react'

interface NoAccessProps {
  message?: string
}

const NoAccess: React.FC<NoAccessProps> = ({
  message = 'No Access, Contact Support',
}) => {
  return (
    <div className="flex w-full h-64 justify-center items-center text-lg text-red-600">
      {message}
    </div>
  )
}

export default NoAccess
