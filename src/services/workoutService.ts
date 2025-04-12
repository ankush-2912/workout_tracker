
import { supabase } from "@/integrations/supabase/client";
import { Workout } from "@/types/workout";

export const fetchWorkoutsFromSupabase = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    if (data) {
      // Parse the exercises JSON if needed
      const parsedWorkouts = data.map(workout => ({
        id: workout.id,
        date: workout.date,
        savedAt: workout.savedat,
        exercises: typeof workout.exercises === 'string' 
          ? JSON.parse(workout.exercises) 
          : workout.exercises,
        user_id: workout.user_id
      }));
      
      return parsedWorkouts;
    }
    return [];
  } catch (error) {
    console.error('Error loading workouts from Supabase:', error);
    throw error;
  }
};

export const saveWorkoutToSupabase = async (workout: Workout, userId: string) => {
  try {
    const supabaseWorkout = {
      id: workout.id,
      date: workout.date,
      savedat: workout.savedAt,
      user_id: userId,
      exercises: workout.exercises
    };
    
    let response;
    if (workout.id) {
      // Update existing workout
      response = await supabase
        .from('workouts')
        .update(supabaseWorkout)
        .eq('id', workout.id)
        .eq('user_id', userId);
    } else {
      // Insert new workout
      response = await supabase
        .from('workouts')
        .insert(supabaseWorkout);
    }
    
    if (response.error) {
      throw response.error;
    }
    
    return { success: true, workout };
  } catch (error) {
    console.error('Error saving workout to Supabase:', error);
    throw error;
  }
};

export const deleteWorkoutFromSupabase = async (id: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
      
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting workout from Supabase:', error);
    throw error;
  }
};

export const migrateLocalToSupabase = async (localWorkouts: Workout[], existingWorkouts: Workout[], userId: string) => {
  try {
    if (localWorkouts.length === 0) return { success: true };
    
    // Check which workouts need to be uploaded (not already in Supabase)
    const existingIds = new Set(existingWorkouts.map(w => w.id));
    const workoutsToUpload = localWorkouts
      .filter(w => !existingIds.has(w.id))
      .map(w => ({
        id: w.id,
        date: w.date,
        savedat: w.savedAt || new Date().toISOString(),
        user_id: userId,
        exercises: typeof w.exercises === 'string' ? w.exercises : w.exercises
      }));
    
    if (workoutsToUpload.length === 0) return { success: true };
    
    const { error } = await supabase
      .from('workouts')
      .insert(workoutsToUpload);
      
    if (error) throw error;
    
    return { 
      success: true, 
      count: workoutsToUpload.length 
    };
    
  } catch (error) {
    console.error("Error migrating workouts to Supabase:", error);
    throw error;
  }
};
