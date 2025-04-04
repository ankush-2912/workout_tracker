
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Dumbbell } from "lucide-react";
import UserProfileMenu from "@/components/UserProfileMenu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Workout Tracker', path: '/workout-tracker' },
    { label: 'Progress', path: '/progress' },
    { label: 'Nutrition', path: '/calculator' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-violet-900/30 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <span className="sr-only">FitTrack</span>
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-violet-600 to-indigo-900 flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold solo-text">ShadowGains</span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              className="rounded-md p-2 text-violet-300 hover:text-violet-100 hover:bg-violet-900/30"
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
                className={`text-base font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'text-violet-300 border-b-2 border-violet-500' 
                    : 'text-gray-400 hover:text-violet-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button asChild size="sm" className="solo-button">
                  <Link to="/workout-tracker">Log Training</Link>
                </Button>
                <UserProfileMenu />
              </div>
            ) : (
              <>
                <Button asChild size="sm" variant="outline" className="mr-2 border-violet-700/50 text-violet-300 hover:text-violet-100 hover:bg-violet-900/30">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild size="sm" className="solo-button">
                  <Link to="/auth?tab=signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full origin-top-right transform p-2 transition md:hidden z-50">
          <div className="solo-card rounded-lg shadow-lg divide-y divide-gray-800">
            <div className="px-5 pt-5 pb-6">
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`-m-3 flex items-center rounded-md p-3 text-base font-medium ${
                        isActive(link.path) 
                          ? 'bg-violet-900/30 text-violet-300' 
                          : 'text-gray-400 hover:bg-violet-900/20 hover:text-violet-300'
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
                {isAuthenticated ? (
                  <>
                    <Button asChild variant="outline" className="w-full border-violet-700/50 text-violet-300 hover:text-violet-100 hover:bg-violet-900/30" onClick={() => setIsMenuOpen(false)}>
                      <Link to="/profile">Profile</Link>
                    </Button>
                    <Button asChild className="w-full solo-button" onClick={() => setIsMenuOpen(false)}>
                      <Link to="/workout-tracker">Log Training</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full border-violet-700/50 text-violet-300 hover:text-violet-100 hover:bg-violet-900/30" onClick={() => setIsMenuOpen(false)}>
                      <Link to="/auth">Login</Link>
                    </Button>
                    <Button asChild className="w-full solo-button" onClick={() => setIsMenuOpen(false)}>
                      <Link to="/auth?tab=signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
