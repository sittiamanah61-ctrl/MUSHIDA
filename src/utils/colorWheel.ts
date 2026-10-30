export interface HSLColor {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
}

export type HarmonyMode =
  | 'custom'
  | 'analogous'
  | 'monochromatic'
  | 'triad'
  | 'complementary'
  | 'split_complementary'
  | 'tetradic'
  | 'shades';

// Convert HSL to HEX
export function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Convert HEX to HSL
export function hexToHsl(hex: string): HSLColor {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return { h: 140, s: 60, l: 30 };

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

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
    h *= 60;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Calculate 5 harmonious colors based on a base HSL color and harmony rule
export function generateHarmoniousPalette(base: HSLColor, mode: HarmonyMode): string[] {
  const { h, s, l } = base;

  switch (mode) {
    case 'complementary': {
      // Base + complementary (+180) + tints and shades
      const compH = (h + 180) % 360;
      return [
        hslToHex(h, s, Math.max(15, l - 20)),
        hslToHex(h, Math.max(20, s - 30), Math.min(96, l + 40)),
        hslToHex(h, s, l), // Base
        hslToHex(compH, Math.max(25, s - 25), Math.min(92, l + 35)),
        hslToHex(compH, s, Math.max(25, l - 5))
      ];
    }
    case 'analogous': {
      // 5 colors stepping by ~25 degrees
      return [
        hslToHex((h - 50 + 360) % 360, s, l),
        hslToHex((h - 25 + 360) % 360, s, Math.min(92, l + 30)),
        hslToHex(h, s, l), // Base
        hslToHex((h + 25) % 360, s, Math.max(20, l - 15)),
        hslToHex((h + 50) % 360, s, Math.max(15, l - 25))
      ];
    }
    case 'triad': {
      const h1 = (h + 120) % 360;
      const h2 = (h + 240) % 360;
      return [
        hslToHex(h, s, Math.max(18, l - 20)),
        hslToHex(h1, Math.max(20, s - 30), Math.min(94, l + 35)),
        hslToHex(h, s, l), // Base
        hslToHex(h1, s, l),
        hslToHex(h2, s, Math.max(25, l - 10))
      ];
    }
    case 'monochromatic': {
      return [
        hslToHex(h, s, Math.max(12, l - 35)),
        hslToHex(h, Math.max(10, s - 30), Math.min(96, l + 40)),
        hslToHex(h, s, l), // Base
        hslToHex(h, s, Math.min(75, l + 20)),
        hslToHex(h, s, Math.max(20, l - 18))
      ];
    }
    case 'split_complementary': {
      const comp1 = (h + 150) % 360;
      const comp2 = (h + 210) % 360;
      return [
        hslToHex(h, s, Math.max(20, l - 20)),
        hslToHex(h, Math.max(20, s - 30), Math.min(95, l + 35)),
        hslToHex(h, s, l), // Base
        hslToHex(comp1, s, l),
        hslToHex(comp2, s, Math.max(20, l - 10))
      ];
    }
    case 'tetradic': {
      const h1 = (h + 90) % 360;
      const h2 = (h + 180) % 360;
      const h3 = (h + 270) % 360;
      return [
        hslToHex(h1, s, Math.max(20, l - 15)),
        hslToHex(h, Math.max(20, s - 35), Math.min(95, l + 40)),
        hslToHex(h, s, l), // Base
        hslToHex(h2, s, l),
        hslToHex(h3, s, Math.max(25, l - 10))
      ];
    }
    case 'shades': {
      return [
        hslToHex(h, s, 15),
        hslToHex(h, s, 92),
        hslToHex(h, s, l), // Base
        hslToHex(h, s, 60),
        hslToHex(h, s, 35)
      ];
    }
    case 'custom':
    default: {
      return [
        hslToHex((h + 180) % 360, s, Math.max(20, l - 15)),
        hslToHex(h, Math.max(20, s - 40), 92),
        hslToHex(h, s, l), // Base
        hslToHex((h + 40) % 360, s, Math.min(80, l + 20)),
        hslToHex((h + 220) % 360, s, Math.max(25, l - 10))
      ];
    }
  }
}
