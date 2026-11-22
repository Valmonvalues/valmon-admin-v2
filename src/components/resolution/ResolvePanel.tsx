import { useState } from 'react'
import { Button, Text, Textarea } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { useResolution } from '@/services/resolution.service'
import type {
  ResolutionAction,
  TicketDetail,
  TicketParticipant,
} from '@/types/resolution.types'
import { formatDate } from '@/utils/helper'
import { formatNumber } from '@/utils/formatters'

type Props = {
  ticket: TicketDetail
  canManage: boolean
}

const MIN_DECISION_LENGTH = 10

const fullName = (p?: TicketParticipant) =>
  p ? `${p.first_name} ${p.last_name}`.trim() : undefined

export default function ResolvePanel({ ticket, canManage }: Props) {
  const isMarketplace = !!ticket.order
  const transaction = ticket.job ?? ticket.order
  const amount = transaction?.amount
    ? `NGN ${formatNumber(transaction.amount)}`
    : null

  // For services the worker is the provider. Marketplace tickets don't say
  // which party is the seller, so those use role names only.
  const parties = [ticket.user, ticket.reported_user]
  const providerName = isMarketplace
    ? undefined
    : fullName(parties.find((p) => p.account_type === 'worker'))
  const clientName = isMarketplace
    ? undefined
    : fullName(parties.find((p) => p.account_type === 'employer'))

  const providerLabel = isMarketplace ? 'Seller' : 'Service Provider'
  const clientLabel = isMarketplace ? 'Buyer' : 'Employer'

  const { resolveTicket } = useResolution()
  const { mutate, isPending } = resolveTicket(ticket.id, isMarketplace)

  const [decision, setDecision] = useState('')
  const [decisionError, setDecisionError] = useState<string | null>(null)
  const [pendingAction, setPendingAction] = useState<ResolutionAction | null>(
    null,
  )

  if (ticket.status === 'resolved') {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-green-700">
          <IconCircleCheck size={20} />
          <Text fw={600}>Resolved</Text>
        </div>
        {ticket.resolved_at && (
          <Text size="xs" c="dimmed" mb="sm">
            {formatDate(ticket.resolved_at)}
          </Text>
        )}
        <Text size="sm" fw={600} mb={4}>
          Decision
        </Text>
        <Text size="sm" c="dimmed" className="whitespace-pre-line">
          {ticket.resolution_decision || 'No written decision was recorded.'}
        </Text>
        {amount && (
          <Text size="xs" c="dimmed" mt="md">
            Amount in dispute: {amount}
          </Text>
        )}
      </div>
    )
  }

  const askToConfirm = (action: ResolutionAction) => {
    if (decision.trim().length < MIN_DECISION_LENGTH) {
      setDecisionError(
        'Write the decision first — both parties will receive it.',
      )
      return
    }
    setDecisionError(null)
    setPendingAction(action)
  }

  const confirmCopy: Record<
    ResolutionAction,
    { title: string; message: string; label: string; color: 'green' | 'red' | 'blue' }
  > = {
    pay: {
      title: `Pay ${providerLabel.toLowerCase()}?`,
      message: `${amount ?? 'The escrowed amount'} will be released to ${
        providerName ?? `the ${providerLabel.toLowerCase()}`
      }. The dispute will be marked resolved and both parties notified. This can't be undone.`,
      label: `Pay ${providerLabel}`,
      color: 'green',
    },
    refund: {
      title: `Refund ${clientLabel.toLowerCase()}?`,
      message: `${amount ?? 'The escrowed amount'} will be refunded to ${
        clientName ?? `the ${clientLabel.toLowerCase()}`
      }. The dispute will be marked resolved and both parties notified. This can't be undone.`,
      label: `Refund ${clientLabel}`,
      color: 'red',
    },
    close: {
      title: 'Resolve without moving money?',
      message:
        'The dispute will be marked resolved with your written decision and both parties notified. No money is released or refunded by this action. This can’t be undone.',
      label: 'Resolve',
      color: 'blue',
    },
  }

  const copy = pendingAction ? confirmCopy[pendingAction] : null

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <Text fw={600} mb="xs">
        {isMarketplace ? 'Listing Cost' : 'Service Cost'}
      </Text>
      <Text
        size="xl"
        fw={700}
        className="rounded-md bg-gray-100 px-3 py-2 text-gray-800"
      >
        {amount ?? '—'}
      </Text>

      {!canManage ? (
        <Text size="xs" c="dimmed" mt="md">
          You have view-only access to conflict resolution.
        </Text>
      ) : (
        <>
          <Textarea
            mt="md"
            label="Decision"
            description="Sent to both parties when you resolve."
            placeholder="e.g. The work was delivered as agreed, so payment is released to the worker."
            autosize
            minRows={3}
            maxRows={8}
            value={decision}
            onChange={(e) => {
              setDecision(e.currentTarget.value)
              if (decisionError) setDecisionError(null)
            }}
            error={decisionError}
          />

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => askToConfirm('pay')}
              disabled={isPending}
              className="btn rounded-2xl border-none bg-layout text-white hover:opacity-90"
            >
              Pay {providerLabel}
            </button>
            <button
              type="button"
              onClick={() => askToConfirm('refund')}
              disabled={isPending}
              className="btn btn-outline rounded-2xl border-2 border-gray-800 text-gray-800"
            >
              Refund {clientLabel}
            </button>
            <Button
              variant="subtle"
              color="gray"
              onClick={() => askToConfirm('close')}
              disabled={isPending}
            >
              Resolve without moving money
            </Button>
          </div>
        </>
      )}

      {copy && (
        <ConfirmModal
          opened={!!pendingAction}
          title={copy.title}
          message={copy.message}
          confirmLabel={copy.label}
          confirmColor={copy.color}
          loading={isPending}
          onCancel={() => setPendingAction(null)}
          onConfirm={() =>
            pendingAction &&
            mutate(
              { action: pendingAction, decision: decision.trim() },
              { onSettled: () => setPendingAction(null) },
            )
          }
        />
      )}
    </div>
  )
}
