
import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, Upload, FileText, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

interface MobileATSBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileATSBottomSheet = ({ isOpen, onClose }: MobileATSBottomSheetProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsUploading(true);
      
      setTimeout(() => {
        setIsUploading(false);
        setIsAnalyzing(true);
        
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowResults(true);
        }, 3000);
      }, 1000);
    }
  };

  const resetModal = () => {
    setFile(null);
    setIsUploading(false);
    setIsAnalyzing(false);
    setShowResults(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="bg-white/95 backdrop-blur-md border-t border-violet-200 max-h-[90vh]">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-bold text-slate-800">
              ATS Score Checker
            </DrawerTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 border border-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="px-6 pb-8 overflow-y-auto">
          {!file && !showResults && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Upload Your Resume
                </h3>
                <p className="text-slate-600 text-sm">
                  Get instant feedback on your resume's ATS compatibility and optimization score
                </p>
              </div>

              <div className="border-2 border-dashed border-violet-200 rounded-lg p-8 bg-violet-50/50 backdrop-blur-sm">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label 
                  htmlFor="resume-upload"
                  className="cursor-pointer flex flex-col items-center space-y-4"
                >
                  <FileText className="w-12 h-12 text-violet-500" />
                  <div className="text-center">
                    <p className="text-lg font-medium text-slate-800">Drop your resume here</p>
                    <p className="text-sm text-slate-500">or click to browse</p>
                  </div>
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                    PDF, DOC, DOCX up to 10MB
                  </Badge>
                </label>
              </div>
            </div>
          )}

          {isUploading && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Uploading Resume</h3>
                <p className="text-slate-600">Please wait while we upload your file...</p>
              </div>
              <Progress value={75} className="bg-violet-500" />
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-spin">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Analyzing Resume</h3>
                <p className="text-slate-600">Our AI is scanning your resume for ATS optimization...</p>
              </div>
              <Progress value={45} className="bg-violet-500" />
            </div>
          )}

          {showResults && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">ATS Score: 78/100</h3>
                <Badge className="bg-green-100 text-green-800 border-green-200">Good Match</Badge>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Strengths</h4>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Clear job titles and company names</li>
                    <li>• Good use of action verbs</li>
                    <li>• Proper contact information format</li>
                    <li>• Relevant keywords present</li>
                  </ul>
                </div>

                <div className="bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                    <h4 className="font-semibold text-orange-800">Improvements Needed</h4>
                  </div>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Add more industry-specific keywords</li>
                    <li>• Include quantifiable achievements</li>
                    <li>• Improve skills section formatting</li>
                    <li>• Consider adding a professional summary</li>
                  </ul>
                </div>

                <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Keyword Analysis</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs">Project Management</Badge>
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs">Leadership</Badge>
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs">Communication</Badge>
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs">Problem Solving</Badge>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={resetModal}
                  variant="outline"
                  className="flex-1 bg-white/90 backdrop-blur-sm border-violet-200 text-violet-600 hover:bg-violet-50"
                >
                  Check Another
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                >
                  Improve Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileATSBottomSheet;
