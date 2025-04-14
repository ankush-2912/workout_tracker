
import React from "react";
import { formatTooltipValue } from "@/components/ProgressCharts";

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  unit?: string;
  showSets?: boolean;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ 
  active, 
  payload, 
  label,
  unit = "",
  showSets = false
}) => {
  if (active && payload && payload.length) {
    const date = payload[0].payload && new Date(payload[0].payload.date).toLocaleDateString();
    const value = formatTooltipValue(payload[0] && payload[0].value);
    const sets = showSets && payload[0].payload && payload[0].payload.sets;
    
    return (
      <div className="bg-background border rounded-md shadow-md p-2">
        <p className="text-foreground font-medium">{date}</p>
        <p className="text-primary">
          {`${label}: ${value} ${unit}`}
        </p>
        {showSets && (
          <p className="text-muted-foreground text-xs">
            {`Sets: ${sets}`}
          </p>
        )}
      </div>
    );
  }
  return null;
};
