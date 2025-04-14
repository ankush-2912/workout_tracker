
import { useMemo } from "react";
import { BodyMetric } from "@/types/workout";

export const useProgressMetrics = (workouts: any[], bodyMetrics: BodyMetric[], timeRange: string) => {
  // Calculate progress metrics (streaks and totals)
  const progressMetrics = useMemo(() => {
    const sortedWorkouts = [...workouts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let currentStreak = 0;
    let bestStreak = 0;
    
    if (sortedWorkouts.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const latestWorkoutDate = new Date(sortedWorkouts[0].date);
      latestWorkoutDate.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today.getTime() - latestWorkoutDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        currentStreak = 1;
        
        for (let i = 1; i < sortedWorkouts.length; i++) {
          const currentDate = new Date(sortedWorkouts[i-1].date);
          const prevDate = new Date(sortedWorkouts[i].date);
          
          currentDate.setHours(0, 0, 0, 0);
          prevDate.setHours(0, 0, 0, 0);
          
          const timeDiff = Math.abs(currentDate.getTime() - prevDate.getTime());
          const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          
          if (dayDiff === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
      
      let tempStreak = 1;
      for (let i = 1; i < sortedWorkouts.length; i++) {
        const currentDate = new Date(sortedWorkouts[i-1].date);
        const prevDate = new Date(sortedWorkouts[i].date);
        
        currentDate.setHours(0, 0, 0, 0);
        prevDate.setHours(0, 0, 0, 0);
        
        const timeDiff = Math.abs(currentDate.getTime() - prevDate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          tempStreak++;
        } else {
          if (tempStreak > bestStreak) {
            bestStreak = tempStreak;
          }
          tempStreak = 1;
        }
      }
      
      if (tempStreak > bestStreak) {
        bestStreak = tempStreak;
      }
      
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    }
    
    return {
      currentStreak: currentStreak,
      bestStreak: bestStreak || currentStreak,
      totalWorkouts: workouts.length
    };
  }, [workouts]);

  // Calculate workout frequency data for charts
  const workoutFrequencyData = useMemo(() => {
    const dateMap = new Map();
    
    let startDate = new Date();
    let endDate = new Date();
    
    if (timeRange === "week") {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeRange === "month") {
      startDate.setDate(startDate.getDate() - 30);
    } else {
      if (workouts.length > 0) {
        const dates = workouts.map(w => new Date(w.date).getTime());
        startDate = new Date(Math.min(...dates));
      } else {
        startDate.setDate(startDate.getDate() - 30);
      }
    }
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      dateMap.set(dateString, 0);
    }
    
    workouts.forEach(workout => {
      const dateString = workout.date;
      if (dateMap.has(dateString)) {
        dateMap.set(dateString, dateMap.get(dateString) + 1);
      }
    });
    
    return Array.from(dateMap, ([date, count]) => ({ date, count }));
  }, [workouts, timeRange]);

  // Extract unique exercise options from workouts
  const exerciseOptions = useMemo(() => {
    const exerciseSet = new Set();
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        if (exercise.name) {
          exerciseSet.add(exercise.name.toLowerCase());
        }
      });
    });
    return Array.from(exerciseSet).sort();
  }, [workouts]);

  // Filter workouts based on time range
  const filteredWorkouts = useMemo(() => {
    if (timeRange === "all") return workouts;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    }
    
    return workouts.filter(workout => new Date(workout.date) >= cutoffDate);
  }, [workouts, timeRange]);

  // Filter body metrics based on time range
  const filteredBodyMetrics = useMemo(() => {
    if (timeRange === "all") return bodyMetrics;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    if (timeRange === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else if (timeRange === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    }
    
    return bodyMetrics.filter(metric => new Date(metric.date) >= cutoffDate);
  }, [bodyMetrics, timeRange]);

  return {
    progressMetrics,
    workoutFrequencyData,
    exerciseOptions,
    filteredWorkouts,
    filteredBodyMetrics
  };
};
