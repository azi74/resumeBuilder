import { FieldError, UseControllerProps, useController } from 'react-hook-form'

interface TextareaProps extends UseControllerProps {
  label: string
  rows?: number
  error?: FieldError
  className?: string
}

const Textarea = ({
  label,
  rows = 3,
  error,
  className = '',
  ...props
}: TextareaProps) => {
  const { field } = useController(props)

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        {...field}
        id={field.name}
        rows={rows}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm ${
          error ? 'border-red-500' : 'border'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default Textarea