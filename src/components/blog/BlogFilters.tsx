import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  categories: string[];
}

const BlogFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory, 
  categories 
}: BlogFiltersProps) => {
  return (
    <div className="bg-white shadow-md">
      <div className="section-container py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;