
import { getContrastColor } from "../utils/colorUtils";

interface ColorDisplayProps {
  color: string;
}

const ColorDisplay = ({ color }: ColorDisplayProps) => {
  const textColor = getContrastColor(color);

  return (
    <div 
      className="w-full h-40 rounded-lg shadow-lg flex items-center justify-center transition-colors duration-300 mb-6"
      style={{ backgroundColor: color, color: textColor }}
    >
      <h2 className="text-3xl font-bold">{color}</h2>
    </div>
  );
};

export default ColorDisplay;
