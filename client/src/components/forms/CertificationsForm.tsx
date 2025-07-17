import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Award } from "lucide-react";

// Define the structure of a single certification entry
interface CertificationEntry {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
}

// Define the form data structure
interface CertificationsFormData {
  certifications: CertificationEntry[];
}

// Define the props for the form
interface CertificationsFormProps {
  onDataChange: (data: CertificationEntry[]) => void;
  data: {
    certifications?: CertificationEntry[];
  };
}

const CertificationsForm = ({ onDataChange, data }: CertificationsFormProps) => {
  const form = useForm<CertificationsFormData>({
    defaultValues: {
      certifications: data.certifications?.length > 0 ? data.certifications : []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certifications"
  });

  const watchedValues = form.watch();

  useEffect(() => {
    onDataChange(watchedValues.certifications);
  }, [watchedValues, onDataChange]);

  const addCertification = () => {
    append({
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
      url: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Certifications & Awards
        </h2>
        <p className="text-slate-600">
          Add your professional certifications and achievements (optional)
        </p>
      </div>

      {fields.length === 0 ? (
        <Card className="border-violet-100 border-dashed">
          <CardContent className="p-12 text-center bg-white">
            <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No certifications yet</h3>
            <p className="text-slate-500 mb-6">
              Add your professional certifications, awards, or achievements to strengthen your resume
            </p>
            <Button 
              onClick={addCertification}
              className="bg-violet-500 p-6 hover:bg-violet-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Certification
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id} className="bg-white border-violet-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="w-5 h-5 mr-2 text-violet-600" />
                    Certification {index + 1}
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => remove(index)}
                    className="border-red-200 bg-white text-red-600 hover:bg-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Certification Name *</Label>
                    <Input 
                      placeholder="AWS Solutions Architect Associate"
                      className="border-violet-200 bg-white placeholder:text-slate-300 focus:border-violet-500"
                      {...form.register(`certifications.${index}.name`, { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Issuing Organization *</Label>
                    <Input 
                      placeholder="Amazon Web Services"
                      className="border-violet-200 bg-white placeholder:text-slate-300 focus:border-violet-500"
                      {...form.register(`certifications.${index}.issuer`, { required: true })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Issue Date</Label>
                    <Input 
                      type="month"
                      className="border-violet-200 bg-white placeholder:text-slate-300 focus:border-violet-500"
                      {...form.register(`certifications.${index}.date`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Credential ID</Label>
                    <Input 
                      placeholder="ABC123XYZ"
                      className="border-violet-200 bg-white placeholder:text-slate-300 focus:border-violet-500"
                      {...form.register(`certifications.${index}.credentialId`)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Credential URL</Label>
                  <Input 
                    placeholder="https://verify.example.com/credential/abc123"
                    className="border-violet-200 bg-white placeholder:text-slate-300 focus:border-violet-500"
                    {...form.register(`certifications.${index}.url`)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button 
            onClick={addCertification}
            variant="outline"
            className="w-full bg-white border-violet-200 text-violet-600 hover:bg-violet-50 border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Certification
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;