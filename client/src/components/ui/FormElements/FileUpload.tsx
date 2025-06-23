import { UseControllerProps, useController } from 'react-hook-form'
import { FiUpload } from 'react-icons/fi'

interface FileUploadProps extends UseControllerProps {
  label: string
  className?: string
}

const FileUpload = ({
  label,
  className = '',
  ...props
}: FileUploadProps) => {
  const { field } = useController(props)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        field.onChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={className}>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {field.value ? (
            <div className="flex flex-col items-center">
              <img 
                src={field.value} 
                alt="Preview" 
                className="h-20 w-20 object-cover rounded-full mb-2"
              />
              <button
                type="button"
                onClick={() => field.onChange(null)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              </div>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor={field.name}
                  className="relative cursor-pointer bg-white rounded-md font-medium text-violet-600 hover:text-violet-500 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG up to 2MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUpload