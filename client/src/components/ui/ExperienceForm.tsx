import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from './Button'
import Input from './FormElements/Input';
import Textarea from './FormElements/Textarea';

const ExperienceForm = () => {
  const { control, register, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences'
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => append({
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
          })}
        >
          Add Experience
        </Button>
      </div>
      
      {fields.length === 0 ? (
        <p className="text-gray-500">No work experience added yet.</p>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Experience #{index + 1}</h4>
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
                name={`experiences.${index}.jobTitle`} 
                label="Job Title" 
                control={control} 
                rules={{ required: 'Job Title is required' }}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input 
                  name={`experiences.${index}.company`} 
                  label="Company" 
                  control={control} 
                  rules={{ required: 'Name of Company is required' }}
                />
                <Input 
                  name={`experiences.${index}.location`} 
                  label="Location" 
                  control={control} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input 
                  name={`experiences.${index}.startDate`} 
                  label="Start Date" 
                  control={control} 
                  type="date" 
                  rules={{ required: 'Required' }}
                />
                <Input 
                  name={`experiences.${index}.endDate`} 
                  label="End Date" 
                  control={control} 
                  type="date" 
                  disabled={watch(`experiences.${index}.current`)}
                />
              </div>
              
              <div className="mt-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    {...register(`experiences.${index}.current`)}
                    className="rounded text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-sm text-gray-700">I currently work here</span>
                </label>
              </div>
              
              <Textarea 
                name={`experiences.${index}.description`} 
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

export default ExperienceForm