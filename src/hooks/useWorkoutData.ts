
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Workout } from '@/types/workout';
import { loadFromLocalStorage, updateLocalStorage } from '@/utils/workoutStorage';
import { 
  fetchWorkoutsFromSupabase,
  saveWorkoutToSupabase,
  deleteWorkoutFromSupabase,
  migrateLocalToSupabase
} from '@/services/workoutService';

export { type Workout } from '@/types/workout';

export const useWorkoutData = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    id: "",
    date: new Date().toISOString().split("T")[0],
    exercises: [{ name: "", sets: [{ weight: "", reps: "" }] }]
  });

  // Load workouts from Supabase for logged-in users, or from localStorage otherwise
  const loadWorkouts = async () => {
    setLoading(true);
    
    if (isAuthenticated && user) {
      try {
        const parsedWorkouts = await fetchWorkoutsFromSupabase(user.id);
        setWorkouts(parsedWorkouts);
        
        // Attempt to migrate any local workouts to Supabase
        const localWorkouts = loadFromLocalStorage();
        if (localWorkouts.length > 0) {
          const result = await migrateLocalToSupabase(localWorkouts, parsedWorkouts, user.id);
          if (result.success && result.count && result.count > 0) {
            toast({
              title: "Workouts synced",
              description: `${result.count} local workouts uploaded to your account`,
            });
            // Reload to get the newly added workouts
            const updatedWorkouts = await fetchWorkoutsFromSupabase(user.id);
            setWorkouts(updatedWorkouts);
          }
        }
      } catch (error: any) {
        console.error('Error loading workouts:', error);
        toast({
          title: "Error loading workouts",
          description: error.message || "Failed to load your workout data",
          variant: "destructive",
        });
        
        // Fallback to localStorage
        const localWorkouts = loadFromLocalStorage();
        setWorkouts(localWorkouts);
      }
    } else {
      // Not authenticated or Supabase not configured, use localStorage
      const localWorkouts = loadFromLocalStorage();
      setWorkouts(localWorkouts);
    }
    
    setLoading(false);
  };

  // Save a workout to Supabase for logged-in users, or to localStorage otherwise
  const saveWorkout = async (workout: Workout) => {
    const workoutToSave = {
      ...workout,
      id: workout.id || Date.now().toString(),
      savedAt: new Date().toISOString(),
    };

    if (isAuthenticated && user) {
      try {
        const result = await saveWorkoutToSupabase(workoutToSave, user.id);
        
        // Also update local state
        const updatedWorkouts = workout.id 
          ? workouts.map(w => w.id === workout.id ? workoutToSave : w)
          : [...workouts, workoutToSave];
          
        setWorkouts(updatedWorkouts);
        updateLocalStorage(updatedWorkouts);
        
        return { success: true, workout: workoutToSave };
      } catch (error: any) {
        console.error('Error saving workout to Supabase:', error);
        toast({
          title: "Error saving workout",
          description: error.message || "Failed to save your workout",
          variant: "destructive",
        });
        return { success: false, error };
      }
    } else {
      // Not authenticated or Supabase not configured, save to localStorage
      try {
        const updatedWorkouts = workout.id 
          ? workouts.map(w => w.id === workout.id ? workoutToSave : w)
          : [...workouts, workoutToSave];
          
        setWorkouts(updatedWorkouts);
        updateLocalStorage(updatedWorkouts);
        
        return { success: true, workout: workoutToSave };
      } catch (error) {
        console.error("Error saving workout to localStorage:", error);
        return { success: false, error };
      }
    }
  };

  // Delete a workout from Supabase for logged-in users, or from localStorage otherwise
  const deleteWorkout = async (id: string) => {
    if (isAuthenticated && user) {
      try {
        await deleteWorkoutFromSupabase(id, user.id);
        
        // Also update local state
        const updatedWorkouts = workouts.filter(workout => workout.id !== id);
        setWorkouts(updatedWorkouts);
        updateLocalStorage(updatedWorkouts);
        
        return { success: true };
      } catch (error: any) {
        console.error('Error deleting workout from Supabase:', error);
        toast({
          title: "Error deleting workout",
          description: error.message || "Failed to delete your workout",
          variant: "destructive",
        });
        return { success: false, error };
      }
    } else {
      // Not authenticated or Supabase not configured, delete from localStorage
      try {
        const updatedWorkouts = workouts.filter(workout => workout.id !== id);
        setWorkouts(updatedWorkouts);
        updateLocalStorage(updatedWorkouts);
        
        return { success: true };
      } catch (error) {
        console.error("Error deleting workout from localStorage:", error);
        return { success: false, error };
      }
    }
  };

  // Load workouts when user status changes
  useEffect(() => {
    loadWorkouts();
  }, [isAuthenticated, user]);

  return { 
    workouts, 
    setWorkouts,
    currentWorkout, 
    setCurrentWorkout, 
    loading,
    saveWorkout,
    deleteWorkout 
  };
};
