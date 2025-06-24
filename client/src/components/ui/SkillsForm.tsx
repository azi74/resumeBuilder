import { useFieldArray, useFormContext } from 'react-hook-form'
import Button  from './Button'
import Input from './FormElements/Input';
import Select from './FormElements/Select';

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
]

const SkillsForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Skills</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => append({
            name: '',
            level: 'intermediate'
          })}
        >
          Add Skill
        </Button>
      </div>
      
      {fields.length === 0 ? (
        <p className="text-gray-500">No skills added yet.</p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Skill #{index + 1}</h4>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  name={`skills.${index}.name`} 
                  label="Skill Name" 
                  control={control} 
                  rules={{ required: 'Skill Name is required' }}  
                />
                <Select 
                  name={`skills.${index}.level`} 
                  label="Skill Level" 
                  control={control} 
                  options={skillLevels} 
                  rules={{ required: 'Skill Level is required' }} 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillsForm