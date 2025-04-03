
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Zap } from "lucide-react";

interface ProgressMetrics {
  currentStreak: number;
  bestStreak: number;
  totalWorkouts: number;
}

interface MetricsCardsProps {
  progressMetrics: ProgressMetrics;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ progressMetrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-400" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-violet-300 mb-2">{progressMetrics.currentStreak}</div>
            <Progress value={progressMetrics.currentStreak / (progressMetrics.bestStreak || 1) * 100} className="h-2 bg-slate-700" />
            <p className="text-sm text-muted-foreground mt-2">
              Best: {progressMetrics.bestStreak} days
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-violet-400" />
            Total Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-violet-300 mb-2">{progressMetrics.totalWorkouts}</div>
            <Progress value={Math.min(progressMetrics.totalWorkouts / 100 * 100, 100)} className="h-2 bg-slate-700" />
            <p className="text-sm text-muted-foreground mt-2">
              Goal: 100 workouts
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
