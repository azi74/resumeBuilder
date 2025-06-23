import { FieldError, UseControllerProps, useController } from 'react-hook-form'

interface InputProps extends UseControllerProps {
  label: string
  type?: string
  error?: FieldError
  className?: string
  disabled?: boolean
}

const Input = ({
  label,
  type = 'text',
  error,
  className = '',
  disabled = false,
  ...props
}: InputProps) => {
  const { field } = useController(props)

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...field}
        id={field.name}
        type={type}
        disabled={disabled}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm ${
          error ? 'border-red-500' : 'border'
        } ${disabled ? 'bg-gray-100' : ''}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default Input