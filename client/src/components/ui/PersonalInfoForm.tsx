import { useFormContext } from 'react-hook-form'
import Input from './FormElements/Input';
import Textarea from './FormElements/Textarea';
import FileUpload from './FormElements/FileUpload';

const PersonalInfoForm = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="personalInfo.firstName" label="First Name" control={control} required />
        <Input name="personalInfo.lastName" label="Last Name" control={control} required />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="personalInfo.email" label="Email" control={control} type="email" required />
        <Input name="personalInfo.phone" label="Phone" control={control} type="tel" />
      </div>
      
      <FileUpload name="personalInfo.photo" label="Profile Photo" control={control} />
      
      <Textarea name="personalInfo.summary" label="Professional Summary" control={control} rows={4} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="personalInfo.address" label="Address" control={control} />
        <Input name="personalInfo.city" label="City" control={control} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="personalInfo.country" label="Country" control={control} />
        <Input name="personalInfo.postalCode" label="Postal Code" control={control} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="socialLinks.linkedin" label="LinkedIn URL" control={control} type="url" />
        <Input name="socialLinks.github" label="GitHub URL" control={control} type="url" />
      </div>
    </div>
  )
}

export default PersonalInfoForm