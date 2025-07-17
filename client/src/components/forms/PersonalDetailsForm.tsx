import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User, Mail, Phone, MapPin, Globe, Github } from "lucide-react";

// Define the structure of personal details
interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photo: string;
}

// Define the props for the form
interface PersonalDetailsFormProps {
  onDataChange: (data: PersonalDetails) => void;
  data: {
    personalDetails?: PersonalDetails;
  };
}

const PersonalDetailsForm = ({ onDataChange, data }: PersonalDetailsFormProps) => {
  const form = useForm<PersonalDetails>({
    defaultValues: data.personalDetails || {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      summary: "",
      photo: ""
    }
  });

  const watchedValues = form.watch();

  useEffect(() => {
    onDataChange(watchedValues);
  }, [watchedValues, onDataChange]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Personal Details
        </h2>
        <p className="text-slate-600">
          Let's start with your basic information
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Photo Upload */}
        <div className="lg:col-span-1">
          <Card className="border-violet-100 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Profile Photo</CardTitle>
              <p className="text-sm text-slate-600">Optional - Add a professional photo</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={watchedValues.photo} />
                <AvatarFallback className="bg-violet-100 text-violet-600 text-2xl">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                className="bg-white hover:text-black border-violet-200 text-violet-600 hover:bg-violet-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-violet-100 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-700">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="fullName"
                      placeholder="John Doe"
                      className="pl-10 bg-white border-violet-200 focus:border-violet-500"
                      {...form.register("fullName", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="john.doe@email.com"
                      className="pl-10 bg-white border-violet-200 focus:border-violet-500"
                      {...form.register("email", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 bg-white placeholder-black border-violet-200 focus:border-violet-500"
                      {...form.register("phone")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-700">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="location"
                      placeholder="New York, NY"
                      className="pl-10 bg-white border-violet-200 focus:border-violet-500"
                      {...form.register("location")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Online Presence */}
          <Card className="bg-white border-violet-100">
            <CardHeader>
              <CardTitle className="text-lg">Online Presence</CardTitle>
              <p className="text-sm text-slate-600">Add your professional links</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website" className="text-slate-700">Website/Portfolio</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="website"
                    placeholder="https://johndoe.dev"
                    className="pl-10 border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register("website")}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-slate-700">LinkedIn Profile</Label>
                  <Input 
                    id="linkedin"
                    placeholder="linkedin.com/in/johndoe"
                    className="border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                    {...form.register("linkedin")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github" className="text-slate-700">GitHub Profile</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="github"
                      placeholder="github.com/johndoe"
                      className="pl-10 border-violet-200 bg-white placeholder:text-slate-400 focus:border-violet-500"
                      {...form.register("github")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card className="border-violet-100 bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Professional Summary</CardTitle>
              <p className="text-sm text-slate-600">Write a brief overview of your professional background</p>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams..."
                className="min-h-[120px] bg-white placeholder:text-slate-400 border-violet-200 focus:border-violet-500"
                {...form.register("summary")}
              />
              <p className="text-xs text-slate-500 mt-2">
                Tip: Keep it concise (2-3 sentences) and highlight your key strengths
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;