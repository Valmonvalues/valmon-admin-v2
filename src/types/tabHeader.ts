export interface TabHeaderProps {
  activeTab: string
  onChange: (tab: string) => void
  tabs: {
    id: string
    label: string
  }[]
}
