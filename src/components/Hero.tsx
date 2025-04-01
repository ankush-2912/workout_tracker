
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Transform Your Body, <span className="text-primary">Elevate</span> Your Life
            </h1>
            <p className="text-lg text-gray-600">
              Get fit with our comprehensive exercise guides, personalized calorie calculator, and expert fitness advice.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/calculator">
                  Calculate Calories
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/exercises" className="group">
                  Explore Exercises
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Person working out" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <span className="text-primary text-xl font-bold">98%</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Success Rate</p>
                  <p className="text-sm text-gray-500">For dedicated members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
