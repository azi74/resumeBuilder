
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, FileText, Download, Share, Plus, Edit, Trash2, Star, Heart, Mail, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile = ({ onBack }: UserProfileProps) => {
  const [resumes] = useState([
    {
      id: 1,
      title: "Software Engineer Resume",
      template: "Modern",
      createdAt: "2024-01-15",
      status: "Complete",
      downloads: 12
    },
    {
      id: 2,
      title: "Frontend Developer Resume", 
      template: "Professional",
      createdAt: "2024-01-10",
      status: "Draft",
      downloads: 5
    },
    {
      id: 3,
      title: "Full Stack Resume",
      template: "Creative",
      createdAt: "2024-01-05",
      status: "Complete",
      downloads: 8
    }
  ]);

  const [favoriteTemplates] = useState([
    { id: 1, name: "Modern Professional", category: "Modern", likes: 245 },
    { id: 2, name: "Creative Designer", category: "Creative", likes: 189 },
    { id: 3, name: "Executive Classic", category: "Professional", likes: 156 }
  ]);

  const [certifications] = useState([
    { name: "AWS Solutions Architect", issuer: "Amazon", date: "2023-12", verified: true },
    { name: "React Developer Certification", issuer: "Meta", date: "2023-10", verified: true },
    { name: "Google Cloud Professional", issuer: "Google", date: "2023-08", verified: false }
  ]);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const userInfo = {
    name: "John Doe",
    email: "john.doe@email.com",
    title: "Senior Software Engineer"
  };

  const handleLogout = () => {
    console.log("User logged out");
    setShowLogoutConfirm(false);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100">
      {/* Mobile Header */}
      <header className="border-b border-violet-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-slate-600 hover:bg-violet-500 hover:text-violet-600 p-1 md:p-2"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="text-sm md:text-base"></span>
            </Button>
            <div className="text-slate-400 hidden md:block">|</div>
            <h1 className="text-lg md:text-xl font-semibold text-slate-800">My Profile</h1>
          </div>
          
          {/* Mobile Menu */}
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button 
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Resume
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowLogoutConfirm(true)}
                    className="border-red-200 text-red-600 hover:bg-red-50 justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button 
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-12 px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6 md:mb-8 border-violet-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 md:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
                  <Avatar className="w-16 h-16 md:w-24 md:h-24 mx-auto sm:mx-0">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                    <AvatarFallback className="bg-violet-100 text-violet-600 text-lg md:text-2xl font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center sm:text-left w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1 md:mb-2">{userInfo.name}</h2>
                    <p className="text-slate-600 mb-2 md:mb-4">{userInfo.title}</p>
                    <div className="flex items-center justify-center sm:justify-start text-sm text-slate-500">
                      <Mail className="w-4 h-4 mr-1" />
                      {userInfo.email}
                    </div>
                  </div>
                </div>
                
                {!isMobile && (
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowLogoutConfirm(true)}
                      className="border-red-200 bg-white bg-white hover:text-red-500 text-red-600 hover:bg-red-50 h-12 px-6"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="resumes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-violet-50 mb-6 md:mb-8 h-10 md:h-12">
              <TabsTrigger value="resumes" className="text-xs md:text-sm text-black data-[state=active]:bg-white">
                My Resumes
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-xs md:text-sm text-black data-[state=active]:bg-white">
                Templates
              </TabsTrigger>
              <TabsTrigger value="certifications" className="text-xs md:text-sm text-black data-[state=active]:bg-white">
                Certifications
              </TabsTrigger>
            </TabsList>

            {/* Resumes Tab */}
            <TabsContent value="resumes">
              <Card className="border-violet-100 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg md:text-xl font-bold text-slate-800 flex items-center">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2 text-violet-600" />
                    My Resumes ({resumes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:gap-4">
                    {resumes.map((resume) => (
                      <div 
                        key={resume.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border border-violet-100 rounded-xl hover:bg-violet-50 transition-colors group space-y-3 md:space-y-0"
                      >
                        <div className="flex items-start md:items-center space-x-3 md:space-x-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1 text-sm md:text-base">{resume.title}</h3>
                            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-xs md:text-sm text-slate-500">
                              <span>Template: {resume.template}</span>
                              <span className="hidden md:inline">•</span>
                              <span>Created: {resume.createdAt}</span>
                              <span className="hidden md:inline">•</span>
                              <span>{resume.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 overflow-x-auto">
                          <Button size="sm" variant="outline" className="border-violet-200 hover:bg-slate-200 hover:text-black bg-white text-violet-600 h-8 px-3 text-xs whitespace-nowrap">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="border-violet-200 hover:bg-slate-200 hover:text-black bg-white text-violet-600 h-8 px-3 text-xs whitespace-nowrap">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="border-violet-200 hover:bg-slate-200 hover:text-black bg-white text-violet-600 h-8 px-3 text-xs whitespace-nowrap">
                            <Share className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 bg-black hover:bg-black hover:text-red-700 text-white h-8 px-3 text-xs">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorite Templates Tab */}
            <TabsContent value="templates">
              <Card className="border-violet-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-bold text-slate-800 flex items-center">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2 text-violet-600" />
                    Favorite Templates ({favoriteTemplates.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {favoriteTemplates.map((template) => (
                      <div key={template.id} className="border border-violet-100 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all group">
                        <div className="w-full h-24 md:h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg mb-3 md:mb-4 flex items-center justify-center">
                          <FileText className="w-6 h-6 md:w-8 md:h-8 text-violet-600" />
                        </div>
                        <h3 className="font-semibold text-slate-800 mb-2 text-sm md:text-base">{template.name}</h3>
                        <div className="flex items-center justify-between text-xs md:text-sm text-slate-500 mb-3 md:mb-4">
                          <span>{template.category}</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 md:w-4 md:h-4 text-violet-500 mr-1" />
                            <span>{template.likes}</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-8 md:h-10 text-xs md:text-sm"
                        >
                          Use Template
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications">
              <Card className="border-violet-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                    <CardTitle className="text-lg md:text-xl font-bold text-slate-800">
                      Certifications ({certifications.length})
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      className="bg-white hover:text-black border-violet-200 text-violet-600 hover:bg-violet-50 h-8 md:h-10 px-3 md:px-4 text-xs md:text-sm"
                    >
                      <Plus className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Add Certification
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="p-4 md:p-6 border border-violet-100 rounded-xl hover:bg-violet-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start justify-between space-y-3 md:space-y-0">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-1 text-sm md:text-base">{cert.name}</h4>
                            <p className="text-slate-600 mb-1 text-sm md:text-base">{cert.issuer}</p>
                            <p className="text-xs md:text-sm text-violet-600">Issued: {cert.date}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="bg-white hover:text-black hover:bg-slate-200 border-violet-200 text-violet-600 h-6 md:h-8 px-2 md:px-3 text-xs">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-white hover:bg-slate-200 hover:text-black border-red-200 text-red-600 h-6 md:h-8 px-2 md:px-3 text-xs">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-md mx-4 border-violet-500 bg-white">
          <DialogHeader>
            <DialogTitle className="text-red-700 text-lg md:text-xl">Confirm Logout</DialogTitle>
            <DialogDescription className="text-black text-sm md:text-base">
              Are you sure you want to logout? You'll need to sign in again to access your profile and resumes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowLogoutConfirm(false)}
              className="w-full bg-white border-violet-500 text-black hover:text-white hover:bg-violet-400 md:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLogout}
              className="w-full md:w-auto bg-red-600 hover:bg-red-800 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
