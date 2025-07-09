
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/contexts/AuthContext";

const ProgressHeader = () => {
  const { profile } = useUserProfile();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="section-container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isAuthenticated && profile ? `${profile.name}'s Progress Dashboard` : 'Progress Dashboard'}
          </h1>
          <p className="text-white/90 text-lg">
            {isAuthenticated && profile 
              ? `Track your fitness journey, ${profile.name}. See how far you've come and where you're heading`
              : 'Track your fitness journey and monitor your improvements over time'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
