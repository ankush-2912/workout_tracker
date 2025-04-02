
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="solo-card rounded-xl p-6">
      <div className="h-12 w-12 rounded-lg bg-violet-800/50 flex items-center justify-center mb-4 purple-glow">
        <Icon className="h-6 w-6 text-violet-200" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-violet-200">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
