
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ExerciseSelector from "./ExerciseSelector";
import WeightProgressChart from "./WeightProgressChart";
import VolumeProgressChart from "./VolumeProgressChart";
import { useExerciseProgressData } from "@/hooks/useExerciseProgressData";

interface ExerciseProgressChartsProps {
  exerciseOptions: string[];
  filteredWorkouts: any[];
  formatDate: (dateString: string) => string;
}

const ExerciseProgressCharts: React.FC<ExerciseProgressChartsProps> = ({ 
  exerciseOptions, 
  filteredWorkouts,
  formatDate 
}) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [weightChartType, setWeightChartType] = useState<"line" | "bar">("line");
  const [volumeChartType, setVolumeChartType] = useState<"line" | "bar">("bar");
  
  const exerciseProgressData = useExerciseProgressData(filteredWorkouts, selectedExercise);
  
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
        <ExerciseSelector 
          exerciseOptions={exerciseOptions}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />

        {selectedExercise ? (
          exerciseProgressData.length > 0 ? (
            <div className="space-y-8">
              <WeightProgressChart 
                exerciseProgressData={exerciseProgressData}
                chartType={weightChartType}
                setChartType={setWeightChartType}
                formatDate={formatDate}
              />
              
              <VolumeProgressChart
                exerciseProgressData={exerciseProgressData}
                chartType={volumeChartType}
                setChartType={setVolumeChartType}
                formatDate={formatDate}
              />
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
