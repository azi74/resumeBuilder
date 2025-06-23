import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from './Button'
import Input from './FormElements/Input';
import Textarea from './FormElements/Textarea';

const EducationForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations'
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Education</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => append({
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
          })}
        >
          Add Education
        </Button>
      </div>
      
      {fields.length === 0 ? (
        <p className="text-gray-500">No education information added yet.</p>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Education #{index + 1}</h4>
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
                name={`educations.${index}.institution`} 
                label="Institution" 
                control={control} 
                required 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input 
                  name={`educations.${index}.degree`} 
                  label="Degree" 
                  control={control} 
                  required 
                />
                <Input 
                  name={`educations.${index}.fieldOfStudy`} 
                  label="Field of Study" 
                  control={control} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input 
                  name={`educations.${index}.startDate`} 
                  label="Start Date" 
                  control={control} 
                  type="date" 
                  required 
                />
                <Input 
                  name={`educations.${index}.endDate`} 
                  label="End Date" 
                  control={control} 
                  type="date" 
                  disabled={watch(`educations.${index}.current`)}
                />
              </div>
              
              <div className="mt-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    {...register(`educations.${index}.current`)}
                    className="rounded text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-sm text-gray-700">I currently study here</span>
                </label>
              </div>
              
              <Textarea 
                name={`educations.${index}.description`} 
                label="Description" 
                control={control} 
                rows={3} 
                className="mt-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm