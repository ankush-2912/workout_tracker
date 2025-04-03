
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface WorkoutFrequencyChartProps {
  workoutFrequencyData: Array<{ date: string; count: number }>;
  formatDate: (dateString: string) => string;
}

const WorkoutFrequencyChart: React.FC<WorkoutFrequencyChartProps> = ({ 
  workoutFrequencyData, 
  formatDate 
}) => {
  return (
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
  );
};

export default WorkoutFrequencyChart;
