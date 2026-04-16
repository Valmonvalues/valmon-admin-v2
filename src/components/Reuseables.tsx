import { appDateInputBaseProps, appInputBaseProps } from '@/constant/styles'
import {
  NumberInput,
  type NumberInputProps,
  PasswordInput,
  type PasswordInputProps,
  Select,
  type SelectProps,
  Textarea,
  type TextareaProps,
  TextInput,
  type TextInputProps,
} from '@mantine/core'
import { DatePickerInput, type DatePickerInputProps } from '@mantine/dates'

export const AppInput = (props: TextInputProps) => (
  <TextInput {...appInputBaseProps} {...props} />
)

export const AppPasswordInput = (props: PasswordInputProps) => (
  <PasswordInput {...appInputBaseProps} {...props} />
)

export const AppNumberInput = (props: NumberInputProps) => (
  <NumberInput {...appInputBaseProps} {...props} />
)

export const AppSelect = (props: SelectProps) => (
  <Select {...appInputBaseProps} {...props} />
)

export const AppTextarea = (props: TextareaProps) => (
  <Textarea {...appInputBaseProps} {...props} />
)

export const AppDatePickerInput = (props: DatePickerInputProps) => (
  <DatePickerInput {...appDateInputBaseProps} {...props} />
)
