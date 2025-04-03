
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NoWorkoutData: React.FC = () => {
  return (
    <Card className="border-2 border-muted shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>No Workout Data</CardTitle>
        <CardDescription>
          Start tracking your workouts to see progress over time
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-6">
        <Button asChild>
          <a href="/workout-tracker">Record a Workout</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoWorkoutData;
