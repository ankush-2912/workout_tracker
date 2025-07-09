
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = [...new Set(blogPosts.map((post) => post.category))];
  
  // Filter blog posts based on search term and active category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !activeCategory || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="section-container py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">Fitness Blog</h1>
              </div>
              <p className="text-white/90 text-lg">
                Expert advice, tips, and insights to help you on your fitness journey.
              </p>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <BlogFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
        
        {/* Blog Posts */}
        <div className="bg-gray-50">
          <div className="section-container">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or category filters.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory(null);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Newsletter */}
        <BlogNewsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
