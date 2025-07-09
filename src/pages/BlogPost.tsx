import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const post = blogPosts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
    }
  };

  // Mock content for the blog post
  const mockContent = `
    <p>Welcome to this comprehensive guide on ${post.title.toLowerCase()}. This article will provide you with valuable insights and practical tips to help you on your fitness journey.</p>
    
    <h2>Introduction</h2>
    <p>${post.excerpt}</p>
    
    <h2>Key Points to Remember</h2>
    <ul>
      <li>Consistency is key to achieving your fitness goals</li>
      <li>Proper form is more important than lifting heavy weights</li>
      <li>Recovery is just as important as your workout routine</li>
      <li>Nutrition plays a crucial role in your fitness success</li>
    </ul>
    
    <h2>Getting Started</h2>
    <p>If you're just beginning your fitness journey, it's important to start slowly and gradually increase the intensity of your workouts. Listen to your body and don't push yourself too hard too quickly.</p>
    
    <blockquote>
      "The groundwork for all happiness is good health." - Leigh Hunt
    </blockquote>
    
    <h2>Advanced Tips</h2>
    <p>For those who have been training for a while, consider incorporating progressive overload, varying your routine, and focusing on compound movements for maximum efficiency.</p>
    
    <h2>Conclusion</h2>
    <p>Remember that fitness is a journey, not a destination. Stay consistent, be patient with yourself, and celebrate small victories along the way. Your future self will thank you for the effort you put in today.</p>
  `;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="section-container">
              <div className="max-w-4xl">
                <Button asChild variant="ghost" className="text-white mb-4 hover:bg-white/20">
                  <Link to="/blog" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
                <Badge className="mb-4">{post.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center text-white/90 space-x-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {post.readTime} min read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <div className="section-container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: mockContent }} />
                </div>
                
                {/* Share Section */}
                <div className="mt-12 pt-8 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Share this article</h3>
                    <Button onClick={handleShare} variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Author Info */}
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">About the Author</h4>
                    <div className="flex items-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{post.author}</p>
                        <p className="text-sm text-muted-foreground">Fitness Expert</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Passionate about helping people achieve their fitness goals through evidence-based training and nutrition.
                    </p>
                  </div>
                  
                  {/* Related Articles */}
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Related Articles</h4>
                    <div className="space-y-3">
                      {blogPosts
                        .filter(p => p.id !== post.id && p.category === post.category)
                        .slice(0, 3)
                        .map(relatedPost => (
                          <Link
                            key={relatedPost.id}
                            to={`/blog/${relatedPost.id}`}
                            className="block text-sm hover:text-primary transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;