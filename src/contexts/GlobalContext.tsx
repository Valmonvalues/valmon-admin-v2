import { createContext, useContext, useState, type ReactNode } from 'react'

interface GlobalContextType {
  // Form Modal State
  openFormModal: boolean
  setOpenFormModal: (open: boolean) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [openFormModal, setOpenFormModal] = useState(false)

  const value: GlobalContextType = {
    openFormModal,
    setOpenFormModal,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }
  return context
}
