import { useEffect, useState } from 'react'
import { useSettings } from '@/services/settings.service'
import { Box, Center, Group, Loader, Slider, Text, Button } from '@mantine/core'

function PlatformRate() {
  const { getPlatformRate, setPlatformRate } = useSettings()
  const { data, isLoading } = getPlatformRate()
  const { mutate, isPending } = setPlatformRate

  const [skillRange, setSkillRange] = useState<number>(0)
  const [salesRange, setSalesRange] = useState<number>(0)

  const marks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ]

  const handleSave = () => {
    mutate({
      charge_percentage: skillRange,
      sale_percentage: salesRange,
    })
  }

  useEffect(() => {
    if (data) {
      setSkillRange(data.charge_percentage || 0)
      setSalesRange(data.sale_percentage || 0)
    }
  }, [data])

  return (
    <Box
      className="w-full"
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      }}
    >
      {isLoading ? (
        <Center style={{ height: 200 }}>
          <Loader color="gold" size="lg" />
        </Center>
      ) : (
        <div className="p-6 sm:p-10">
          <div className="pb-5">
            <Group justify="space-between">
              <Text fw={700}>Skill Charge Percentage</Text>
              <Text fw={700} c="var(--color-dark-gold)">
                {skillRange}%
              </Text>
            </Group>
            <Slider
              color="var(--color-bright-gold)"
              value={skillRange}
              onChange={setSkillRange}
              step={0.1}
              marks={marks}
              disabled={isPending}
            />
          </div>
          <div className="py-6 sm:py-10">
            <Group justify="space-between">
              <Text fw={700}>Listing Sale Percentage</Text>
              <Text fw={700} c="var(--color-dark-gold)">
                {salesRange}%
              </Text>
            </Group>
            <Slider
              color="var(--color-bright-gold)"
              value={salesRange}
              onChange={setSalesRange}
              step={25}
              marks={marks}
              disabled={isPending}
            />
          </div>
          <Button
            fullWidth
            color="dark"
            mt={30}
            loading={isPending}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      )}
    </Box>
  )
}

export default PlatformRate
