
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type WorkoutSet = {
  weight: string;
  reps: string;
};

type Exercise = {
  name: string;
  sets: WorkoutSet[];
};

export type Workout = {
  id: string;
  date: string;
  savedAt?: string;
  exercises: Exercise[];
  user_id?: string;
};

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
  const supabaseConfigured = isSupabaseConfigured();

  // Load workouts from Supabase for logged-in users, or from localStorage otherwise
  const loadWorkouts = async () => {
    setLoading(true);
    
    if (isAuthenticated && user && supabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Parse the exercises JSON if needed
          const parsedWorkouts = data.map(workout => ({
            ...workout,
            exercises: typeof workout.exercises === 'string' 
              ? JSON.parse(workout.exercises) 
              : workout.exercises
          }));
          
          setWorkouts(parsedWorkouts);
          
          // Migrate localStorage data to Supabase if needed
          migrateLocalStorageToSupabase(parsedWorkouts);
        }
      } catch (error: any) {
        console.error('Error loading workouts:', error);
        toast({
          title: "Error loading workouts",
          description: error.message || "Failed to load your workout data",
          variant: "destructive",
        });
        
        // Fallback to localStorage
        loadFromLocalStorage();
      }
    } else {
      // Not authenticated or Supabase not configured, use localStorage
      loadFromLocalStorage();
    }
    
    setLoading(false);
  };
  
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem("workouts");
      if (saved) {
        setWorkouts(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading workouts from localStorage:", error);
    }
  };
  
  const migrateLocalStorageToSupabase = async (existingWorkouts: Workout[]) => {
    if (!supabaseConfigured) return;
    
    try {
      const saved = localStorage.getItem("workouts");
      if (!saved || !user) return;
      
      const localWorkouts = JSON.parse(saved) as Workout[];
      if (localWorkouts.length === 0) return;
      
      // Check which workouts need to be uploaded (not already in Supabase)
      const existingIds = new Set(existingWorkouts.map(w => w.id));
      const workoutsToUpload = localWorkouts
        .filter(w => !existingIds.has(w.id))
        .map(w => ({
          ...w,
          user_id: user.id,
          // Convert exercises to string if needed by your Supabase schema
          exercises: typeof w.exercises === 'string' ? w.exercises : JSON.stringify(w.exercises)
        }));
      
      if (workoutsToUpload.length === 0) return;
      
      const { error } = await supabase
        .from('workouts')
        .insert(workoutsToUpload);
        
      if (error) throw error;
      
      toast({
        title: "Workouts synced",
        description: `${workoutsToUpload.length} local workouts uploaded to your account`,
      });
      
      // Reload the workouts to get the newly added ones
      loadWorkouts();
      
    } catch (error: any) {
      console.error("Error migrating workouts to Supabase:", error);
    }
  };

  // Save a workout to Supabase for logged-in users, or to localStorage otherwise
  const saveWorkout = async (workout: Workout) => {
    const workoutToSave = {
      ...workout,
      id: workout.id || Date.now().toString(),
      savedAt: new Date().toISOString(),
    };

    if (isAuthenticated && user && supabaseConfigured) {
      try {
        // Add user_id to the workout
        const supabaseWorkout = {
          ...workoutToSave,
          user_id: user.id,
          // Convert exercises to string if needed by your Supabase schema
          exercises: typeof workoutToSave.exercises === 'string' 
            ? workoutToSave.exercises 
            : JSON.stringify(workoutToSave.exercises)
        };
        
        let response;
        if (workout.id) {
          // Update existing workout
          response = await supabase
            .from('workouts')
            .update(supabaseWorkout)
            .eq('id', workout.id)
            .eq('user_id', user.id);
        } else {
          // Insert new workout
          response = await supabase
            .from('workouts')
            .insert(supabaseWorkout);
        }
        
        if (response.error) {
          throw response.error;
        }
        
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
    if (isAuthenticated && user && supabaseConfigured) {
      try {
        const { error } = await supabase
          .from('workouts')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
          
        if (error) {
          throw error;
        }
        
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

  // Helper function to update localStorage
  const updateLocalStorage = (updatedWorkouts: Workout[]) => {
    try {
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error("Error saving workouts to localStorage:", error);
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
