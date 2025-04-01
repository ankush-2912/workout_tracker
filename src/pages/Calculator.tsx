
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalorieCalculator from "@/components/CalorieCalculator";

const Calculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="section-container py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Daily Calorie Calculator</h1>
              <p className="text-white/90 text-lg">
                Calculate your daily calorie needs to lose, maintain, or gain weight based on your specific measurements and activity level.
              </p>
            </div>
          </div>
        </div>
        
        {/* Calculator */}
        <div className="section-container py-12">
          <CalorieCalculator />
          
          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Understanding Your Calorie Needs</h2>
            <div className="space-y-4">
              <p>
                Your daily calorie needs are determined by several factors including your age, gender, weight, height, and activity level. Understanding these needs is essential for achieving your fitness goals.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Basal Metabolic Rate (BMR)</h3>
                <p>
                  Your BMR represents the number of calories your body needs to maintain basic physiological functions while at complete rest. This includes breathing, circulating blood, regulating body temperature, and growing and repairing cells.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Total Daily Energy Expenditure (TDEE)</h3>
                <p>
                  Your TDEE is the total number of calories you burn in a day, including your BMR and all activities. This is your maintenance calorie level - the amount you need to eat to maintain your current weight.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Calorie Deficit for Weight Loss</h3>
                <p>
                  To lose weight safely, aim for a moderate calorie deficit of 500 calories below your maintenance level. This typically results in about 0.5kg (1lb) of weight loss per week, which is considered a healthy and sustainable rate.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Calorie Surplus for Muscle Gain</h3>
                <p>
                  To build muscle, you'll need to consume more calories than you burn. A moderate surplus of about 500 calories above maintenance, combined with proper strength training, provides the energy needed for muscle growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Calculator;
