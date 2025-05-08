/**
 * Utility functions for color manipulation
 */

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex value
  const bigint = parseInt(hex, 16);
  
  // If invalid hex, return null
  if (isNaN(bigint)) return null;
  
  // Extract RGB components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return { r, g, b };
};

// Convert RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Convert RGB to HSL
export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { 
    h: Math.round(h * 360), 
    s: Math.round(s * 100), 
    l: Math.round(l * 100) 
  };
};

// Convert HSL to RGB
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { 
    r: Math.round(r * 255), 
    g: Math.round(g * 255), 
    b: Math.round(b * 255) 
  };
};

// Get complementary color (opposite on color wheel)
export const getComplementaryColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  // Opposite hue on the color wheel (180 degrees)
  const newHue = (h + 180) % 360;
  
  const newRgb = hslToRgb(newHue, s, l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
};

// Get triadic colors (three colors equidistant on color wheel)
export const getTriadicColors = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  if (!rgb) return ['#000000', '#000000'];
  
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // 120 degrees apart on the color wheel
  const hue1 = (h + 120) % 360;
  const hue2 = (h + 240) % 360;
  
  const rgb1 = hslToRgb(hue1, s, l);
  const rgb2 = hslToRgb(hue2, s, l);
  
  return [
    rgbToHex(rgb1.r, rgb1.g, rgb1.b),
    rgbToHex(rgb2.r, rgb2.g, rgb2.b)
  ];
};

// Get analogous colors (adjacent on the color wheel)
export const getAnalogousColors = (hex: string): string[] => {
  const rgb = hexToRgb(hex);
  if (!rgb) return ['#000000', '#000000'];
  
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Colors 30 degrees to each side of the base color
  const hue1 = (h + 30) % 360;
  const hue2 = (h - 30 + 360) % 360; // Adding 360 and using modulo to handle negative values
  
  const rgb1 = hslToRgb(hue1, s, l);
  const rgb2 = hslToRgb(hue2, s, l);
  
  return [
    rgbToHex(rgb1.r, rgb1.g, rgb1.b),
    rgbToHex(rgb2.r, rgb2.g, rgb2.b)
  ];
};

// Get monochromatic colors (variations of one hue)
export const getMonochromaticColors = (hex: string, count = 5): string[] => {
  const rgb = hexToRgb(hex);
  if (!rgb) return Array(count).fill('#000000');
  
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Generate colors with same hue but different lightness
  const colors = [];
  
  // Starting from lighter to darker
  const minLightness = Math.max(l - 40, 10);
  const maxLightness = Math.min(l + 40, 90);
  const step = (maxLightness - minLightness) / (count - 1);
  
  for (let i = 0; i < count; i++) {
    const newL = minLightness + step * i;
    const newRgb = hslToRgb(h, s, newL);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }
  
  return colors;
};

// Get shades of a color (darker variations by adding black)
export const getShadesOfColor = (hex: string, count = 5): string[] => {
  const rgb = hexToRgb(hex);
  if (!rgb) return Array(count).fill('#000000');
  
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Generate colors with same hue and saturation but decreasing lightness
  const colors = [];
  
  // Start with the original color
  colors.push(hex);
  
  // Calculate step to get increasingly darker shades
  const step = l / (count);
  
  for (let i = 1; i < count; i++) {
    const newL = Math.max(l - step * i, 0);
    const newRgb = hslToRgb(h, s, newL);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }
  
  return colors;
};

// Get tints of a color (lighter variations by adding white)
export const getTintsOfColor = (hex: string, count = 5): string[] => {
  const rgb = hexToRgb(hex);
  if (!rgb) return Array(count).fill('#FFFFFF');
  
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Generate colors with same hue and saturation but increasing lightness
  const colors = [];
  
  // Start with the original color
  colors.push(hex);
  
  // Calculate step to get increasingly lighter tints
  const step = (100 - l) / (count);
  
  for (let i = 1; i < count; i++) {
    const newL = Math.min(l + step * i, 100);
    const newRgb = hslToRgb(h, s, newL);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }
  
  return colors;
};

// Check if a color is light or dark
export const isLightColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  
  // Calculate relative luminance
  const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  return luminance > 128;
};

// Get text color based on background color
export const getContrastColor = (hex: string): string => {
  return isLightColor(hex) ? '#000000' : '#FFFFFF';
};
