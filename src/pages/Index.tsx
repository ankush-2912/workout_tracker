
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { 
  Calculator, 
  LineChart, 
  ChevronRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="section-container">
          <h2 className="section-title solo-text">Everything You Need For Your Fitness Journey</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
          </div>
        </section>
        
        {/* Calorie Calculator CTA */}
        <section className="section-container">
          <div className="solo-card rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold solo-text">Know Your Daily Calorie Needs</h2>
                <p className="text-gray-300">
                  Our advanced calorie calculator helps you determine your optimal daily caloric intake based on your goals, body composition, and activity level.
                </p>
                <Button asChild size="lg" className="solo-button">
                  <Link to="/calculator" className="flex items-center">
                    Try Calculator Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1547919307-1ecb10702e6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Calorie calculator" 
                  className="rounded-lg shadow-xl purple-glow mix-blend-luminosity opacity-80"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="bg-slate-900/60 py-12 md:py-16">
          <div className="section-container">
            <h2 className="section-title solo-text">What Our Community Says</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="solo-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-violet-800/50 flex items-center justify-center purple-glow">
                    <span className="text-violet-200 font-bold">JD</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-violet-200">John Doe</h4>
                    <p className="text-sm text-violet-300">Fitness Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "The exercises guides have transformed my workout routine. I'm finally seeing progress after years of inconsistent results!"
                </p>
              </div>
              
              <div className="solo-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-violet-800/50 flex items-center justify-center purple-glow">
                    <span className="text-violet-200 font-bold">AM</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-violet-200">Alice Miller</h4>
                    <p className="text-sm text-violet-300">Weight Loss Journey</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "The calorie calculator gave me exactly what I needed to plan my meals. Down 15 pounds and still going strong!"
                </p>
              </div>
              
              <div className="solo-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-violet-800/50 flex items-center justify-center purple-glow">
                    <span className="text-violet-200 font-bold">RJ</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-violet-200">Robert Johnson</h4>
                    <p className="text-sm text-violet-300">Bodybuilder</p>
                  </div>
                </div>
                <p className="text-gray-300">
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
