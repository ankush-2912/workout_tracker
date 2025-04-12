
import { BodyMetric } from "@/types/workout";

export const loadBodyMetricsFromLocalStorage = (): BodyMetric[] => {
  try {
    const saved = localStorage.getItem("bodyMetrics");
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize with empty array if no data exists
    localStorage.setItem("bodyMetrics", JSON.stringify([]));
    return [];
  } catch (error) {
    console.error("Error loading body metrics from localStorage:", error);
    // Initialize with empty array if error
    localStorage.setItem("bodyMetrics", JSON.stringify([]));
    return [];
  }
};

export const updateBodyMetricsLocalStorage = (bodyMetrics: BodyMetric[]): void => {
  try {
    localStorage.setItem("bodyMetrics", JSON.stringify(bodyMetrics));
  } catch (error) {
    console.error("Error saving body metrics to localStorage:", error);
  }
};
