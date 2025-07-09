import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
              <span className="sr-only">ShadowGains</span>
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-violet-600 to-indigo-900 flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8" />
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
              <UserProfileMenu />
            ) : (
              <Button asChild variant="default" className="ml-8 solo-button">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-4 px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-violet-300 bg-violet-900/30'
                    : 'text-gray-400 hover:text-violet-300 hover:bg-violet-900/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                to="/auth"
                className="block w-full px-3 py-2 rounded-md text-center font-medium bg-violet-600 text-white hover:bg-violet-700 mt-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
