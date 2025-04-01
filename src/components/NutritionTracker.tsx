
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Plus, Trash2, CircleOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  date: string;
}

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f97316'];

const NutritionTracker = () => {
  const { toast } = useToast();
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem("foodItems");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newItem, setNewItem] = useState({
    name: "",
    calories: "",
    protein: "",
  });
  
  const [calorieGoal, setCalorieGoal] = useState(() => {
    const saved = localStorage.getItem("calorieGoal");
    return saved ? JSON.parse(saved) : 2000;
  });
  
  const [proteinGoal, setProteinGoal] = useState(() => {
    const saved = localStorage.getItem("proteinGoal");
    return saved ? JSON.parse(saved) : 150;
  });

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem("calorieGoal", JSON.stringify(calorieGoal));
  }, [calorieGoal]);

  useEffect(() => {
    localStorage.setItem("proteinGoal", JSON.stringify(proteinGoal));
  }, [proteinGoal]);

  const addFoodItem = () => {
    if (!newItem.name || !newItem.calories || !newItem.protein) {
      toast({
        title: "Missing information",
        description: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }

    const item: FoodItem = {
      id: Date.now().toString(),
      name: newItem.name,
      calories: Number(newItem.calories),
      protein: Number(newItem.protein),
      date: selectedDate,
    };

    setFoodItems([...foodItems, item]);
    setNewItem({ name: "", calories: "", protein: "" });
    
    toast({
      title: "Food added",
      description: `${item.name} has been added to your log`,
    });
  };

  const removeFoodItem = (id: string) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  const filteredItems = foodItems.filter((item) => item.date === selectedDate);
  const totalCalories = filteredItems.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = filteredItems.reduce((sum, item) => sum + item.protein, 0);
  
  const caloriesRemaining = calorieGoal - totalCalories;
  const proteinRemaining = proteinGoal - totalProtein;

  const pieDataCalories = [
    { name: "Consumed", value: totalCalories > calorieGoal ? calorieGoal : totalCalories },
    { name: "Remaining", value: caloriesRemaining > 0 ? caloriesRemaining : 0 }
  ];

  const pieDataProtein = [
    { name: "Consumed", value: totalProtein > proteinGoal ? proteinGoal : totalProtein },
    { name: "Remaining", value: proteinRemaining > 0 ? proteinRemaining : 0 }
  ];

  return (
    <Card className="border-2 border-muted shadow-lg">
      <CardHeader>
        <CardTitle>Nutrition Tracker</CardTitle>
        <CardDescription>Track your daily calories and protein intake</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="w-full sm:w-1/3">
            <Label htmlFor="date-select">Select Date</Label>
            <Input
              id="date-select"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="w-full sm:w-1/3">
            <Label htmlFor="calorie-goal">Daily Calorie Goal</Label>
            <Input
              id="calorie-goal"
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          
          <div className="w-full sm:w-1/3">
            <Label htmlFor="protein-goal">Daily Protein Goal (g)</Label>
            <Input
              id="protein-goal"
              type="number"
              value={proteinGoal}
              onChange={(e) => setProteinGoal(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Add Food</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="food-name">Food Name</Label>
                <Input
                  id="food-name"
                  placeholder="e.g., Chicken Breast"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="e.g., 200"
                  value={newItem.calories}
                  onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  placeholder="e.g., 25"
                  value={newItem.protein}
                  onChange={(e) => setNewItem({ ...newItem, protein: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <Button onClick={addFoodItem} className="w-full mt-2">
                <Plus className="mr-2 h-4 w-4" /> Add Food
              </Button>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="pt-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Calories</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">
                          {totalCalories} <span className="text-sm text-muted-foreground">/ {calorieGoal}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {caloriesRemaining > 0 ? `${caloriesRemaining} remaining` : "Goal reached"}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Protein</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">
                          {totalProtein}g <span className="text-sm text-muted-foreground">/ {proteinGoal}g</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {proteinRemaining > 0 ? `${proteinRemaining}g remaining` : "Goal reached"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="charts" className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-[180px]">
                    <p className="text-center text-sm font-medium mb-2">Calories</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieDataCalories}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell key="cell-0" fill={COLORS[0]} />
                          <Cell key="cell-1" fill={COLORS[1]} />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="h-[180px]">
                    <p className="text-center text-sm font-medium mb-2">Protein</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieDataProtein}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell key="cell-0" fill={COLORS[2]} />
                          <Cell key="cell-1" fill={COLORS[3]} />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Today's Food Log</h3>
          {filteredItems.length === 0 ? (
            <div className="text-center py-6 border rounded-md bg-muted/30">
              <CircleOff className="mx-auto h-8 w-8 text-muted mb-2" />
              <p className="text-muted-foreground">No food logged for today</p>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-12 gap-2 bg-muted/50 p-3 text-sm font-medium">
                <div className="col-span-5">Food</div>
                <div className="col-span-3 text-center">Calories</div>
                <div className="col-span-3 text-center">Protein (g)</div>
                <div className="col-span-1"></div>
              </div>
              
              {filteredItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 p-3 border-t">
                  <div className="col-span-5">{item.name}</div>
                  <div className="col-span-3 text-center">{item.calories}</div>
                  <div className="col-span-3 text-center">{item.protein}g</div>
                  <div className="col-span-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFoodItem(item.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-12 gap-2 p-3 border-t bg-muted/20 font-medium">
                <div className="col-span-5">Total</div>
                <div className="col-span-3 text-center">{totalCalories}</div>
                <div className="col-span-3 text-center">{totalProtein}g</div>
                <div className="col-span-1"></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTracker;
