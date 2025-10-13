import React, { createContext, useCallback, useContext, useState } from 'react'
import ConfirmModal from '@/components/modals/ConfirmModal'

type ConfirmOptions = {
  title: string
  message: string
  loading?: boolean
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: 'red' | 'green' | 'blue' | 'gray'
  icon?: 'alert' | 'info' | 'success' | 'delete'
}

type ConfirmModalContextType = {
  showConfirmModal: (options: ConfirmOptions) => Promise<'confirm' | 'cancel'>
}

const ConfirmModalContext = createContext<ConfirmModalContextType | null>(null)

export const ConfirmModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ConfirmOptions | null>(null)
  const [resolver, setResolver] = useState<
    ((value: 'confirm' | 'cancel') => void) | null
  >(null)

  const showConfirmModal = useCallback((options: ConfirmOptions) => {
    return new Promise<'confirm' | 'cancel'>((resolve) => {
      setModalState(options)
      setResolver(() => resolve)
    })
  }, [])

  const handleCancel = useCallback(() => {
    resolver?.('cancel')
    setModalState(null)
  }, [resolver])

  const handleConfirm = useCallback(() => {
    resolver?.('confirm')
    setModalState(null)
  }, [resolver])

  return (
    <ConfirmModalContext.Provider value={{ showConfirmModal }}>
      {children}
      <ConfirmModal
        opened={!!modalState}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        title={modalState?.title || ''}
        message={modalState?.message || ''}
        loading={modalState?.loading}
        confirmLabel={modalState?.confirmLabel}
        cancelLabel={modalState?.cancelLabel}
        confirmColor={modalState?.confirmColor}
        icon={modalState?.icon}
      />
    </ConfirmModalContext.Provider>
  )
}

export const useConfirmModal = () => {
  const ctx = useContext(ConfirmModalContext)
  if (!ctx)
    throw new Error('useConfirmModal must be used inside ConfirmModalProvider')
  return ctx
}
