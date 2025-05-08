
import { useState, ChangeEvent } from "react";
import { hexToRgb, rgbToHsl } from "../utils/colorUtils";

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    // Update only if the hex value is valid
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      onChange(newHex);
    }
  };

  // Get RGB and HSL values from the hex
  const rgb = hexToRgb(value) || { r: 0, g: 0, b: 0 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-24 cursor-pointer rounded-lg border border-gray-200"
          aria-label="Color picker"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Hex</label>
          <input
            type="text"
            value={value}
            onChange={handleHexChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="#000000"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">R</label>
            <input
              type="number"
              value={rgb.r}
              min="0"
              max="255"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">G</label>
            <input
              type="number"
              value={rgb.g}
              min="0"
              max="255"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">B</label>
            <input
              type="number"
              value={rgb.b}
              min="0"
              max="255"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">H</label>
            <input
              type="number"
              value={hsl.h}
              min="0"
              max="360"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">S</label>
            <input
              type="number"
              value={hsl.s}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">L</label>
            <input
              type="number"
              value={hsl.l}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
