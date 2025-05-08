
import React from "react";
import { Car } from "lucide-react";

interface RaceCarProps {
  colors: string[];
}

const RaceCar = ({ colors }: RaceCarProps) => {
  // Ensure there are always enough colors to use
  const ensuredColors = colors.length < 3 ? [...colors, ...colors, ...colors] : colors;
  
  const bodyColor = ensuredColors[0] || "#9b87f5";
  const wheelColor = ensuredColors[1] || "#333333";
  const detailColor = ensuredColors[2] || "#ffffff";

  return (
    <div className="flex flex-col items-center justify-center py-4 animate-bounce">
      <div className="relative">
        {/* Car body */}
        <div 
          className="w-32 h-16 rounded-lg relative mb-2 transition-colors duration-300 shadow-md"
          style={{ backgroundColor: bodyColor }}
        >
          {/* Windshield */}
          <div 
            className="absolute top-1 right-1 left-12 h-6 rounded-tr-lg"
            style={{ backgroundColor: detailColor }}
          ></div>
          
          {/* Stripes */}
          <div 
            className="absolute top-9 right-2 left-2 h-2 rounded-full opacity-70"
            style={{ backgroundColor: detailColor }}
          ></div>
        </div>
        
        {/* Wheels */}
        <div className="flex justify-between">
          <div 
            className="w-8 h-8 rounded-full -mt-2 border-2 transition-colors duration-300"
            style={{ backgroundColor: wheelColor, borderColor: detailColor }}
          ></div>
          <div 
            className="w-8 h-8 rounded-full -mt-2 border-2 transition-colors duration-300"
            style={{ backgroundColor: wheelColor, borderColor: detailColor }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center mt-2">
        <Car 
          className="mr-1 transition-colors duration-300" 
          style={{ color: bodyColor }} 
          size={18} 
        />
        <span className="text-sm font-medium">Color Wheel Racer</span>
      </div>
    </div>
  );
};

export default RaceCar;
