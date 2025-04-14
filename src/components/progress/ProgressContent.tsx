
import React, { useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MetricsCards from "@/components/progress/MetricsCards";
import WorkoutFrequencyChart from "@/components/progress/WorkoutFrequencyChart";
import BodyMetricsCharts from "@/components/progress/BodyMetricsCharts";
import ExerciseProgressCharts from "@/components/progress/exercise/ExerciseProgressCharts";
import NoWorkoutData from "@/components/progress/NoWorkoutData";
import { useProgressMetrics } from "@/hooks/useProgressMetrics";
import { BodyMetric } from "@/types/workout";

interface ProgressContentProps {
  workouts: any[];
  bodyMetrics: BodyMetric[];
  timeRange: string;
  setTimeRange: (range: string) => void;
  onAddBodyMetric: (data: { date: string, weight: number }) => Promise<any>;
  onDeleteBodyMetric: (id: string) => Promise<any>;
}

const ProgressContent: React.FC<ProgressContentProps> = ({ 
  workouts,
  bodyMetrics,
  timeRange,
  setTimeRange,
  onAddBodyMetric,
  onDeleteBodyMetric
}) => {
  useEffect(() => {
    if (!localStorage.getItem("workouts")) {
      localStorage.setItem("workouts", JSON.stringify([]));
    }
  }, []);

  const { progressMetrics, workoutFrequencyData, exerciseOptions, filteredWorkouts, filteredBodyMetrics } = 
    useProgressMetrics(workouts, bodyMetrics, timeRange);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
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
            onAddBodyMetric={onAddBodyMetric}
            onDeleteBodyMetric={onDeleteBodyMetric}
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
  );
};

export default ProgressContent;
