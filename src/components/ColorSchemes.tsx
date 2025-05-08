
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getComplementaryColor,
  getTriadicColors,
  getMonochromaticColors
} from "../utils/colorUtils";
import ColorSwatch from "./ColorSwatch";

interface ColorSchemesProps {
  color: string;
}

const ColorSchemes = ({ color }: ColorSchemesProps) => {
  const [activeTab, setActiveTab] = useState<string>("complementary");
  
  const complementaryColor = getComplementaryColor(color);
  const triadicColors = getTriadicColors(color);
  const monochromaticColors = getMonochromaticColors(color, 5);

  return (
    <div className="w-full">
      <div className="flex space-x-2 border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "complementary"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("complementary")}
        >
          Complementary
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "triadic"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("triadic")}
        >
          Triadic
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "monochromatic"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("monochromatic")}
        >
          Monochromatic
        </button>
      </div>

      <div className="p-4 rounded-lg bg-gray-50">
        {activeTab === "complementary" && (
          <div className="flex justify-center space-x-8">
            <ColorSwatch color={color} label="Original" size="lg" />
            <ColorSwatch color={complementaryColor} label="Complementary" size="lg" />
          </div>
        )}

        {activeTab === "triadic" && (
          <div className="flex justify-center space-x-8">
            <ColorSwatch color={color} label="Original" size="lg" />
            {triadicColors.map((triadicColor, index) => (
              <ColorSwatch
                key={index}
                color={triadicColor}
                label={`Triadic ${index + 1}`}
                size="lg"
              />
            ))}
          </div>
        )}

        {activeTab === "monochromatic" && (
          <div className="flex flex-wrap justify-center gap-4">
            {monochromaticColors.map((monoColor, index) => (
              <ColorSwatch
                key={index}
                color={monoColor}
                label={index === Math.floor(monochromaticColors.length / 2) ? "Original" : null}
                size="md"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSchemes;
