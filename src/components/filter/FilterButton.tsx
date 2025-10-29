import { Button, Divider, Menu, Select, TextInput } from '@mantine/core'
import { IconFilter2 } from '@tabler/icons-react'
import { useState } from 'react'

interface FilterButtonProps {
  onApplyFilters?: (filters: Record<string, any>) => void
}

// interface FilterButtonProps {
//   filters?: {
//     label: string
//     name: string
//     options: { label: string; value: string }[]
//   }[]
//   onApplyFilters?: (filters: Record<string, any>) => void
// }

export default function FilterButton({ onApplyFilters }: FilterButtonProps) {
  // export default function FilterButton({
  //   filters = [],
  //   onApplyFilters,
  // }: FilterButtonProps) {
  const [filters, setFilters] = useState<Record<string, any>>({})

  const handleApply = () => {
    onApplyFilters?.(filters)
  }

  //   const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>(
  //     {},
  //   )

  //   const handleChange = (name: string, value: string | null) => {
  //     setSelectedFilters((prev) => ({ ...prev, [name]: value }))
  //   }

  //   const handleApply = () => {
  //     onApplyFilters?.(selectedFilters)
  //   }

  //   const handleReset = () => {
  //     setSelectedFilters({})
  //     onApplyFilters?.({})
  //   }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="outline"
          color="gray"
          radius="sm"
          leftSection={<IconFilter2 size={16} stroke={2} />}
          //   className="border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Filters
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <div className="flex flex-col gap-3 p-2">
          <TextInput
            label="Employer"
            placeholder="Enter employer"
            value={filters.employer}
            // onChange={(e) => handleChange('employer', e.currentTarget.value)}
          />
          <TextInput
            label="Category"
            placeholder="Enter category"
            value={filters.category}
            // onChange={(e) => handleChange('category', e.currentTarget.value)}
          />
          <Select
            label="Status"
            placeholder="Select status"
            data={[
              { value: 'completed', label: 'Completed' },
              { value: 'pending', label: 'Pending' },
              { value: 'cancelled', label: 'Cancelled' },
            ]}
            value={filters.status}
            // onChange={(value) => handleChange('status', value || '')}
          />
          <Button onClick={handleApply} fullWidth color="dark">
            Apply Filters
          </Button>
        </div>
      </Menu.Dropdown>
      {/* 
      <Menu.Dropdown>
        {filters.map((filter) => (
          <div key={filter.name} className="px-3 py-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {filter.label}
            </label>
            <Select
              placeholder={`Select ${filter.label}`}
              data={filter.options}
              value={selectedFilters[filter.name] || ''}
              onChange={(value) => handleChange(filter.name, value)}
              radius="md"
              withinPortal
            />
          </div>
        ))}

        <Divider className="my-2" />

        <div className="flex justify-between px-3 pb-2">
          <Button size="xs" variant="subtle" color="gray" onClick={handleReset}>
            Reset
          </Button>
          <Button size="xs" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </Menu.Dropdown> */}
    </Menu>
  )
}
