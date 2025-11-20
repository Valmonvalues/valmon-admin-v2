import { Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

interface BackButtonProps {
  label?: string
  color: string
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'transparent'
  withIcon?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconSize?: number
  className?: string
  onClick?: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({
  color = 'gray',
  variant = 'light',
  size = 'md',
  iconSize = 18,
  onClick,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    else navigate({ to: '..' })
  }

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={handleClick}
      radius="50%"
      p={0}
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <IconArrowLeft size={iconSize} />
    </Button>
  )
}
