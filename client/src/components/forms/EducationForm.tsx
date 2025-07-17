import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GraduationCap } from "lucide-react";

// Define the structure of a single education entry
interface EducationEntry {
  degree: string;
  field: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
}

// Define the form data structure
interface EducationFormData {
  education: EducationEntry[];
}

// Define the props for the form
interface EducationFormProps {
  onDataChange: (data: EducationEntry[]) => void;
  data: {
    education?: EducationEntry[];
  };
}

const EducationForm = ({ onDataChange, data }: EducationFormProps) => {
  const form = useForm<EducationFormData>({
    defaultValues: {
      education: data.education?.length > 0 ? data.education : [
        {
          degree: "",
          field: "",
          school: "",
          location: "",
          graduationDate: "",
          gpa: ""
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education"
  });

  const watchedValues = form.watch();

  useEffect(() => {
    onDataChange(watchedValues.education);
  }, [watchedValues, onDataChange]);

  const addEducation = () => {
    append({
      degree: "",
      field: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Education
        </h2>
        <p className="text-slate-600">
          Add your educational background and qualifications
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-white border-violet-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-violet-600" />
                  Education {index + 1}
                </CardTitle>
                {fields.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => remove(index)}
                    className="border-red-200 bg-white text-red-600 hover:bg-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Degree *</Label>
                  <Input 
                    placeholder="Bachelor of Science"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`education.${index}.degree`, { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Field of Study *</Label>
                  <Input 
                    placeholder="Computer Science"
                    className="bg-white placeholder:text-slate-400 border-violet-200 focus:border-violet-500"
                    {...form.register(`education.${index}.field`, { required: true })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">School/University *</Label>
                  <Input 
                    placeholder="Stanford University"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`education.${index}.school`, { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Location</Label>
                  <Input 
                    placeholder="Stanford, CA"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`education.${index}.location`)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Graduation Date</Label>
                  <Input 
                    type="month"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`education.${index}.graduationDate`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">GPA (Optional)</Label>
                  <Input 
                    placeholder="3.8/4.0"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`education.${index}.gpa`)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          onClick={addEducation}
          variant="outline"
          className="w-full bg-white placeholder:text-slate-400 hover:text-black border-violet-200 text-violet-600 hover:bg-violet-50 border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Education
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;