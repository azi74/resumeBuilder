import { useFormContext } from 'react-hook-form'
import SocialShare from './SocialShare'

const PreviewPane = () => {
  const { watch } = useFormContext()
  const formData = watch()

  // In a real implementation, you would render the preview based on the selected template
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Resume Preview</h2>
        <SocialShare />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">
          {formData.personalInfo.firstName} {formData.personalInfo.lastName}
        </h3>
        <p className="text-gray-600 mb-4">{formData.personalInfo.email}</p>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Professional Summary</h4>
          <p className="text-gray-700">{formData.personalInfo.summary || 'No summary provided'}</p>
        </div>
        
        {formData.experiences.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-2">Work Experience</h4>
            {formData.experiences.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between">
                  <p className="font-medium">{exp.jobTitle}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Add sections for education, skills, projects, etc. */}
      </div>
    </div>
  )
}

export default PreviewPane