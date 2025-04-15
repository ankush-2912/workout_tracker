
import React from "react";
import { BarChart2, LineChart as LineChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, 
  ResponsiveContainer, BarChart, Bar
} from "recharts";
import { ChartTooltipContent } from "@/components/progress/exercise/ChartTooltipContent";

interface WeightProgressChartProps {
  exerciseProgressData: any[];
  chartType: "line" | "bar";
  setChartType: (type: "line" | "bar") => void;
  formatDate: (dateString: string) => string;
}

const WeightProgressChart: React.FC<WeightProgressChartProps> = ({
  exerciseProgressData,
  chartType,
  setChartType,
  formatDate
}) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-medium flex items-center gap-1">
          <LineChartIcon className="h-4 w-4 text-violet-400" /> Max Weight Progress
        </h4>
        <div className="flex items-center">
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
      </div>
      
      <div className="h-[250px] w-full bg-slate-900 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={exerciseProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip
                content={(props) => <ChartTooltipContent {...props} label="Max Weight" unit="kg" showSets />}
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
                content={(props) => <ChartTooltipContent {...props} label="Max Weight" unit="kg" />}
              />
              <Bar dataKey="maxWeight" fill="#9b87f5" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeightProgressChart;
