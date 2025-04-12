
export type WorkoutSet = {
  weight: string;
  reps: string;
};

export type Exercise = {
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

export type BodyMetric = {
  id: string;
  date: string;
  weight: number;
  savedAt?: string;
  user_id?: string;
};
