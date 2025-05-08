
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import ColorDisplay from "../components/ColorDisplay";
import ColorSchemes from "../components/ColorSchemes";
import ParticleBackground from "../components/ParticleBackground";
import { Palette } from "lucide-react";

const Index = () => {
  const [selectedColor, setSelectedColor] = useState("#9b87f5");
  const [currentSchemeColors, setCurrentSchemeColors] = useState<string[]>([selectedColor]);
  const [currentSchemeName, setCurrentSchemeName] = useState<string>("complementary");

  const handleSchemeChange = (schemeName: string, colors: string[]) => {
    setCurrentSchemeName(schemeName);
    setCurrentSchemeColors(colors);
  };

  return (
    <div className="min-h-screen">
      {/* Particle background that responds to color scheme */}
      <ParticleBackground 
        colors={currentSchemeColors} 
        primaryColor={selectedColor} 
      />
      
      <header className="bg-white/50 backdrop-blur-sm shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-xl font-bold text-gray-900">
                Color Wheel Wizardry
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-white/40 backdrop-blur-sm shadow-lg rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Choose Your Color</h2>
              <ColorPicker value={selectedColor} onChange={setSelectedColor} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6">Selected Color</h2>
              <ColorDisplay color={selectedColor} />
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Color Schemes</h2>
            <ColorSchemes 
              color={selectedColor} 
              onSchemeChange={handleSchemeChange} 
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Find the perfect color combinations for your next project.
            Use our color picker to create harmonious color schemes.
          </p>
        </div>
      </main>

      <footer className="bg-white/50 backdrop-blur-sm mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Color Wheel Wizardry. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
