
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Exercises from "./pages/Exercises";
import WorkoutTracker from "./pages/WorkoutTracker";
import Progress from "./pages/Progress";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/workout-tracker" element={<WorkoutTracker />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<UserProfile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
