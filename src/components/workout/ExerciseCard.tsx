
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Workout } from "@/types/workout";

interface ExerciseCardProps {
  exercise: Workout["exercises"][0];
  exerciseIndex: number;
  currentWorkout: Workout;
  setCurrentWorkout: React.Dispatch<React.SetStateAction<Workout>>;
}

const ExerciseCard = ({ 
  exercise, 
  exerciseIndex, 
  currentWorkout, 
  setCurrentWorkout 
}: ExerciseCardProps) => {
  
  const addSet = (exerciseIndex: number) => {
    const updatedExercises = [...currentWorkout.exercises];
    updatedExercises[exerciseIndex].sets.push({ weight: "", reps: "" });
    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises
    });
  };

  const updateExercise = (exerciseIndex: number, field: string, value: string) => {
    const updatedExercises = [...currentWorkout.exercises];
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      [field]: value
    };
    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises
    });
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: string, value: string) => {
    const updatedExercises = [...currentWorkout.exercises];
    updatedExercises[exerciseIndex].sets[setIndex] = {
      ...updatedExercises[exerciseIndex].sets[setIndex],
      [field]: value
    };
    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises
    });
  };

  const removeExercise = (exerciseIndex: number) => {
    const updatedExercises = currentWorkout.exercises.filter((_, index) => index !== exerciseIndex);
    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises.length ? updatedExercises : [{ name: "", sets: [{ weight: "", reps: "" }] }]
    });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...currentWorkout.exercises];
    updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.filter((_, index) => index !== setIndex);
    
    if (updatedExercises[exerciseIndex].sets.length === 0) {
      updatedExercises[exerciseIndex].sets = [{ weight: "", reps: "" }];
    }
    
    setCurrentWorkout({
      ...currentWorkout,
      exercises: updatedExercises
    });
  };
  
  return (
    <Card key={exerciseIndex} className="border border-muted">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <Label htmlFor={`exercise-${exerciseIndex}`}>Exercise {exerciseIndex + 1}</Label>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => removeExercise(exerciseIndex)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
        <Input
          id={`exercise-${exerciseIndex}`}
          placeholder="Exercise name"
          value={exercise.name}
          onChange={(e) => updateExercise(exerciseIndex, "name", e.target.value)}
          className="mt-1"
        />
      </CardHeader>
      
      <CardContent className="space-y-4 pb-3">
        <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground mb-1">
          <div className="col-span-2">Set</div>
          <div className="col-span-4">Weight (kg)</div>
          <div className="col-span-4">Reps</div>
          <div className="col-span-2"></div>
        </div>
        
        {exercise.sets.map((set, setIndex) => (
          <div key={setIndex} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-2 text-sm font-medium">{setIndex + 1}</div>
            <div className="col-span-4">
              <Input
                type="number"
                placeholder="Weight"
                value={set.weight}
                onChange={(e) => updateSet(exerciseIndex, setIndex, "weight", e.target.value)}
                className="h-9"
              />
            </div>
            <div className="col-span-4">
              <Input
                type="number"
                placeholder="Reps"
                value={set.reps}
                onChange={(e) => updateSet(exerciseIndex, setIndex, "reps", e.target.value)}
                className="h-9"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSet(exerciseIndex, setIndex)}
                className="h-8 w-8 p-0"
                disabled={exercise.sets.length <= 1}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addSet(exerciseIndex)}
          className="w-full text-xs"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Set
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
