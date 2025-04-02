
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line,
  ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLine, ChartBar } from "@/components/ProgressCharts";
import { ChevronLeft, ChevronRight, Calendar, BarChart2, LineChart as LineChartIcon, Dumbbell, Weight } from "lucide-react";

const Progress = () => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedExercise, setSelectedExercise] = useState("");
  const [timeRange, setTimeRange] = useState("all"); // all, month, week
  
  // Create a list of all unique exercises
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

  // Generate data for body weight chart (assuming you might add this feature later)
  const bodyWeightData = useMemo(() => {
    // For now, we'll generate mock data - this would be replaced with real body weight data
    // In a real implementation, this would come from a separate bodyWeight state/storage
    return workouts.map((workout, index) => ({
      date: workout.date,
      weight: 70 + Math.random() * 5 // Just placeholder mock data
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [workouts]);
  
  // Generate data for the selected exercise
  const exerciseProgressData = useMemo(() => {
    if (!selectedExercise) return [];
    
    const exerciseData = [];
    
    filteredWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        if (exercise.name.toLowerCase() === selectedExercise.toLowerCase()) {
          // Find the highest weight for this exercise in this workout
          let maxWeight = 0;
          let totalVolume = 0;
          
          exercise.sets.forEach(set => {
            const weight = parseFloat(set.weight) || 0;
            const reps = parseInt(set.reps) || 0;
            
            if (weight > maxWeight) {
              maxWeight = weight;
            }
            
            totalVolume += weight * reps;
          });
          
          if (maxWeight > 0) {
            exerciseData.push({
              date: workout.date,
              maxWeight,
              totalVolume,
              sets: exercise.sets.length
            });
          }
        }
      });
    });
    
    // Sort by date
    return exerciseData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredWorkouts, selectedExercise]);
  
  // Generate workout frequency data
  const workoutFrequencyData = useMemo(() => {
    if (!filteredWorkouts.length) return [];
    
    // Create a map of dates to workout counts
    const dateMap = {};
    filteredWorkouts.forEach(workout => {
      const date = workout.date;
      dateMap[date] = (dateMap[date] || 0) + 1;
    });
    
    // Convert to array and sort by date
    return Object.entries(dateMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredWorkouts]);

  // Format date for axis
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
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
                <Card className="border-2 border-muted shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle>No Workout Data</CardTitle>
                    <CardDescription>
                      Start tracking your workouts to see progress over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-6">
                    <Button asChild>
                      <a href="/workout-tracker">Record a Workout</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card className="border-2 border-muted shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Workout Frequency
                      </CardTitle>
                      <CardDescription>How consistently you've been training</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={workoutFrequencyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="date" 
                              tickFormatter={formatDate}
                            />
                            <YAxis />
                            <Tooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-background border rounded-md shadow-md p-2">
                                      <p className="text-foreground font-medium">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                                      <p className="text-primary">{`Workouts: ${payload[0].value}`}</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Bar dataKey="count" fill="#6366f1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="body" className="space-y-6">
              <Card className="border-2 border-muted shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="h-5 w-5 text-primary" />
                    Body Weight Trend
                  </CardTitle>
                  <CardDescription>Track your weight changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={bodyWeightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border rounded-md shadow-md p-2">
                                  <p className="text-foreground font-medium">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                                  <p className="text-primary">{`Weight: ${payload[0].value.toFixed(1)} kg`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#6366f1" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    Note: This is currently showing sample data. Add your weight tracking to see actual results.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-6">
              <Card className="border-2 border-muted shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-primary" />
                    Exercise Progress
                  </CardTitle>
                  <CardDescription>Track your strength gains for specific exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an exercise" />
                      </SelectTrigger>
                      <SelectContent>
                        {exerciseOptions.map((exercise) => (
                          <SelectItem key={exercise} value={exercise}>
                            {exercise}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedExercise ? (
                    exerciseProgressData.length > 0 ? (
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-1">
                            <LineChartIcon className="h-4 w-4" /> Max Weight Progress
                          </h4>
                          <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={exerciseProgressData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" tickFormatter={formatDate} />
                                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-background border rounded-md shadow-md p-2">
                                          <p className="text-foreground font-medium">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                                          <p className="text-primary">{`Max Weight: ${payload[0].value} kg`}</p>
                                          <p className="text-muted-foreground text-xs">{`Sets: ${payload[0].payload.sets}`}</p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="maxWeight" 
                                  stroke="#6366f1" 
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-1">
                            <BarChart2 className="h-4 w-4" /> Total Volume (Weight × Reps)
                          </h4>
                          <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={exerciseProgressData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" tickFormatter={formatDate} />
                                <YAxis />
                                <Tooltip
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-background border rounded-md shadow-md p-2">
                                          <p className="text-foreground font-medium">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                                          <p className="text-primary">{`Total Volume: ${payload[0].value} kg`}</p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                <Bar dataKey="totalVolume" fill="#6366f1" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        No data available for {selectedExercise}. Add more workout data to see progress.
                      </div>
                    )
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Select an exercise to view your progress over time
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Progress;
