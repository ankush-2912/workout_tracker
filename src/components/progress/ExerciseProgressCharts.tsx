
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Dumbbell, LineChart as LineChartIcon, BarChart2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, 
  ResponsiveContainer, BarChart, Bar
} from "recharts";
import { formatTooltipValue } from "@/components/ProgressCharts";

interface ExerciseSet {
  weight: string;
  reps: string;
}

interface ExerciseData {
  name: string;
  sets: ExerciseSet[];
}

interface Workout {
  date: string;
  exercises: ExerciseData[];
}

interface ExerciseProgressPoint {
  date: string;
  maxWeight: number;
  totalVolume: number;
  sets: number;
}

interface ExerciseProgressChartsProps {
  exerciseOptions: string[];
  filteredWorkouts: Workout[];
  formatDate: (dateString: string) => string;
}

const ExerciseProgressCharts: React.FC<ExerciseProgressChartsProps> = ({ 
  exerciseOptions, 
  filteredWorkouts,
  formatDate 
}) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [volumeChartType, setVolumeChartType] = useState<"line" | "bar">("bar");
  
  const exerciseProgressData = React.useMemo(() => {
    if (!selectedExercise) return [];
    
    const exerciseData: ExerciseProgressPoint[] = [];
    
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
  
  return (
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
  );
};

export default ExerciseProgressCharts;
