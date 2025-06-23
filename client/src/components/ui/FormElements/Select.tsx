import { FieldError, UseControllerProps, useController } from 'react-hook-form'

interface Option {
  value: string
  label: string
}

interface SelectProps extends UseControllerProps {
  label: string
  options: Option[]
  error?: FieldError
  className?: string
}

const Select = ({
  label,
  options,
  error,
  className = '',
  ...props
}: SelectProps) => {
  const { field } = useController(props)

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        {...field}
        id={field.name}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm ${
          error ? 'border-red-500' : 'border'
        }`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default Select