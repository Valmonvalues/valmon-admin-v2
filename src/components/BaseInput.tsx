import React, { type ChangeEvent, useState } from 'react'

interface Option {
  dial_code: string
  name: string
}

interface BaseInputProps {
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  icon?: boolean
  iconType?: string
  validation?: boolean
  data?: Option[]
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onPasswordVisible?: (visibility: boolean, id?: string) => void
  instanceId?: string
  className?: string
}

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  type = 'text',
  placeholder,
  required = false,
  icon = false,
  iconType,
  validation = false,
  data = [],
  value,
  onChange,
  onPasswordVisible,
  instanceId,
  className,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const toggleVisibility = () => {
    if (iconType === 'password') {
      const newVisibility = !passwordVisible
      setPasswordVisible(newVisibility)
      if (onPasswordVisible) {
        onPasswordVisible(newVisibility, instanceId)
      }
    }
  }

  if (type === 'select') {
    return (
      <div className={className}>
        <label className="block text-base text-labels font-medium mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="select select-bordered block w-full py-2.5 text-[rgba(16,16,17,1)] placeholder-gray-400/70 bg-white border border-[rgba(0,0,0,0.16)] rounded-lg pl-5 pr-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        >
          {data.map((option, idx) => (
            <option key={idx} value={option.dial_code}>
              {`${option.name} ${option.dial_code}`}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // else render input
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <label className="block text-base text-labels font-medium">
          {label}
        </label>
      </div>
      <div className="relative flex items-center mt-2 mb-1">
        <input
          type={
            iconType === 'password'
              ? passwordVisible
                ? 'text'
                : 'password'
              : type
          }
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full py-2.5 text-[rgba(16,16,17,1)] placeholder-gray-400/70 bg-white border border-[rgba(0,0,0,0.4)] rounded-lg pl-5 pr-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {icon && iconType === 'password' && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-0 focus:outline-none mx-4"
          >
            {!passwordVisible ? (
              // eye closed icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400 transition-colors duration-300 hover:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              // eye open icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400 transition-colors duration-300 hover:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {validation && (
        <p className="text-red-500 font-base">
          Not a valid {label} {type === 'email' ? 'address' : ''}
        </p>
      )}
    </div>
  )
}

export default BaseInput
