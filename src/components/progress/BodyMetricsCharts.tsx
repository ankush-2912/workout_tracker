
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Weight } from "lucide-react";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, 
  ResponsiveContainer
} from "recharts";
import { formatTooltipValue } from "@/components/ProgressCharts";

interface BodyMetric {
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
}

interface BodyMetricsChartsProps {
  filteredBodyMetrics: BodyMetric[];
  formatDate: (dateString: string) => string;
}

const BodyMetricsCharts: React.FC<BodyMetricsChartsProps> = ({ 
  filteredBodyMetrics,
  formatDate 
}) => {
  return (
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
      </CardContent>
    </Card>
  );
};

export default BodyMetricsCharts;
