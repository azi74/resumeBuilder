import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Folder, Github, Globe } from "lucide-react";

// Define the structure of a single project entry
interface ProjectEntry {
  name: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  date: string;
}

// Define the form data structure
interface ProjectsFormData {
  projects: ProjectEntry[];
}

// Define the props for the form
interface ProjectsFormProps {
  onDataChange: (data: ProjectEntry[]) => void;
  data: {
    projects?: ProjectEntry[];
  };
}

const ProjectsForm = ({ onDataChange, data }: ProjectsFormProps) => {
  const form = useForm<ProjectsFormData>({
    defaultValues: {
      projects: data.projects?.length > 0 ? data.projects : [
        {
          name: "",
          description: "",
          technologies: "",
          githubUrl: "",
          liveUrl: "",
          date: ""
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects"
  });

  const watchedValues = form.watch();

  useEffect(() => {
    onDataChange(watchedValues.projects);
  }, [watchedValues, onDataChange]);

  const addProject = () => {
    append({
      name: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
      date: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Projects
        </h2>
        <p className="text-slate-600">
          Showcase your best projects and achievements
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="border-violet-100 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Folder className="w-5 h-5 mr-2 text-violet-600" />
                  Project {index + 1}
                </CardTitle>
                {fields.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => remove(index)}
                    className="border-red-200 text-red-600 bg-white hover:bg-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Project Name *</Label>
                  <Input 
                    placeholder="E-commerce Platform"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`projects.${index}.name`, { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Date Completed</Label>
                  <Input 
                    type="month"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register(`projects.${index}.date`)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700">Description *</Label>
                <Textarea 
                  placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard. Implemented responsive design and optimized for performance."
                  className="min-h-[80px] bg-white placeholder:text-slate-400 border-violet-200 focus:border-violet-500"
                  {...form.register(`projects.${index}.description`, { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700">Technologies Used</Label>
                <Input 
                  placeholder="React, Node.js, MongoDB, Stripe API, AWS"
                  className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                  {...form.register(`projects.${index}.technologies`)}
                />
                <p className="text-xs text-slate-500">
                  Separate technologies with commas
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">GitHub Repository</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="https://github.com/username/project"
                      className="pl-10 border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                      {...form.register(`projects.${index}.githubUrl`)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700">Live Demo URL</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="https://myproject.com"
                      className="pl-10 border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                      {...form.register(`projects.${index}.liveUrl`)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button 
          onClick={addProject}
          variant="outline"
          className="w-full bg-white hover:text-black border-violet-200 text-violet-600 hover:bg-violet-50 border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectsForm;