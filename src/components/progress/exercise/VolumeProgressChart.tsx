
import React from "react";
import { BarChart2, LineChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, 
  ResponsiveContainer, BarChart, Bar
} from "recharts";
import { ChartTooltipContent } from "@/components/progress/exercise/ChartTooltipContent";

interface VolumeProgressChartProps {
  exerciseProgressData: any[];
  chartType: "line" | "bar";
  setChartType: (type: "line" | "bar") => void;
  formatDate: (dateString: string) => string;
}

const VolumeProgressChart: React.FC<VolumeProgressChartProps> = ({
  exerciseProgressData,
  chartType,
  setChartType,
  formatDate
}) => {
  return (
    <div>
      <h4 className="font-medium mb-2 flex items-center gap-1 justify-between">
        <div className="flex items-center gap-1">
          <BarChart2 className="h-4 w-4 text-violet-400" /> 
          Total Volume (Weight × Reps)
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            variant={chartType === "bar" ? "default" : "outline"}
            onClick={() => setChartType("bar")}
            className="h-7 px-2 text-xs"
          >
            <BarChart2 className="h-3 w-3 mr-1" />
            Bar
          </Button>
          <Button 
            size="sm"
            variant={chartType === "line" ? "default" : "outline"}
            onClick={() => setChartType("line")}
            className="h-7 px-2 text-xs"
          >
            <LineChartIcon className="h-3 w-3 mr-1" />
            Line
          </Button>
        </div>
      </h4>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={exerciseProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip
                content={(props) => <ChartTooltipContent {...props} label="Total Volume" unit="kg" />}
              />
              <Bar dataKey="totalVolume" fill="#9b87f5" />
            </BarChart>
          ) : (
            <LineChart data={exerciseProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip
                content={(props) => <ChartTooltipContent {...props} label="Total Volume" unit="kg" />}
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
  );
};

export default VolumeProgressChart;
