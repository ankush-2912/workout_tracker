
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Weight, Plus, Trash2 } from "lucide-react";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, 
  ResponsiveContainer
} from "recharts";
import { formatTooltipValue } from "@/components/ProgressCharts";
import { BodyMetric } from "@/types/workout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface BodyMetricsChartsProps {
  bodyMetrics: BodyMetric[];
  formatDate: (dateString: string) => string;
  onAddBodyMetric: (data: { date: string, weight: number }) => void;
  onDeleteBodyMetric: (id: string) => void;
}

const BodyMetricsCharts: React.FC<BodyMetricsChartsProps> = ({ 
  bodyMetrics,
  formatDate,
  onAddBodyMetric,
  onDeleteBodyMetric
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      weight: ""
    }
  });

  const handleSubmit = (data: { date: string, weight: string }) => {
    onAddBodyMetric({
      date: data.date,
      weight: parseFloat(data.weight)
    });
    setOpen(false);
    form.reset({
      date: new Date().toISOString().split('T')[0],
      weight: ""
    });
  };

  return (
    <Card className="border-2 border-muted/30 bg-slate-900/60 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Weight className="h-5 w-5 text-violet-400" />
          Body Weight Trend
        </CardTitle>
        <CardDescription>Track your weight changes over time</CardDescription>
      </CardHeader>
      <CardContent>
        {bodyMetrics.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bodyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-md shadow-md p-2">
                          <p className="text-foreground font-medium">
                            {payload[0] && payload[0].payload && 
                            new Date(payload[0].payload.date as string).toLocaleDateString()}
                          </p>
                          <p className="text-primary">
                            {`Weight: ${formatTooltipValue(payload[0] && payload[0].value)} kg`}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No weight data recorded yet.</p>
            <p className="text-muted-foreground mb-8">Add your weight measurements to start tracking your progress.</p>
          </div>
        )}

        {bodyMetrics.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Logged Weights</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {[...bodyMetrics]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(metric => (
                  <div key={metric.id} className="flex items-center justify-between p-2 rounded-md bg-slate-800/50">
                    <div>
                      <span className="font-medium">{new Date(metric.date).toLocaleDateString()}</span>
                      <span className="ml-4">{metric.weight} kg</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onDeleteBodyMetric(metric.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Log Weight
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Weight Measurement</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  {...form.register('date')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  placeholder="70.5" 
                  step="0.1"
                  {...form.register('weight')}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default BodyMetricsCharts;
