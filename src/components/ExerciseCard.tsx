
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  Dumbbell, 
  ListChecks, 
  Target 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ExerciseCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  instructions: string[];
  image: string;
  targetMuscles: string[];
  expanded?: boolean;
}

const ExerciseCard = ({
  id,
  name,
  category,
  description,
  benefits,
  instructions,
  image,
  targetMuscles,
  expanded = false,
}: ExerciseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 card-shadow",
        isExpanded ? "bg-white" : "bg-gray-50 hover:bg-white"
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3">{category}</Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <span className="font-medium">Target Muscles:</span>
          <div className="flex flex-wrap gap-1">
            {targetMuscles.map((muscle) => (
              <Badge key={muscle} variant="outline">
                {muscle}
              </Badge>
            ))}
          </div>
        </div>
        
        {isExpanded && (
          <>
            <div>
              <div className="flex items-center mb-2">
                <Dumbbell className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">Benefits</h4>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700">{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <ListChecks className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">Instructions</h4>
              </div>
              <ol className="list-decimal pl-5 space-y-1">
                {instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">{instruction}</li>
                ))}
              </ol>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center pb-4">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Show More
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
