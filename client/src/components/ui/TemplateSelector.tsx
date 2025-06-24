import { useFormContext } from 'react-hook-form'
import { TEMPLATES } from '@/constants/resumeTemplates'

const TemplateSelector = () => {
  const { watch, setValue } = useFormContext()
  const selectedTemplate = watch('template')

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TEMPLATES.map(template => (
          <div
            key={template.id}
            onClick={() => setValue('template', template.id)}
            className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-violet-500 bg-violet-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="aspect-[1/1.414] bg-gray-100 mb-2 flex items-center justify-center">
              <img 
                src={template.thumbnail} 
                alt={template.name} 
                className="object-cover h-full w-full"
              />
            </div>
            <div className="text-center">
              <p className="font-medium">{template.name}</p>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector