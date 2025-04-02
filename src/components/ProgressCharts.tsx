
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

interface CandleProps {
  dataKey: string;
  upColor?: string;
  downColor?: string;
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

// Prepare candlestick data from exercise progress
export const prepareCandleData = (exerciseData: any[], dateField = 'date') => {
  if (!exerciseData || exerciseData.length === 0) return [];
  
  return exerciseData.map(item => {
    // Generate mock high/low values based on maxWeight
    // In a real app, you would use actual high/low values from your data
    const open = item.maxWeight * 0.95;
    const close = item.maxWeight * 1.03;
    const high = Math.max(open, close) * 1.05;
    const low = Math.min(open, close) * 0.93;
    
    return {
      date: item.date,
      open,
      high,
      low,
      close,
      increasing: close > open, // Determines color
      displayWeight: item.maxWeight // Keep original value for display
    };
  });
};
