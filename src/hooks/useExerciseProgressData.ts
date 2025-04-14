
import { useMemo } from "react";

interface ExerciseSet {
  weight: string;
  reps: string;
}

interface ExerciseData {
  name: string;
  sets: ExerciseSet[];
}

interface Workout {
  date: string;
  exercises: ExerciseData[];
}

interface ExerciseProgressPoint {
  date: string;
  maxWeight: number;
  totalVolume: number;
  sets: number;
}

export const useExerciseProgressData = (
  filteredWorkouts: Workout[],
  selectedExercise: string
): ExerciseProgressPoint[] => {
  return useMemo(() => {
    if (!selectedExercise) return [];
    
    const exerciseData: ExerciseProgressPoint[] = [];
    
    filteredWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        if (exercise.name.toLowerCase() === selectedExercise.toLowerCase()) {
          let maxWeight = 0;
          let totalVolume = 0;
          
          exercise.sets.forEach(set => {
            const weight = parseFloat(set.weight) || 0;
            const reps = parseInt(set.reps) || 0;
            
            if (weight > maxWeight) {
              maxWeight = weight;
            }
            
            totalVolume += weight * reps;
          });
          
          if (maxWeight > 0) {
            exerciseData.push({
              date: workout.date,
              maxWeight,
              totalVolume,
              sets: exercise.sets.length
            });
          }
        }
      });
    });
    
    return exerciseData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredWorkouts, selectedExercise]);
};
