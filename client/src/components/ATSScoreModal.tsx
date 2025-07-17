
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, FileText, CheckCircle, XCircle, AlertCircle, TrendingUp } from "lucide-react";

interface ATSScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ATSScoreModal = ({ isOpen, onClose }: ATSScoreModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockResults = {
    score: 78,
    level: "Good",
    strengths: [
      "Clear section headers",
      "Relevant keywords present",
      "Proper formatting structure",
      "Professional email format",
      "Quantified achievements"
    ],
    improvements: [
      "Add more industry-specific keywords",
      "Include skills section",
      "Optimize file format (PDF preferred)",
      "Add LinkedIn profile URL",
      "Include more measurable results"
    ],
    keywords: {
      found: ["JavaScript", "React", "Project Management", "Leadership"],
      missing: ["Node.js", "SQL", "Agile", "Team Collaboration", "Problem Solving"]
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === "application/pdf" || 
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        selectedFile.type === "application/msword")) {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF or Word document");
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-violet-600 bg-violet-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const resetModal = () => {
    setFile(null);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-white border-transparent max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-800">
              ATS Score Checker
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 border border-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-slate-600 mb-6">
                Upload your resume to get an instant ATS compatibility score and improvement suggestions.
              </p>
            </div>

            {!file ? (
              <div 
                className="border-2 border-dashed border-violet-200 rounded-xl p-12 text-center hover:border-violet-300 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-violet-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Upload Your Resume
                </h3>
                <p className="text-slate-600 mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="text-sm text-slate-500">
                  Supports PDF, DOC, and DOCX files (max 10MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <Card className="bg-white border-violet-100">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-violet-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{file.name}</h4>
                        <p className="text-sm text-slate-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFile(null)}
                        className="border-red-200 bg-red-700 text-white hover:bg-red-950"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {isAnalyzing ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Analyzing Your Resume...
                    </h3>
                    <p className="text-slate-600">
                      This may take a few moments while we check ATS compatibility
                    </p>
                  </div>
                ) : (
                  <Button 
                    onClick={handleAnalyze}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-12"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Analyze ATS Score
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score Overview */}
            <Card className="border-violet-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-4 ${getScoreColor(mockResults.score)}`}>
                    {mockResults.score}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {getScoreLevel(mockResults.score)} ATS Score
                  </h3>
                  <p className="text-slate-600">
                    Your resume has a {mockResults.score}% chance of passing ATS systems
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card className="border-violet-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Strengths
                </h4>
                <div className="space-y-2">
                  {mockResults.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center text-slate-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {strength}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card className="border-violet-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-violet-600 mr-2" />
                  Suggested Improvements
                </h4>
                <div className="space-y-2">
                  {mockResults.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center text-slate-600">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                      {improvement}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keywords Analysis */}
            <Card className="border-violet-100">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">
                  Keywords Analysis
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-700 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Found Keywords
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {mockResults.keywords.found.map((keyword, index) => (
                        <Badge key={index} className="bg-green-100 text-green-700 border-green-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-3 flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Missing Keywords
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {mockResults.keywords.missing.map((keyword, index) => (
                        <Badge key={index} className="bg-red-100 text-red-700 border-red-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button 
                onClick={resetModal}
                variant="outline"
                className="flex-1 border-violet-200 text-violet-600 hover:bg-violet-50 h-12"
              >
                Check Another Resume
              </Button>
              <Button 
                onClick={handleClose}
                className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-12"
              >
                Create Optimized Resume
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ATSScoreModal;
