
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Share, Edit } from "lucide-react";
import { ResumeData } from "./ResumeBuilder";

interface ResumePreviewProps {
  resumeData: ResumeData;
  onBack: () => void;
  onEdit: () => void;
}

const ResumePreview = ({ resumeData, onBack, onEdit }: ResumePreviewProps) => {
  const handleDownload = (format: string) => {
    console.log(`Downloading resume as ${format}`);
    // Download logic will be implemented here
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
    // Share logic will be implemented here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-violet-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-3 md:py-4">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-slate-600 hover:text-violet-600 p-2 h-auto"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-base font-semibold text-slate-800 truncate mx-2">Resume Preview</h1>
            <Button 
              variant="outline"
              onClick={onEdit}
              className="border-violet-200 text-violet-600 hover:bg-violet-50 p-2 h-auto"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-slate-600 bg-white hover:bg-violet-500 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
              <div className="text-slate-400">|</div>
              <h1 className="text-xl font-semibold text-slate-800">Resume Preview</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline"
                onClick={onEdit}
                className="border-violet-200 bg-white hover:text-black text-violet-600 hover:bg-violet-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => handleDownload('pdf')}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleShare('linkedin')}
                  className="border-violet-200 bg-white hover:text-black text-violet-600 hover:bg-violet-50"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="md:hidden mt-3 flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Button 
                onClick={() => handleDownload('pdf')}
                className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleShare('linkedin')}
                className="flex-1 border-violet-200 text-violet-600 hover:bg-violet-50 h-10"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Resume Preview Card */}
          <Card className="border-violet-100 bg-white shadow-xl">
            <CardContent className="p-3 sm:p-4 md:p-8">
              <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 min-h-[600px] md:min-h-[1000px]" id="resume-content">
                {/* Resume Content */}
                <div className="space-y-4 md:space-y-6">
                  {/* Header */}
                  <div className="text-center border-b border-slate-200 pb-4 md:pb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                      {resumeData.personalDetails?.fullName || "Your Name"}
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-slate-600">
                      {resumeData.personalDetails?.email && (
                        <span>{resumeData.personalDetails.email}</span>
                      )}
                      {resumeData.personalDetails?.phone && (
                        <>
                        <span className="hidden sm:inline">• </span>
                        <span>{resumeData.personalDetails.phone}</span>
                        </>
                      )}
                      {resumeData.personalDetails?.location && (
                        <>
                        <span className="hidden sm:inline">• </span>
                        <span>{resumeData.personalDetails.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {resumeData.personalDetails?.summary && (
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 md:mb-3 border-b border-slate-200 pb-1">
                        Professional Summary
                      </h2>
                      <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                        {resumeData.personalDetails.summary}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.workExperience?.length > 0 && (
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 md:mb-3 border-b border-slate-200 pb-1">
                        Work Experience
                      </h2>
                      <div className="space-y-3 md:space-y-4">
                        {resumeData.workExperience.map((exp, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                              <div>
                                <h3 className="text-sm sm:text-base font-semibold text-slate-800">{exp.jobTitle}</h3>
                                <p className="text-xs sm:text-sm text-slate-600">{exp.company} • {exp.location}</p>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-500">
                                {exp.startDate} - {exp.endDate || "Present"}
                              </p>
                            </div>
                            {exp.description && (
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {(resumeData.skills?.technical?.length > 0 || resumeData.skills?.soft?.length > 0) && (
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 md:mb-3 border-b border-slate-200 pb-1">
                        Skills
                      </h2>
                      {resumeData.skills.technical?.length > 0 && (
                        <div className="mb-3">
                          <h3 className="text-sm sm:text-base font-medium text-slate-700 mb-2">Technical Skills</h3>
                          <p className="text-xs sm:text-sm text-slate-600">
                            {resumeData.skills.technical.join(" • ")}
                          </p>
                        </div>
                      )}
                      {resumeData.skills.soft?.length > 0 && (
                        <div>
                          <h3 className="text-sm sm:text-base font-medium text-slate-700 mb-2">Soft Skills</h3>
                          <p className="text-xs sm:text-sm text-slate-600">
                            {resumeData.skills.soft.join(" • ")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Education */}
                  {resumeData.education?.length > 0 && (
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 md:mb-3 border-b border-slate-200 pb-1">
                        Education
                      </h2>
                      <div className="space-y-3">
                        {resumeData.education.map((edu, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-1 sm:space-y-0">
                            <div>
                              <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                                {edu.degree} in {edu.field}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600">{edu.school} • {edu.location}</p>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500">{edu.graduationDate}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
