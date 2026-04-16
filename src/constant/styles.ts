import { type MantineStyleProp } from '@mantine/core'

export const appInputBaseProps = {
  size: 'md',
  radius: '8px',
  styles: {
    label: {
      color: '#1E293B',
      fontSize: '16px',
      marginBottom: '6px',
    },
    input: {
      borderColor: '#E2E2E2',
      '&:focus': {
        borderColor: 'var(--color-primary)',
      },
    },
  } satisfies MantineStyleProp,
}

export const appDateInputBaseProps = {
  // size: "md",
  radius: '8px',
  styles: {
    label: {
      color: '#1E293B',
      fontSize: '16px',
      marginBottom: '6px',
    },
    input: {
      borderColor: '#E2E2E2',
      '&:focus': {
        borderColor: 'var(--color-primary)',
      },
    },
  } satisfies MantineStyleProp,
}
