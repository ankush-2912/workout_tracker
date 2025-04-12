
import { Workout } from "@/types/workout";

export const loadFromLocalStorage = (): Workout[] => {
  try {
    const saved = localStorage.getItem("workouts");
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize with empty array if no data exists
    localStorage.setItem("workouts", JSON.stringify([]));
    return [];
  } catch (error) {
    console.error("Error loading workouts from localStorage:", error);
    // Initialize with empty array if error
    localStorage.setItem("workouts", JSON.stringify([]));
    return [];
  }
};

export const updateLocalStorage = (workouts: Workout[]): void => {
  try {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  } catch (error) {
    console.error("Error saving workouts to localStorage:", error);
  }
};
