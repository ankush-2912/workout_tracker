
import React from "react";
import { Line, Bar } from "recharts";
import { cn } from "@/lib/utils";

// TypeScript interfaces for props
interface ChartLineProps {
  dataKey: string;
  stroke?: string;
  activeDot?: boolean | object;
  dot?: boolean | object;
  strokeWidth?: number;
  className?: string;
}

interface ChartBarProps {
  dataKey: string;
  fill?: string;
  radius?: number | [number, number, number, number];
  className?: string;
}

// Line chart component
export const ChartLine = ({
  dataKey,
  stroke = "#6366f1",
  activeDot = { r: 6 },
  dot = { r: 4 },
  strokeWidth = 2,
  className,
}: ChartLineProps) => (
  <Line
    type="monotone"
    dataKey={dataKey}
    stroke={stroke}
    activeDot={activeDot}
    dot={dot}
    strokeWidth={strokeWidth}
    className={cn("", className)}
  />
);

// Bar chart component
export const ChartBar = ({
  dataKey,
  fill = "#6366f1",
  radius = [4, 4, 0, 0],
  className,
}: ChartBarProps) => (
  <Bar
    dataKey={dataKey}
    fill={fill}
    radius={radius}
    className={cn("", className)}
  />
);

// Helper function to format tooltips
export const formatTooltipValue = (value: any): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'number') return value.toFixed(1);
  return String(value);
};
