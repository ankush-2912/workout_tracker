
import React from "react";

const ProgressHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="section-container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Progress Tracking</h1>
          <p className="text-white/90 text-lg">
            Visualize your fitness journey and track your improvement over time
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
