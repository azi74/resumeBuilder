
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

interface TemplateSelectorProps {
  onDataChange: (data: string) => void;
  data: any;
}

const TemplateSelector = ({ onDataChange, data }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(data.template || "modern");

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech roles",
      preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
      isPopular: true,
      atsScore: 95
    },
    {
      id: "classic",
      name: "Classic Executive",
      description: "Traditional layout ideal for corporate positions",
      preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
      isPopular: false,
      atsScore: 92
    },
    {
      id: "creative",
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
      isPopular: false,
      atsScore: 88
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Simple and elegant for any industry",
      preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
      isPopular: true,
      atsScore: 94
    },
    {
      id: "bold",
      name: "Bold Impact",
      description: "Strong visual hierarchy for leadership roles",
      preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
      isPopular: false,
      atsScore: 90
    },
    {
      id: "academic",
      name: "Academic Scholar",
      description: "Perfect for research and academic positions",
      preview: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
      isPopular: false,
      atsScore: 93
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onDataChange(templateId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Choose Your Resume Template
        </h2>
        <p className="text-slate-600">
          Select a professionally designed template that matches your industry and style
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedTemplate === template.id 
                ? "ring-2 ring-violet-500 border-violet-300 bg-violet-50" 
                : "border-violet-100 hover:border-violet-300"
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <CardContent className="p-0">
              <div className="relative">
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg overflow-hidden">
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-300 rounded w-1/2"></div>
                    <div className="mt-4 space-y-1">
                      <div className="h-2 bg-slate-300 rounded w-full"></div>
                      <div className="h-2 bg-slate-300 rounded w-5/6"></div>
                      <div className="h-2 bg-slate-300 rounded w-4/6"></div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="h-2 bg-slate-300 rounded w-2/3"></div>
                      <div className="h-1 bg-slate-300 rounded w-full"></div>
                      <div className="h-1 bg-slate-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Popular Badge */}
                {template.isPopular && (
                  <Badge className="absolute top-3 left-3 bg-orange-100 text-orange-700 border-orange-200">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>

              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800">{template.name}</h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      template.atsScore >= 94 ? "border-green-300 text-green-700" :
                      template.atsScore >= 90 ? "border-yellow-300 text-yellow-700" :
                      "border-orange-300 text-orange-700"
                    }`}
                  >
                    ATS {template.atsScore}%
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                
                <Button 
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className={`w-full ${
                    selectedTemplate === template.id 
                      ? "bg-violet-500 hover:bg-violet-600 text-white" 
                      : "border-violet-200 bg-white hover:text-black text-violet-600 hover:bg-violet-50"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateSelect(template.id);
                  }}
                >
                  {selectedTemplate === template.id ? "Selected" : "Select Template"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center p-6 bg-violet-50 rounded-xl border border-violet-100">
        <h3 className="font-semibold text-slate-800 mb-2">🎯 ATS Optimization</h3>
        <p className="text-sm text-slate-600">
          All our templates are designed to pass Applicant Tracking Systems (ATS) with high scores. 
          The percentage shows how well each template performs with automated resume scanners.
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;
