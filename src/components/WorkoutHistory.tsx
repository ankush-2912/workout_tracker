
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ChevronDown, ChevronUp, Calendar, Dumbbell } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface WorkoutHistoryProps {
  workouts: Array<{
    id: string;
    date: string;
    exercises: Array<{
      name: string;
      sets: Array<{
        weight: string;
        reps: string;
      }>;
    }>;
  }>;
  onEdit: (workout: any) => void;
  onDelete: (id: string) => void;
}

const WorkoutHistory = ({ workouts, onEdit, onDelete }: WorkoutHistoryProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleOpen = (id: string) => {
    setOpenItems(prevOpenItems =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter(item => item !== id)
        : [...prevOpenItems, id]
    );
  };

  if (workouts.length === 0) {
    return (
      <Card className="border-2 border-muted shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>No Workouts Yet</CardTitle>
          <CardDescription>Start by recording your first workout</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <div className="p-8 text-center text-muted-foreground">
            <Dumbbell className="mx-auto h-12 w-12 mb-3 text-muted" />
            <p>Your workout history will appear here once you start tracking</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="space-y-4">
      {sortedWorkouts.map((workout) => {
        const isOpen = openItems.includes(workout.id);
        const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        return (
          <Collapsible 
            key={workout.id} 
            open={isOpen} 
            onOpenChange={() => toggleOpen(workout.id)}
            className="border rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">{formattedDate}</h3>
                  <p className="text-sm text-muted-foreground">
                    {workout.exercises.length} {workout.exercises.length === 1 ? 'exercise' : 'exercises'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(workout);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Are you sure you want to delete this workout?")) {
                      onDelete(workout.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isOpen ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
            
            <CollapsibleContent>
              <div className="px-4 pb-4 pt-0">
                <div className="rounded-md bg-muted/50 p-4">
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="mb-4 last:mb-0">
                      <h4 className="font-medium mb-2">{exercise.name}</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm font-medium text-muted-foreground mb-1">
                        <div>Set</div>
                        <div>Weight (kg)</div>
                        <div>Reps</div>
                      </div>
                      {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex} className="grid grid-cols-3 gap-2 text-sm border-b border-border/40 py-1 last:border-0">
                          <div>{setIndex + 1}</div>
                          <div>{set.weight}</div>
                          <div>{set.reps}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default WorkoutHistory;
