import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: number;
}

const BlogCard = ({ id, title, excerpt, date, author, category, image, readTime }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3">{category}</Badge>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4">
            <User className="h-4 w-4 mr-1" />
            {author}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {readTime} min read
          </div>
        </div>
        
        <Button asChild variant="outline" className="w-full group">
          <Link to={`/blog/${id}`} className="flex items-center justify-center">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
      
      <div className="px-6 py-2 bg-gray-50 text-sm text-gray-500">
        {date}
      </div>
    </div>
  );
};

export default BlogCard;