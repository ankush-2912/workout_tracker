
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
  age: z.coerce.number().min(18, { message: "Age must be at least 18" }).max(100, { message: "Age must be at most 100" }),
  gender: z.enum(["male", "female"]),
  weight: z.coerce.number().min(40, { message: "Weight must be at least 40kg" }).max(200, { message: "Weight must be at most 200kg" }),
  height: z.coerce.number().min(140, { message: "Height must be at least 140cm" }).max(220, { message: "Height must be at most 220cm" }),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very-active"]),
});

type FormValues = z.infer<typeof formSchema>;

const activityLevels = [
  { value: "sedentary", label: "Sedentary (little or no exercise)" },
  { value: "light", label: "Light (exercise 1-3 days/week)" },
  { value: "moderate", label: "Moderate (exercise 3-5 days/week)" },
  { value: "active", label: "Active (exercise 6-7 days/week)" },
  { value: "very-active", label: "Very Active (exercise & physical job)" },
];

const CalorieCalculator = () => {
  const [results, setResults] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      gender: "male",
      weight: undefined,
      height: undefined,
      activityLevel: "moderate",
    },
  });

  const calculateCalories = (data: FormValues) => {
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr = 0;
    if (data.gender === "male") {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }

    // Activity multiplier
    let activityMultiplier = 1.2; // sedentary
    
    switch (data.activityLevel) {
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      case "very-active":
        activityMultiplier = 1.9;
        break;
    }

    const maintenance = Math.round(bmr * activityMultiplier);
    const weightLoss = Math.round(maintenance - 500); // 500 calorie deficit
    const weightGain = Math.round(maintenance + 500); // 500 calorie surplus

    setResults({
      bmr: Math.round(bmr),
      maintenance,
      weightLoss,
      weightGain,
    });

    toast.success("Calorie calculation complete!");
  };

  const onSubmit = (data: FormValues) => {
    calculateCalories(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl">Daily Calorie Calculator</CardTitle>
          <CardDescription className="text-primary-foreground">
            Calculate your daily calorie needs based on your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Kilograms" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Centimeters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Activity Level</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activityLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <Button type="submit" className="w-full">
                  Calculate
                </Button>
              </div>
            </form>
          </Form>
          
          {results && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Your Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <p className="text-sm text-gray-500">Your BMR</p>
                  <p className="text-2xl font-bold text-primary">
                    {results.bmr} <span className="text-sm font-normal">calories</span>
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <p className="text-sm text-gray-500">Maintenance</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {results.maintenance} <span className="text-sm font-normal">calories</span>
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <p className="text-sm text-gray-500">Weight Loss</p>
                  <p className="text-2xl font-bold text-secondary">
                    {results.weightLoss} <span className="text-sm font-normal">calories</span>
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <p className="text-sm text-gray-500">Weight Gain</p>
                  <p className="text-2xl font-bold text-accent">
                    {results.weightGain} <span className="text-sm font-normal">calories</span>
                  </p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p className="mb-1"><strong>BMR:</strong> Basal Metabolic Rate - calories your body needs at complete rest</p>
                <p className="mb-1"><strong>Maintenance:</strong> Calories to maintain your current weight</p>
                <p className="mb-1"><strong>Weight Loss:</strong> Suggested calories for safe weight loss (0.5kg/week)</p>
                <p><strong>Weight Gain:</strong> Suggested calories for muscle gain (0.5kg/week)</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalorieCalculator;
