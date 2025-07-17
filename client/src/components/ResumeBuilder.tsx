import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Download, Eye } from "lucide-react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import CertificationsForm from "./forms/CertificationsForm";
import TemplateSelector from "./TemplateSelector";
import ResumePreview from "./ResumePreview";

interface ResumeBuilderProps {
  onBack: () => void;
}

// Define proper interfaces for resume data
interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  linkedIn?: string;
  website?: string;
  summary?: string;
}

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
  relevantCourses?: string[];
}

interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
  frameworks: string[];
  tools: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
  github?: string;
  highlights: string[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  url?: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
  template: string;
}

// Define a more flexible interface for form components
interface StepComponent {
  title: string;
  component: React.ComponentType<{
    onDataChange: (data: any) => void;
    data: any;
  }>;
}

const ResumeBuilder = ({ onBack }: ResumeBuilderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      linkedIn: "",
      website: "",
      summary: ""
    },
    workExperience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      frameworks: [],
      tools: []
    },
    projects: [],
    certifications: [],
    template: "modern"
  });

  const form = useForm();

  const steps: StepComponent[] = [
    { title: "Template", component: TemplateSelector },
    { title: "Personal Details", component: PersonalDetailsForm },
    { title: "Work Experience", component: WorkExperienceForm },
    { title: "Education", component: EducationForm },
    { title: "Skills", component: SkillsForm },
    { title: "Projects", component: ProjectsForm },
    { title: "Certifications", component: CertificationsForm }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = (): void => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepData = (data: any): void => {
    const stepKeys: (keyof ResumeData)[] = [
      'template', 
      'personalDetails', 
      'workExperience', 
      'education', 
      'skills', 
      'projects', 
      'certifications'
    ];
    
    setResumeData(prev => ({
      ...prev,
      [stepKeys[currentStep]]: data
    }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  if (showPreview) {
    return (
      <ResumePreview 
        resumeData={resumeData}
        onBack={() => setShowPreview(false)}
        onEdit={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-violet-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-slate-600 hover:bg-violet-500 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
            <div className="text-slate-400">|</div>
            <h1 className="text-xl font-semibold text-slate-800">Build Your Resume</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline"
              onClick={() => setShowPreview(true)}
              className="bg-white hover:text-black hover:border-violet-500 border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Section */}
          <Card className="mb-8 border-violet-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-2xl font-bold text-slate-800">
                  Step {currentStep + 1}: {steps[currentStep].title}
                </CardTitle>
                <span className="text-sm text-slate-500">
                  {currentStep + 1} of {steps.length}
                </span>
              </div>
              <Progress value={progress} className="bg-violet-500 h-2" />
            </CardHeader>
          </Card>

          {/* Form Section */}
          <Card className="border-violet-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <CurrentStepComponent 
                onDataChange={handleStepData}
                data={resumeData}
              />
              
              <div className="flex justify-between mt-8 pt-6 border-t border-violet-100">
                <Button 
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="border-violet-200 hover:text-black bg-white hover:border-violet-500 text-violet-600 hover:bg-violet-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;