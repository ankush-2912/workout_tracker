
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Dumbbell } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Workout Tracker', path: '/workout-tracker' },
    { label: 'Nutrition', path: '/calculator' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <span className="sr-only">FitTrack</span>
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">FitTrack</span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              className="rounded-md p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium hover:text-primary transition-colors ${
                  isActive(link.path) 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Button asChild size="sm" variant="outline" className="mr-2">
              <Link to="/calculator">Track Calories</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/workout-tracker">Log Workout</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full origin-top-right transform p-2 transition md:hidden z-50">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`-m-3 flex items-center rounded-md p-3 text-base font-medium ${
                        isActive(link.path) 
                          ? 'bg-gray-50 text-primary' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/calculator" onClick={() => setIsMenuOpen(false)}>
                    Track Calories
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/workout-tracker" onClick={() => setIsMenuOpen(false)}>
                    Log Workout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
