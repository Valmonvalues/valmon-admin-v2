import { Card } from '@mantine/core'
import { type StatCardProps } from '@/types/user.types'
import { Image } from '@mantine/core'

import profile from '@/assets/icons/cardprofile.svg'

const StatCard = ({ title, value, color }: StatCardProps) => {
  return (
    <Card shadow="sm" radius="lg" className="px-6 py-5 bg-white">
      <div className="flex flex-col justify-between gap-2">
        <h3 className="text-[16px] font-medium text-gray-500">{title}</h3>

        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-900">{value}</p>
          <div
            className={`flex h-12 w-12 justify-center items-center rounded-xl ${color}`}
          >
            {/* <img src={profile} alt="" /> */}
            {/* h={20} w="auto"  */}
            <Image radius="md" h={30} w="auto" src={profile} />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default StatCard
