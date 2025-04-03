
// Utility functions for generating workout data

export const generateRandomWorkouts = (count = 30) => {
  const workouts = [];
  const exercises = ["Bench Press", "Squat", "Deadlift", "Overhead Press", "Pull-ups", "Bicep Curls"];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(now.getDate() - (count - i));
    
    const exerciseList = [];
    const exerciseCount = Math.floor(Math.random() * 3) + 2; // 2-4 exercises per workout
    
    const selectedExercises = [...exercises].sort(() => Math.random() - 0.5).slice(0, exerciseCount);
    
    selectedExercises.forEach(exerciseName => {
      const sets = [];
      const setCount = Math.floor(Math.random() * 3) + 3; // 3-5 sets
      
      for (let s = 0; s < setCount; s++) {
        const baseWeight = exerciseName === "Bench Press" ? 100 : 
                          exerciseName === "Squat" ? 150 : 
                          exerciseName === "Deadlift" ? 200 : 
                          exerciseName === "Overhead Press" ? 80 : 
                          exerciseName === "Pull-ups" ? 20 : 60;
        
        const progressFactor = i / count; // 0 to almost 1
        const randomVariation = (Math.random() * 10) - 5; // -5 to +5
        const weight = Math.round(baseWeight * (1 + (progressFactor * 0.2)) + randomVariation);
        
        sets.push({
          weight: String(weight),
          reps: String(Math.floor(Math.random() * 5) + 6) // 6-10 reps
        });
      }
      
      exerciseList.push({
        name: exerciseName,
        sets: sets
      });
    });
    
    workouts.push({
      date: date.toISOString().split('T')[0],
      exercises: exerciseList
    });
  }
  
  return workouts;
};

export const generateRandomBodyMetrics = (workouts: any[]) => {
  if (!workouts || !workouts.length) return [];
  
  const sortedWorkouts = [...workouts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const startWeight = 85; // starting weight in kg
  const targetWeight = 80; // target weight in kg
  
  return sortedWorkouts.map((workout, index) => {
    const progress = index / (sortedWorkouts.length - 1); // 0 to 1
    const trendWeight = startWeight - (progress * (startWeight - targetWeight));
    const randomVariation = (Math.random() * 1.5) - 0.75; // -0.75 to +0.75 kg daily fluctuation
    
    return {
      date: workout.date,
      weight: parseFloat((trendWeight + randomVariation).toFixed(1)),
      bodyFat: parseFloat((20 - (progress * 3) + (Math.random() * 1) - 0.5).toFixed(1)),
      muscleMass: parseFloat((45 + (progress * 2) + (Math.random() * 0.8) - 0.4).toFixed(1))
    };
  });
};
