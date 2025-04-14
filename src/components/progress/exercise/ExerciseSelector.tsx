
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExerciseSelectorProps {
  exerciseOptions: string[];
  selectedExercise: string;
  setSelectedExercise: (exercise: string) => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  exerciseOptions,
  selectedExercise,
  setSelectedExercise
}) => {
  return (
    <div className="mb-6">
      <Select value={selectedExercise} onValueChange={setSelectedExercise}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an exercise" />
        </SelectTrigger>
        <SelectContent>
          {exerciseOptions.map((exercise) => (
            <SelectItem key={String(exercise)} value={String(exercise)}>
              {String(exercise)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExerciseSelector;
