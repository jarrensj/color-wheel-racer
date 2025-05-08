
import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import ColorDisplay from "../components/ColorDisplay";
import ColorSchemes from "../components/ColorSchemes";
import { ColorWheelIcon } from "lucide-react";

const Index = () => {
  const [selectedColor, setSelectedColor] = useState("#9b87f5");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ColorWheelIcon className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-xl font-bold text-gray-900">
                Color Wheel Wizardry
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
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
            <ColorSchemes color={selectedColor} />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Find the perfect color combinations for your next project.
            Use our color picker to create harmonious color schemes.
          </p>
        </div>
      </main>

      <footer className="bg-white mt-12">
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
