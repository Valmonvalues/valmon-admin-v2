import { Badge } from '@mantine/core'

// On a ticket, `user` is always the one who raised it and `reported_user`
// the one it was raised against.
export default function PartyRoleBadge({
  isComplainer,
}: {
  isComplainer: boolean
}) {
  return (
    <Badge
      size="xs"
      variant="light"
      color={isComplainer ? 'red' : 'gray'}
      title={
        isComplainer
          ? 'Raised this dispute'
          : 'The dispute was raised against this user'
      }
    >
      {isComplainer ? 'Complainant' : 'Reported'}
    </Badge>
  )
}
