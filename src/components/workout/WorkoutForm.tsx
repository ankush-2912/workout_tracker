
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2, Calendar } from "lucide-react";
import { Workout } from "@/types/workout";
import { useToast } from "@/hooks/use-toast";
import ExerciseCard from "./ExerciseCard";

interface WorkoutFormProps {
  currentWorkout: Workout;
  setCurrentWorkout: React.Dispatch<React.SetStateAction<Workout>>;
  saveWorkout: (workout: Workout) => Promise<{ success: boolean, workout?: Workout, error?: any }>;
}

const WorkoutForm = ({ currentWorkout, setCurrentWorkout, saveWorkout }: WorkoutFormProps) => {
  const { toast } = useToast();
  
  const handleSaveWorkout = async () => {
    if (!currentWorkout.exercises[0].name) {
      toast({
        title: "Missing information",
        description: "Please add at least one exercise with details",
        variant: "destructive",
      });
      return;
    }
    
    const result = await saveWorkout(currentWorkout);
    
    if (result.success) {
      setCurrentWorkout({
        id: "",
        date: new Date().toISOString().split("T")[0],
        exercises: [{ name: "", sets: [{ weight: "", reps: "" }] }]
      });
      
      toast({
        title: "Success!",
        description: "Your workout has been saved",
      });
    }
  };

  const addExercise = () => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [
        ...currentWorkout.exercises,
        { name: "", sets: [{ weight: "", reps: "" }] }
      ]
    });
  };

  return (
    <Card className="border-2 border-muted shadow-lg hover:shadow-violet-900/50 hover:scale-[1.01] transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          {currentWorkout.id ? "Edit Workout" : "New Workout"}
        </CardTitle>
        <CardDescription>Record your exercises, sets, reps, and weights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="workout-date">Workout Date</Label>
            <Input 
              id="workout-date" 
              type="date" 
              value={currentWorkout.date}
              onChange={(e) => setCurrentWorkout({...currentWorkout, date: e.target.value})}
            />
          </div>
          
          <div className="space-y-6 mt-4">
            {currentWorkout.exercises.map((exercise, exerciseIndex) => (
              <ExerciseCard
                key={exerciseIndex}
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                currentWorkout={currentWorkout}
                setCurrentWorkout={setCurrentWorkout}
              />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button onClick={addExercise} className="w-full sm:w-auto" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Exercise
        </Button>
        <Button onClick={handleSaveWorkout} className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" /> {currentWorkout.id ? "Update Workout" : "Save Workout"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutForm;
