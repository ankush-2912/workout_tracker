
import { useState } from "react";
import { exercises } from "@/data/exercises";
import ExerciseCard from "@/components/ExerciseCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Dumbbell 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  // Extract unique categories and muscles
  const categories = [...new Set(exercises.map((exercise) => exercise.category))];
  const muscles = [...new Set(exercises.flatMap((exercise) => exercise.targetMuscles))];

  // Filter exercises based on search term and filters
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                          selectedCategories.includes(exercise.category);
    
    const matchesMuscle = selectedMuscles.length === 0 || 
                         exercise.targetMuscles.some(muscle => selectedMuscles.includes(muscle));
    
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Handle muscle toggle
  const toggleMuscle = (muscle: string) => {
    setSelectedMuscles(prev => 
      prev.includes(muscle) 
        ? prev.filter(m => m !== muscle) 
        : [...prev, muscle]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="section-container py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Exercise Library</h1>
              <p className="text-white/90 text-lg">
                Discover detailed guides for all major exercises to optimize your workouts and achieve your fitness goals.
              </p>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white shadow-md">
          <div className="section-container py-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search exercises..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Categories
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Exercise Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Muscles
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Target Muscles</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {muscles.map((muscle) => (
                      <DropdownMenuCheckboxItem
                        key={muscle}
                        checked={selectedMuscles.includes(muscle)}
                        onCheckedChange={() => toggleMuscle(muscle)}
                      >
                        {muscle}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Active filters */}
            {(selectedCategories.length > 0 || selectedMuscles.length > 0) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <div 
                    key={category} 
                    className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                    <button 
                      onClick={() => toggleCategory(category)}
                      className="ml-2 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {selectedMuscles.map((muscle) => (
                  <div 
                    key={muscle} 
                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {muscle}
                    <button 
                      onClick={() => toggleMuscle(muscle)}
                      className="ml-2 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedMuscles([]);
                  }}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Exercises Grid */}
        <div className="bg-gray-50">
          <div className="section-container">
            {filteredExercises.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    {...exercise}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Dumbbell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No exercises found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategories([]);
                    setSelectedMuscles([]);
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Exercises;
