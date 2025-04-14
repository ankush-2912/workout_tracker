
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressHeader from "@/components/progress/ProgressHeader";
import ProgressContent from "@/components/progress/ProgressContent";
import { useBodyMetrics } from "@/hooks/useBodyMetrics";

const ProgressPage = () => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved ? JSON.parse(saved) : [];
  });
  
  const { bodyMetrics, saveBodyMetric, deleteBodyMetric } = useBodyMetrics();
  const [timeRange, setTimeRange] = useState("all"); // all, month, week

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <ProgressHeader />
        <ProgressContent 
          workouts={workouts}
          bodyMetrics={bodyMetrics}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          onAddBodyMetric={saveBodyMetric}
          onDeleteBodyMetric={deleteBodyMetric}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProgressPage;
