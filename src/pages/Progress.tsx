import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ReferenceLine,
  ResponsiveContainer, BarChart, Bar, Cell, Area, AreaChart, ComposedChart
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLine, ChartBar, formatTooltipValue } from "@/components/ProgressCharts";
import { 
  ChevronLeft, ChevronRight, Calendar, BarChart2, LineChart as LineChartIcon, 
  Dumbbell, Weight, Activity, TrendingUp, Zap
} from "lucide-react";

const generateRandomWorkouts = (count = 30) => {
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

const generateRandomBodyMetrics = (workouts) => {
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

const ProgressPage = () => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    const parsedSaved = saved ? JSON.parse(saved) : [];
    return parsedSaved.length > 0 ? parsedSaved : generateRandomWorkouts(30);
  });
  
  useEffect(() => {
    if (!localStorage.getItem("workouts") || JSON.parse(localStorage.getItem("workouts") || "[]").length === 0) {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }
  }, [workouts]);
  
  const [bodyMetrics, setBodyMetrics] = useState(() => generateRandomBodyMetrics(workouts));
  const [selectedExercise, setSelectedExercise] = useState("");
  const [timeRange, setTimeRange] = useState("all"); // all, month, week
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [volumeChartType, setVolumeChartType] = useState<"line" | "bar">("bar");
  
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
  
  const exerciseProgressData = useMemo(() => {
    if (!selectedExercise) return [];
    
    const exerciseData = [];
    
    filteredWorkouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        if (exercise.name.toLowerCase() === selectedExercise.toLowerCase()) {
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
    
    return exerciseData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredWorkouts, selectedExercise]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-violet-400" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-violet-300 mb-2">{progressMetrics.currentStreak}</div>
                  <Progress value={progressMetrics.currentStreak / (progressMetrics.bestStreak || 1) * 100} className="h-2 bg-slate-700" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Best: {progressMetrics.bestStreak} days
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-violet-400" />
                  Weekly Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-violet-300 mb-2">
                    {progressMetrics.workoutsPerWeek.toFixed(1)}
                  </div>
                  <Progress value={progressMetrics.workoutsPerWeek / 7 * 100} className="h-2 bg-slate-700" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Workouts per week
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-violet-400" />
                  Total Workouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-violet-300 mb-2">{progressMetrics.totalWorkouts}</div>
                  <Progress value={Math.min(progressMetrics.totalWorkouts / 100 * 100, 100)} className="h-2 bg-slate-700" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Goal: 100 workouts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
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
                  <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-violet-400" />
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
                                      <p className="text-foreground font-medium">
                                        {payload[0] && payload[0].payload && 
                                         new Date(payload[0].payload.date as string).toLocaleDateString()}
                                      </p>
                                      <p className="text-primary">
                                        {`Workouts: ${payload[0] && payload[0].value}`}
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Bar dataKey="count" fill="#9b87f5" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="body" className="space-y-6">
              <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="h-5 w-5 text-violet-400" />
                    Body Weight Trend
                  </CardTitle>
                  <CardDescription>Track your weight changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredBodyMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border rounded-md shadow-md p-2">
                                  <p className="text-foreground font-medium">
                                    {payload[0] && payload[0].payload && 
                                     new Date(payload[0].payload.date as string).toLocaleDateString()}
                                  </p>
                                  <p className="text-primary">
                                    {`Weight: ${formatTooltipValue(payload[0] && payload[0].value)} kg`}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#9b87f5" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-medium mb-2 flex items-center gap-1">
                      <LineChartIcon className="h-4 w-4 text-violet-400" /> Body Composition
                    </h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={filteredBodyMetrics}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tickFormatter={formatDate} />
                          <YAxis />
                          <Tooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-background border rounded-md shadow-md p-2">
                                    <p className="text-foreground font-medium">
                                      {payload[0] && payload[0].payload && 
                                       new Date(payload[0].payload.date as string).toLocaleDateString()}
                                    </p>
                                    {payload.map((entry, index) => (
                                      <p key={index} style={{ color: entry.color }}>
                                        {`${entry.name}: ${formatTooltipValue(entry.value)}%`}
                                      </p>
                                    ))}
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="bodyFat" 
                            name="Body Fat"
                            stackId="1" 
                            stroke="#D946EF" 
                            fill="#D946EF80" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="muscleMass" 
                            name="Muscle Mass"
                            stackId="2" 
                            stroke="#8B5CF6" 
                            fill="#8B5CF680" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-6">
              <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-violet-400" />
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
                          <SelectItem key={String(exercise)} value={String(exercise)}>
                            {String(exercise)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedExercise && (
                    <div className="mb-4 flex items-center justify-end space-x-2">
                      <span className="text-sm text-muted-foreground mr-2">Chart Type:</span>
                      <Button 
                        size="sm" 
                        variant={chartType === "line" ? "default" : "outline"} 
                        onClick={() => setChartType("line")}
                        className="h-8 gap-1"
                      >
                        <LineChartIcon className="h-4 w-4" />
                        Line
                      </Button>
                      <Button 
                        size="sm" 
                        variant={chartType === "bar" ? "default" : "outline"} 
                        onClick={() => setChartType("bar")}
                        className="h-8 gap-1"
                      >
                        <BarChart2 className="h-4 w-4" />
                        Bar
                      </Button>
                    </div>
                  )}
                  
                  {selectedExercise ? (
                    exerciseProgressData.length > 0 ? (
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-1">
                            <LineChartIcon className="h-4 w-4 text-violet-400" /> Max Weight Progress
                          </h4>
                          <div className="h-[250px] w-full bg-slate-900 rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                              {chartType === "line" ? (
                                <LineChart data={exerciseProgressData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                  <XAxis dataKey="date" tickFormatter={formatDate} />
                                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                                  <Tooltip
                                    content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                        return (
                                          <div className="bg-background border rounded-md shadow-md p-2">
                                            <p className="text-foreground font-medium">
                                              {payload[0] && payload[0].payload && 
                                               new Date(payload[0].payload.date as string).toLocaleDateString()}
                                            </p>
                                            <p className="text-primary">
                                              {`Max Weight: ${formatTooltipValue(payload[0] && payload[0].value)} kg`}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                              {`Sets: ${payload[0] && payload[0].payload && payload[0].payload.sets}`}
                                            </p>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }}
                                  />
                                  <Line 
                                    type="monotone" 
                                    dataKey="maxWeight" 
                                    stroke="#9b87f5" 
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                  />
                                </LineChart>
                              ) : (
                                <BarChart data={exerciseProgressData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                  <XAxis dataKey="date" tickFormatter={formatDate} />
                                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                                  <Tooltip
                                    content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                        return (
                                          <div className="bg-background border rounded-md shadow-md p-2">
                                            <p className="text-foreground font-medium">
                                              {payload[0] && payload[0].payload && 
                                               new Date(payload[0].payload.date as string).toLocaleDateString()}
                                            </p>
                                            <p className="text-primary">
                                              {`Max Weight: ${formatTooltipValue(payload[0] && payload[0].value)} kg`}
                                            </p>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }}
                                  />
                                  <Bar dataKey="maxWeight" fill="#9b87f5" />
                                </BarChart>
                              )}
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-1 justify-between">
                            <div className="flex items-center gap-1">
                              <BarChart2 className="h-4 w-4 text-violet-400" /> 
                              Total Volume (Weight × Reps)
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm"
                                variant={volumeChartType === "bar" ? "default" : "outline"}
                                onClick={() => setVolumeChartType("bar")}
                                className="h-7 px-2 text-xs"
                              >
                                <BarChart2 className="h-3 w-3 mr-1" />
                                Bar
                              </Button>
                              <Button 
                                size="sm"
                                variant={volumeChartType === "line" ? "default" : "outline"}
                                onClick={() => setVolumeChartType("line")}
                                className="h-7 px-2 text-xs"
                              >
                                <LineChartIcon className="h-3 w-3 mr-1" />
                                Line
                              </Button>
                            </div>
                          </h4>
                          <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              {volumeChartType === "bar" ? (
                                <BarChart data={exerciseProgressData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="date" tickFormatter={formatDate} />
                                  <YAxis />
                                  <Tooltip
                                    content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                        return (
                                          <div className="bg-background border rounded-md shadow-md p-2">
                                            <p className="text-foreground font-medium">
                                              {payload[0] && payload[0].payload && 
                                               new Date(payload[0].payload.date as string).toLocaleDateString()}
                                            </p>
                                            <p className="text-primary">
                                              {`Total Volume: ${formatTooltipValue(payload[0] && payload[0].value)} kg`}
                                            </p>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }}
                                  />
                                  <Bar dataKey="totalVolume" fill="#9b87f5" />
                                </BarChart>
                              ) : (
                                <LineChart data={exerciseProgressData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="date" tickFormatter={formatDate} />
                                  <YAxis />
                                  <Tooltip
                                    content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                        return (
                                          <div className="bg-background border rounded-md shadow-md p-2">
                                            <p className="text-foreground font-medium">
                                              {payload[0] && payload[0].payload && 
                                               new Date(payload[0].payload.date as string).toLocaleDateString()}
                                            </p>
                                            <p className="text-primary">
                                              {`Total Volume: ${formatTooltipValue(payload[0] && payload[0].value)} kg`}
                                            </p>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }}
                                  />
                                  <Line 
                                    type="monotone" 
                                    dataKey="totalVolume" 
                                    stroke="#9b87f5" 
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                  />
                                </LineChart>
                              )}
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

export default ProgressPage;
