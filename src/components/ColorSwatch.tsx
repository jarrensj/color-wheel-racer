
import { useState } from "react";
import { getContrastColor } from "../utils/colorUtils";
import { CheckIcon, ClipboardCopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ColorSwatchProps {
  color: string;
  label?: string;
  showHex?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

const ColorSwatch = ({ 
  color, 
  label, 
  showHex = true, 
  size = "md",
  onClick,
  className = "" 
}: ColorSwatchProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const contrastColor = getContrastColor(color);
  
  const sizes = {
    sm: "h-12 w-12",
    md: "h-20 w-20",
    lg: "h-28 w-28"
  };
  
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: `Color ${color} copied!`,
      duration: 2000
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div 
      className={`flex flex-col items-center ${className}`}
      onClick={onClick}
    >
      <div 
        className={`${sizes[size]} relative rounded-md shadow-md transition-transform hover:scale-105 cursor-pointer group`} 
        style={{ backgroundColor: color }}
      >
        <button 
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy color to clipboard"
        >
          {copied ? (
            <CheckIcon size={16} color={contrastColor} />
          ) : (
            <ClipboardCopyIcon size={16} color={contrastColor} />
          )}
        </button>
      </div>
      
      {label && (
        <span className="mt-2 text-sm font-medium">{label}</span>
      )}
      
      {showHex && (
        <span className="mt-1 text-xs font-mono">{color}</span>
      )}
    </div>
  );
};

export default ColorSwatch;
