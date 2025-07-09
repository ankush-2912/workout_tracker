
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";

interface WorkoutHeaderProps {
  isAuthenticated: boolean;
}

const WorkoutHeader = ({ isAuthenticated }: WorkoutHeaderProps) => {
  const { profile } = useUserProfile();

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="section-container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isAuthenticated && profile ? `${profile.name}'s Workout Tracker` : 'Workout Tracker'}
          </h1>
          <p className="text-white/90 text-lg">
            {isAuthenticated && profile 
              ? `Welcome back, ${profile.name}! Track your workouts, monitor your progress, and push your limits`
              : 'Track your workouts, monitor your progress, and push your limits'
            }
          </p>
          {!isAuthenticated && (
            <div className="mt-4 bg-indigo-900/50 rounded-md p-3 text-sm">
              <p className="text-white/80">
                You're not logged in. Your workouts will be saved locally in this browser.
                <Button asChild variant="link" className="text-white underline ml-2 p-0 h-auto">
                  <a href="/auth">Login</a>
                </Button>
                to save your workouts to your account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutHeader;
