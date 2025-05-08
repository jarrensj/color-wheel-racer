
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getComplementaryColor,
  getTriadicColors,
  getMonochromaticColors,
  getShadesOfColor,
  getTintsOfColor,
  getAnalogousColors
} from "../utils/colorUtils";
import ColorSwatch from "./ColorSwatch";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorSchemesProps {
  color: string;
}

const schemeExplanations = {
  complementary: "Complementary colors are directly opposite each other on the color wheel. This scheme creates high contrast and visual vibrance.",
  analogous: "Analogous colors are adjacent to each other on the color wheel. This creates a harmonious, cohesive look with less contrast than complementary colors.",
  triadic: "Triadic colors are evenly spaced around the color wheel. This scheme offers high contrast while maintaining color harmony and balance.",
  monochromatic: "Monochromatic colors are different variations (saturation/brightness) of a single hue. This creates a cohesive, unified look with subtle variations.",
  shades: "Shades are created by adding black to the base color, making it darker while maintaining the same hue.",
  tints: "Tints are created by adding white to the base color, making it lighter while maintaining the same hue."
};

const ColorSchemes = ({ color }: ColorSchemesProps) => {
  const [activeTab, setActiveTab] = useState<string>("complementary");
  
  const complementaryColor = getComplementaryColor(color);
  const triadicColors = getTriadicColors(color);
  const monochromaticColors = getMonochromaticColors(color, 5);
  const shades = getShadesOfColor(color, 5);
  const tints = getTintsOfColor(color, 5);
  const analogousColors = getAnalogousColors(color);

  const TabButton = ({ name, label }: { name: string; label: string }) => (
    <div className="flex items-center">
      <button
        className={`px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === name
            ? "border-b-2 border-primary text-primary"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab(name)}
      >
        {label}
      </button>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{schemeExplanations[name as keyof typeof schemeExplanations]}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 border-b mb-6">
        <TabButton name="complementary" label="Complementary" />
        <TabButton name="analogous" label="Analogous" />
        <TabButton name="triadic" label="Triadic" />
        <TabButton name="monochromatic" label="Monochromatic" />
        <TabButton name="shades" label="Shades" />
        <TabButton name="tints" label="Tints" />
      </div>

      <div className="p-4 rounded-lg bg-gray-50">
        <div className="mb-4 text-gray-600 text-sm">
          {schemeExplanations[activeTab as keyof typeof schemeExplanations]}
        </div>
        
        {activeTab === "complementary" && (
          <div className="flex justify-center space-x-8">
            <ColorSwatch color={color} label="Original" size="lg" />
            <ColorSwatch color={complementaryColor} label="Complementary" size="lg" />
          </div>
        )}

        {activeTab === "analogous" && (
          <div className="flex justify-center space-x-8">
            <ColorSwatch color={analogousColors[0]} label="Analogous 1" size="lg" />
            <ColorSwatch color={color} label="Original" size="lg" />
            <ColorSwatch color={analogousColors[1]} label="Analogous 2" size="lg" />
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

        {activeTab === "shades" && (
          <div className="flex flex-wrap justify-center gap-4">
            {shades.map((shade, index) => (
              <ColorSwatch
                key={index}
                color={shade}
                label={index === 0 ? "Original" : null}
                size="md"
              />
            ))}
          </div>
        )}

        {activeTab === "tints" && (
          <div className="flex flex-wrap justify-center gap-4">
            {tints.map((tint, index) => (
              <ColorSwatch
                key={index}
                color={tint}
                label={index === 0 ? "Original" : null}
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
