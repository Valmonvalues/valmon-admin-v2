import type { TabHeaderProps } from '@/types/tabHeader'

const TabHeader = ({ activeTab, onChange }: TabHeaderProps) => {
  const tabs = [
    { id: 'skill transactions', label: 'Skill Transactions' },
    { id: 'skill parent', label: 'Skill Parent Category' },
  ]

  return (
    <div className="flex w-fit rounded-xl bg-white p-4 shadow-sm mb-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative mx-4 text-[15px] font-semibold transition-colors duration-200 ${
              isActive
                ? 'text-[#8C6B1F]' // gold text for active tab
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute left-0 right-0 -bottom-1 mx-auto h-[3px] w-full bg-[#8C6B1F] rounded-full"></span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default TabHeader
