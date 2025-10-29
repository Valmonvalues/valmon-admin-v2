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
  //   bg?: string
  onClick?: () => void
}

export const BackButton: React.FC<BackButtonProps> = ({
  //   label = '',
  color = 'gray',
  variant = 'light',
  //   withIcon = true,
  size = 'md',
  iconSize = 18,
  //   bg,
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
