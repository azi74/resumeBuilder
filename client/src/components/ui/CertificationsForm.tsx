import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from './Button'
import { Input } from './FormElements'

const CertificationsForm = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications'
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Certifications</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => append({
            name: '',
            issuingOrganization: '',
            issueDate: '',
            expirationDate: '',
            credentialId: '',
            credentialUrl: ''
          })}
        >
          Add Certification
        </Button>
      </div>
      
      {fields.length === 0 ? (
        <p className="text-gray-500">No certifications added yet.</p>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Certification #{index + 1}</h4>
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
                name={`certifications.${index}.name`} 
                label="Certification Name" 
                control={control} 
                required 
              />
              
              <Input 
                name={`certifications.${index}.issuingOrganization`} 
                label="Issuing Organization" 
                control={control} 
                required 
                className="mt-2"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input 
                  name={`certifications.${index}.issueDate`} 
                  label="Issue Date" 
                  control={control} 
                  type="date" 
                  required 
                />
                <Input 
                  name={`certifications.${index}.expirationDate`} 
                  label="Expiration Date" 
                  control={control} 
                  type="date" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input 
                  name={`certifications.${index}.credentialId`} 
                  label="Credential ID" 
                  control={control} 
                />
                <Input 
                  name={`certifications.${index}.credentialUrl`} 
                  label="Credential URL" 
                  control={control} 
                  type="url" 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CertificationsForm