
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, Trash2, Calendar, Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkoutHistory from "@/components/WorkoutHistory";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { useAuth } from "@/contexts/AuthContext";

const WorkoutTracker = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const { 
    workouts, 
    currentWorkout, 
    setCurrentWorkout, 
    saveWorkout, 
    deleteWorkout 
  } = useWorkoutData();
  
  const [activeTab, setActiveTab] = useState("record");

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
        description: isAuthenticated 
          ? "Your workout has been saved to your account" 
          : "Your workout has been saved locally",
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

  const handleDeleteWorkout = async (id: string) => {
    const result = await deleteWorkout(id);
    
    if (result.success) {
      toast({
        title: "Workout deleted",
        description: "The workout has been removed from your history",
      });
    }
  };

  const editWorkout = (workout: any) => {
    setCurrentWorkout(workout);
    setActiveTab("record");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="section-container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Workout Tracker</h1>
              <p className="text-white/90 text-lg">
                Track your workouts, monitor your progress, and push your limits
              </p>
              {!isAuthenticated && (
                <div className="mt-4 bg-indigo-900/50 rounded-md p-3 text-sm">
                  <p className="text-white/80">
                    You're not logged in. Your workouts will be saved locally in this browser.
                    <Button asChild variant="link" className="text-white underline ml-2 p-0 h-auto">
                      <a href="/auth">Login</a>
                    </Button>
                    to save your workouts to your account.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="section-container py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="record" className="text-lg py-3">Record Workout</TabsTrigger>
              <TabsTrigger value="history" className="text-lg py-3">Workout History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="record" className="space-y-6">
              <Card className="border-2 border-muted shadow-lg">
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
            </TabsContent>
            
            <TabsContent value="history">
              <WorkoutHistory 
                workouts={workouts} 
                onEdit={editWorkout} 
                onDelete={handleDeleteWorkout} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutTracker;
