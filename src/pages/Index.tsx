
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { 
  Calculator, 
  Dumbbell, 
  LineChart, 
  BookOpen, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { exercises } from "@/data/exercises";
import ExerciseCard from "@/components/ExerciseCard";

const Index = () => {
  // Get 3 featured exercises
  const featuredExercises = exercises.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="section-container">
          <h2 className="section-title">Everything You Need For Your Fitness Journey</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Dumbbell}
              title="Exercise Guides"
              description="Detailed guides on proper form and execution for all major exercises."
            />
            <FeatureCard
              icon={Calculator}
              title="Calorie Calculator"
              description="Personalized calorie recommendations based on your goals and activity level."
            />
            <FeatureCard
              icon={LineChart}
              title="Progress Tracking"
              description="Tools to track your workouts, measurements, and overall progress."
            />
            <FeatureCard
              icon={BookOpen}
              title="Nutrition Advice"
              description="Expert tips on fueling your body for optimal performance and recovery."
            />
          </div>
        </section>
        
        {/* Featured Exercises */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="section-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Exercises</h2>
              <Button asChild variant="ghost" className="group">
                <Link to="/exercises" className="flex items-center">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  {...exercise}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Calorie Calculator CTA */}
        <section className="section-container">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div className="space-y-4 text-white">
                <h2 className="text-3xl font-bold">Know Your Daily Calorie Needs</h2>
                <p className="text-white/90">
                  Our advanced calorie calculator helps you determine your optimal daily caloric intake based on your goals, body composition, and activity level.
                </p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/calculator" className="flex items-center">
                    Try Calculator Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Calorie calculator" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="section-container">
            <h2 className="section-title">What Our Community Says</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">JD</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">Fitness Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The exercises guides have transformed my workout routine. I'm finally seeing progress after years of inconsistent results!"
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">AM</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Alice Miller</h4>
                    <p className="text-sm text-gray-500">Weight Loss Journey</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The calorie calculator gave me exactly what I needed to plan my meals. Down 15 pounds and still going strong!"
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">RJ</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <p className="text-sm text-gray-500">Bodybuilder</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "As a competitive bodybuilder, I appreciate the detailed exercise instructions. The tips on form have helped prevent injuries."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
