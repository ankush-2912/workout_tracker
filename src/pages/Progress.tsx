
import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MetricsCards from "@/components/progress/MetricsCards";
import WorkoutFrequencyChart from "@/components/progress/WorkoutFrequencyChart";
import BodyMetricsCharts from "@/components/progress/BodyMetricsCharts";
import ExerciseProgressCharts from "@/components/progress/ExerciseProgressCharts";
import NoWorkoutData from "@/components/progress/NoWorkoutData";
import { useBodyMetrics } from "@/hooks/useBodyMetrics";
import { useToast } from "@/hooks/use-toast";

const ProgressPage = () => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    if (!localStorage.getItem("workouts")) {
      localStorage.setItem("workouts", JSON.stringify([]));
    }
  }, []);
  
  const { bodyMetrics, saveBodyMetric, deleteBodyMetric, loading: bodyMetricsLoading } = useBodyMetrics();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("all"); // all, month, week
  
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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handleAddBodyMetric = async (data: { date: string, weight: number }) => {
    try {
      const result = await saveBodyMetric({
        id: "",
        date: data.date,
        weight: data.weight
      });
      
      if (result.success) {
        toast({
          title: "Weight logged",
          description: "Your weight has been recorded successfully"
        });
      }
    } catch (error) {
      console.error("Error saving body metric:", error);
      toast({
        title: "Error",
        description: "Failed to save your weight measurement",
        variant: "destructive"
      });
    }
  };

  const handleDeleteBodyMetric = async (id: string) => {
    try {
      const result = await deleteBodyMetric(id);
      
      if (result.success) {
        toast({
          title: "Weight deleted",
          description: "Weight measurement has been removed"
        });
      }
    } catch (error) {
      console.error("Error deleting body metric:", error);
      toast({
        title: "Error",
        description: "Failed to delete weight measurement",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="section-container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Progress Tracking</h1>
              <p className="text-white/90 text-lg">
                Visualize your fitness journey and track your improvement over time
              </p>
            </div>
          </div>
        </div>
        
        <div className="section-container py-8">
          <MetricsCards progressMetrics={progressMetrics} />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="text-lg py-3">Overview</TabsTrigger>
              <TabsTrigger value="body" className="text-lg py-3">Body Metrics</TabsTrigger>
              <TabsTrigger value="exercises" className="text-lg py-3">Exercise Progress</TabsTrigger>
            </TabsList>
            
            <div className="mb-6 flex justify-end space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              {workouts.length === 0 ? (
                <NoWorkoutData />
              ) : (
                <WorkoutFrequencyChart 
                  workoutFrequencyData={workoutFrequencyData}
                  formatDate={formatDate}
                />
              )}
            </TabsContent>
            
            <TabsContent value="body" className="space-y-6">
              <BodyMetricsCharts 
                bodyMetrics={filteredBodyMetrics}
                formatDate={formatDate}
                onAddBodyMetric={handleAddBodyMetric}
                onDeleteBodyMetric={handleDeleteBodyMetric}
              />
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-6">
              <ExerciseProgressCharts 
                exerciseOptions={exerciseOptions as string[]}
                filteredWorkouts={filteredWorkouts}
                formatDate={formatDate}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProgressPage;
