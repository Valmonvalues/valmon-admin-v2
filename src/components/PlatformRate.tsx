import { useEffect, useState } from 'react'
import { useSettings } from '@/services/settings.service'
import { useAccessManagement } from '@/hook/useAccessManagement'
import {
  Box,
  Center,
  Group,
  Loader,
  Slider,
  Text,
  Button,
  NumberInput,
} from '@mantine/core'

function PlatformRate() {
  const { getPlatformRate, setPlatformRate } = useSettings()
  const { data, isLoading } = getPlatformRate()
  const { mutate, isPending } = setPlatformRate
  const { canAccess } = useAccessManagement()
  const canManage = canAccess('manage_platform_rates')

  const [skillRange, setSkillRange] = useState<number>(0)
  const [salesRange, setSalesRange] = useState<number>(0)

  const marks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ]

  const clampValue = (value: number) => {
    if (Number.isNaN(value)) return 0
    return Math.min(100, Math.max(0, value))
  }

  const handleSave = () => {
    if (!canManage) return

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
              {/* <Text fw={700} c="var(--color-dark-gold)">
                {skillRange}%
              </Text> */}

              <NumberInput
                value={skillRange}
                onChange={(value) => {
                  if (!canManage) return
                  const numericValue =
                    typeof value === 'number' ? value : Number(value)
                  setSkillRange(clampValue(numericValue))
                }}
                min={0}
                max={100}
                step={0.1}
                decimalScale={1}
                suffix="%"
                hideControls
                clampBehavior="strict"
                disabled={isPending}
                variant="unstyled"
                styles={{
                  input: {
                    textAlign: 'right',
                    fontWeight: 700,
                    color: 'var(--color-dark-gold)',
                    width: `${String(skillRange).length + 4}ch`,
                  },
                }}
              />
            </Group>
            <Slider
              color="var(--color-dark-gold)"
              value={skillRange}
              // onChange={setSkillRange}
              onChange={(val) => {
                if (!canManage) return
                setSkillRange(val)
              }}
              step={0.1}
              min={0}
              max={100}
              marks={marks}
              disabled={isPending}
            />
          </div>
          <div className="py-6 sm:py-10">
            <Group justify="space-between">
              <Text fw={700}>Listing Sale Percentage</Text>

              <NumberInput
                value={salesRange}
                onChange={(value) => {
                  if (!canManage) return

                  const numericValue =
                    typeof value === 'number' ? value : Number(value)
                  setSalesRange(clampValue(numericValue))
                }}
                min={0}
                max={100}
                step={25}
                suffix="%"
                hideControls
                clampBehavior="strict"
                disabled={isPending}
                variant="unstyled"
                styles={{
                  input: {
                    textAlign: 'right',
                    fontWeight: 700,
                    color: 'var(--color-dark-gold)',
                    width: `${String(skillRange).length + 4}ch`,
                  },
                }}
              />
            </Group>
            <Slider
              color="var(--color-dark-gold)"
              value={salesRange}
              // onChange={setSalesRange}
              onChange={(val) => {
                if (!canManage) return
                setSalesRange(val)
              }}
              step={25}
              min={0}
              max={100}
              marks={marks}
              disabled={isPending}
            />
          </div>

          {!canManage && (
            <Text size="xs" c="dimmed" mt={10}>
              You have view-only access to platform rates.
            </Text>
          )}

          <Button
            fullWidth
            color="dark"
            mt={30}
            loading={isPending}
            disabled={!canManage}
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
