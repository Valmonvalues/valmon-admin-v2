import AddModal, { type Field } from './modals/AddModal'

interface BaseButtonProps {
  title: string
  loading?: boolean
  color?: string
  textColor?: string
  outline?: boolean
  onClick?: () => void
  className?: string
  src?: string
  alt?: string
  showPlusIcon?: boolean
  fields?: Field[]

  // showModal?: boolean
  modalTitle?: string
  // modalFields?: Field[]
  onSubmit?: (data: Record<string, any>) => void
  onClose?: () => void
  opened?: boolean
}

export default function BaseButton({
  title,
  loading = false,
  color,
  textColor,
  outline = false,
  fields = [],
  onClick,
  className = '',
  showPlusIcon = false,
  // showModal = false,
  modalTitle = '',
  // modalFields = [],
  onSubmit,
  onClose,
  opened = false,
}: BaseButtonProps) {
  // const [opened, setOpened] = useState(false)

  const baseClass = `
    btn flex items-center justify-center gap-2 px-4 py-3 rounded-md font-semibold text-base satoshiB transition w-full
  `
  const variantClass = outline ? 'btn_outline' : 'bg_btn'

  const style: React.CSSProperties = {
    backgroundColor: outline ? 'transparent' : color,
    color: textColor || (outline ? color : '#fff'),
    border: outline && color ? `1.5px solid ${color}` : undefined,
  }

  // const handleButtonClick = () => {
  //   setOpened(!opened)
  // }

  return (
    <>
      <button
        onClick={onClick}
        // leftSection={icon ? "<Plus size={16} />" : null}
        style={style}
        className={`${baseClass} ${className} ${variantClass}`}
      >
        {title}
        {showPlusIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
      </button>

      {fields.length > 0 && (
        <AddModal
          opened={opened}
          loading={loading}
          onClose={onClose ?? (() => {})}
          title={modalTitle || title}
          fields={fields}
          onSubmit={onSubmit ?? (() => {})}
        />
      )}
    </>
  )
}
