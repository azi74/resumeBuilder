import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, User, Mail, Lock } from "lucide-react";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";

// Form data type definitions
interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

// Google user info type
interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const loginForm = useForm<LoginFormData>();
  const signupForm = useForm<SignupFormData>();

  // Check if Google OAuth is available
  const isGoogleOAuthAvailable = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call with the form data
      console.log('Login data:', data);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Login failed:', error);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call with the form data
      console.log('Signup data:', data);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Signup failed:', error);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        setIsLoading(true);
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch user info');
        }
        
        const user: GoogleUserInfo = await res.json();
        console.log("Google User Info", user);
        onLogin(); 
      } catch (error) {
        console.error("Google login failed", error);
        alert("Google login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      setIsLoading(false);
      alert("Google login failed");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-transparent-200 border-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Welcome to resume.io
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 border border-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-violet-50 hover:text-black">
            <TabsTrigger value="login" className="data-[state=active]:bg-white hover:bg-white">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-white hover:bg-white">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-slate-100 focus:placeholder-gray-700 border-violet-200 focus:border-violet-500 h-12"
                    {...loginForm.register("email", { required: "Email is required" })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 bg-slate-100 hover:placeholder-200 focus:placeholder-gray-700 border-violet-200 focus:border-violet-500 h-12"
                    {...loginForm.register("password", { required: "Password is required" })}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-12"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              {isGoogleOAuthAvailable && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500">Or continue with</span>
                    </div>
                  </div>

                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => loginWithGoogle()}
                    className="w-full bg-white border-violet-200 text-slate-700 hover:text-black hover:bg-violet-50 h-12"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isLoading ? "Connecting..." : "Continue with Google"}
                  </Button>
                </>
              )}
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 bg-slate-100 border-violet-200 focus:border-violet-500 h-12"
                    {...signupForm.register("name", { required: "Full name is required" })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-slate-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-slate-100 border-violet-200 focus:border-violet-500 h-12"
                    {...signupForm.register("email", { required: "Email is required" })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-slate-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-10 bg-slate-100 border-violet-200 focus:border-violet-500 h-12"
                    {...signupForm.register("password", { required: "Password is required" })}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-12"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              {isGoogleOAuthAvailable && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-slate-500">Or continue with</span>
                    </div>
                  </div>

                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => loginWithGoogle()}
                    className="w-full bg-white border-violet-200 text-slate-700 hover:bg-violet-50 h-12"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isLoading ? "Connecting..." : "Continue with Google"}
                  </Button>
                </>
              )}
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-slate-500 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;