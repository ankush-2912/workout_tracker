
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NetworkAnimation from "./NetworkAnimation";

const Hero = () => {
  return (
    <div className="solo-gradient group">
      <div className="section-container relative overflow-hidden">
        <NetworkAnimation />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight solo-text">
              Level Up Your <span className="text-primary">Strength</span>
            </h1>
            <p className="text-lg text-gray-300">
              Rise from weakness to power with our elite training system. Track your progress and witness your transformation.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button asChild size="lg" className="solo-button">
                <Link to="/calculator">
                  Calculate Power
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-violet-700/50 text-violet-300 hover:text-violet-100 hover:bg-violet-900/30">
                <Link to="/workout-tracker" className="group">
                  Begin Training
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=1000&q=80" 
                alt="Solo training" 
                className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 neo-card p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-violet-800/50 p-3 rounded-full purple-glow">
                  <span className="text-violet-200 text-xl font-bold">S-Rank</span>
                </div>
                <div>
                  <p className="font-medium text-violet-100">Hunter Status</p>
                  <p className="text-sm text-violet-300">Awakened Potential</p>
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
