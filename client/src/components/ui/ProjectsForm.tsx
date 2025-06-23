import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from './Button'
import Input from './FormElements/Input';
import Textarea from './FormElements/Textarea';

const ProjectsForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects'
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => append({
            name: '',
            description: '',
            url: '',
            technologies: []
          })}
        >
          Add Project
        </Button>
      </div>
      
      {fields.length === 0 ? (
        <p className="text-gray-500">No projects added yet.</p>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Project #{index + 1}</h4>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
              
              <Input 
                name={`projects.${index}.name`} 
                label="Project Name" 
                control={control} 
                required 
              />
              
              <Input 
                name={`projects.${index}.url`} 
                label="Project URL" 
                control={control} 
                type="url" 
                className="mt-2"
              />
              
              <Textarea 
                name={`projects.${index}.description`} 
                label="Description" 
                control={control} 
                rows={3} 
                className="mt-2"
                required 
              />
              
              <Input 
                name={`projects.${index}.technologies`} 
                label="Technologies (comma separated)" 
                control={control} 
                className="mt-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsForm