import { Link } from "react-router-dom";
import { Dumbbell, Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">FitPro</span>
            </div>
            <p className="text-gray-400">
              Your ultimate resource for fitness information, workout guidance, and nutritional advice.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/ankush_10010" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me/ankush_10010" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/exercises" className="text-gray-400 hover:text-primary">
                  Exercises
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-400 hover:text-primary">
                  Calorie Calculator
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Workout Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Nutrition Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Fitness Videos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Fitness Street</li>
              <li>Wellness City, WC 12345</li>
              <li>Phone: +91 99054XXXXX</li>
              <li>Instagram: @ankush_10010</li>
              <li>Telegram: @ankush_10010</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} FitPro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
