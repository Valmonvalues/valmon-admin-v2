import React from 'react'

interface BaseButtonProps {
  loading?: boolean
  title: string
  color?: string
  textColor?: string
  outline?: boolean
  onClick?: () => void
  className?: string
  src?: string
  alt?: string
}

const BaseButton: React.FC<BaseButtonProps> = ({
  loading = false,
  title,
  color,
  textColor,
  outline = false,
  onClick,
  className = '',
  src,
  alt,
}) => {
  // Compose inline styles
  const style: React.CSSProperties = {
    backgroundColor: outline ? 'transparent' : color,
    color: textColor || (outline ? color : '#fff'),
    border: outline && color ? `1.5px solid ${color}` : undefined,
  }

  const baseClasses = `
    flex items-center justify-center gap-2 px-4 py-3 rounded-md font-semibold text-base transition w-full
  `

  return (
    <button
      disabled={loading}
      onClick={onClick}
      style={style}
      className={`${baseClasses} ${className}`}
    >
      {src && <img src={src} alt={alt} className="w-5 h-5" />}
      {loading ? 'Loading...' : title}
    </button>
  )
}

export default BaseButton
