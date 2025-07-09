
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "nutrition-101",
    title: "Nutrition 101: Fueling Your Workouts for Maximum Results",
    excerpt: "Learn the fundamentals of nutrition to optimize your workouts and achieve your fitness goals faster.",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 8
  },
  {
    id: "beginners-guide",
    title: "The Complete Beginner's Guide to Weight Training",
    excerpt: "Starting your weight training journey? Here's everything you need to know to build a solid foundation.",
    date: "July 3, 2023",
    author: "Mike Donovan",
    category: "Training",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 12
  },
  {
    id: "recovery-importance",
    title: "Why Recovery Is Just as Important as Your Workout",
    excerpt: "Discover why proper recovery is crucial for muscle growth, injury prevention, and overall fitness progress.",
    date: "August 10, 2023",
    author: "Lisa Chen",
    category: "Recovery",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 6
  },
  {
    id: "protein-myths",
    title: "Common Protein Myths Debunked by Science",
    excerpt: "Separate fact from fiction when it comes to protein consumption, timing, and sources for muscle building.",
    date: "September 5, 2023",
    author: "Dr. James Wilson",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 10
  },
  {
    id: "cardio-strength",
    title: "The Perfect Balance: Combining Cardio and Strength Training",
    excerpt: "Find the optimal balance between cardio and strength training to reach your specific fitness goals.",
    date: "October 12, 2023",
    author: "Tony Rivera",
    category: "Training",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 9
  },
  {
    id: "mindful-eating",
    title: "Mindful Eating: A New Approach to Nutrition",
    excerpt: "Explore how practicing mindfulness while eating can transform your relationship with food and fitness.",
    date: "November 8, 2023",
    author: "Emma Thompson",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 7
  }
];
