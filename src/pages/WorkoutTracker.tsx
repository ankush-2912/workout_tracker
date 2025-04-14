
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import WorkoutHistory from "@/components/WorkoutHistory";
import { useWorkoutData } from "@/hooks/useWorkoutData";
import { useAuth } from "@/contexts/AuthContext";
import WorkoutForm from "@/components/workout/WorkoutForm";
import WorkoutHeader from "@/components/workout/WorkoutHeader";

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
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow">
        <WorkoutHeader isAuthenticated={isAuthenticated} />
        
        <div className="section-container py-8 bg-black">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900 hover:bg-slate-800 transition-colors duration-300">
              <TabsTrigger 
                value="record" 
                className="text-lg py-3 hover:bg-violet-900/30 transition-colors duration-300 data-[state=active]:bg-violet-900/50"
              >
                Record Workout
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="text-lg py-3 hover:bg-violet-900/30 transition-colors duration-300 data-[state=active]:bg-violet-900/50"
              >
                Workout History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent 
              value="record" 
              className="space-y-6 group hover:bg-slate-900/50 hover:backdrop-blur-sm transition-all duration-300 rounded-lg p-2"
            >
              <WorkoutForm
                currentWorkout={currentWorkout}
                setCurrentWorkout={setCurrentWorkout}
                saveWorkout={saveWorkout}
              />
            </TabsContent>
            
            <TabsContent 
              value="history" 
              className="group hover:bg-slate-900/50 hover:backdrop-blur-sm transition-all duration-300 rounded-lg p-2"
            >
              <WorkoutHistory 
                workouts={workouts} 
                onEdit={editWorkout} 
                onDelete={handleDeleteWorkout} 
                className="hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-shadow duration-300"
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
