import { createContext, useContext, useState, type ReactNode } from 'react'

interface GlobalContextType {
  initialData: any
  setInitialData: (data: any) => void
  openFormModal: boolean
  setOpenFormModal: (open: boolean) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [openFormModal, setOpenFormModal] = useState(false)
  const [initialData, setInitialData] = useState(null)

  const value: GlobalContextType = {
    openFormModal,
    setOpenFormModal,
    initialData,
    setInitialData,
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
