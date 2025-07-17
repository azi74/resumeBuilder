import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Briefcase } from "lucide-react";

// Define the structure of a single work experience entry
interface WorkExperienceEntry {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Define the form data structure
interface WorkExperienceFormData {
  experiences: WorkExperienceEntry[];
}

// Define the props for the form
interface WorkExperienceFormProps {
  onDataChange: (data: WorkExperienceEntry[]) => void;
  data: {
    workExperience?: WorkExperienceEntry[];
  };
}

const WorkExperienceForm = ({ onDataChange, data }: WorkExperienceFormProps) => {
  const form = useForm<WorkExperienceFormData>({
    defaultValues: {
      experiences: data.workExperience?.length > 0 ? data.workExperience : [
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: ""
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences"
  });

  const watchedValues = form.watch();

  useEffect(() => {
    onDataChange(watchedValues.experiences);
  }, [watchedValues, onDataChange]);

  const addExperience = (): void => {
    append({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Work Experience
        </h2>
        <p className="text-slate-600">
          Add your professional experience, starting with the most recent
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-white border-violet-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-violet-600" />
                  Experience {index + 1}
                </CardTitle>
                {fields.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => remove(index)}
                    className="border-red-200 text-red-600 bg-white hover:text-red-50 hover:bg-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Job Title *</Label>
                  <Input 
                    placeholder="Senior Software Engineer"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`experiences.${index}.jobTitle`, { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Company *</Label>
                  <Input 
                    placeholder="Google Inc."
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`experiences.${index}.company`, { required: true })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Location</Label>
                  <Input 
                    placeholder="San Francisco, CA"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`experiences.${index}.location`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Start Date *</Label>
                  <Input 
                    type="month"
                    className="border-violet-200 bg-white placeholder:text-black focus:border-violet-500"
                    {...form.register(`experiences.${index}.startDate`, { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">End Date</Label>
                  <Input 
                    type="month"
                    placeholder="Present"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`experiences.${index}.endDate`)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700">Job Description</Label>
                <Textarea 
                  placeholder="• Led a team of 5 developers in building scalable web applications&#10;• Implemented microservices architecture reducing system latency by 40%&#10;• Mentored junior developers and conducted code reviews"
                  className="min-h-[100px] border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                  {...form.register(`experiences.${index}.description`)}
                />
                <p className="text-xs text-slate-500">
                  Use bullet points to highlight your key achievements and responsibilities
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          onClick={addExperience}
          variant="outline"
          className="w-full bg-white hover:text-black border-violet-200 text-violet-600 hover:bg-violet-50 border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Experience
        </Button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;