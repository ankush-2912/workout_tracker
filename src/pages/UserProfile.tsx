
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const { profile, loading } = useUserProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const displayName = profile?.name || 'User';
  const initials = profile?.name 
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="section-container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {profile?.name ? `${profile.name}'s Profile` : 'Your Profile'}
              </h1>
              <p className="text-white/90 text-lg">
                Manage your account settings and view your progress
              </p>
            </div>
          </div>
        </div>
        
        <div className="section-container py-12">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-muted shadow-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 border-4 border-violet-500/30">
                    <AvatarFallback className="bg-violet-900/30 text-violet-300 text-4xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{displayName}</CardTitle>
                <CardDescription>
                  {user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-muted-foreground">
                  <p>
                    Member since: {' '}
                    {profile?.created_at 
                      ? new Date(profile.created_at).toLocaleDateString() 
                      : user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString()
                        : 'Not available'}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="destructive" 
                  onClick={handleSignOut}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing out..." : "Sign Out"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
