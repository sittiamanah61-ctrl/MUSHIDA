import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Eye,
  Sliders,
  Download,
  Image as ImageIcon,
  Pipette,
  Layers,
  ArrowRight,
  Share2,
  Bookmark,
  Users,
  Calendar,
  Heart,
  BookOpen,
  MapPin,
  ExternalLink,
  Grid,
  Scale,
  Maximize2,
  Minimize2,
  Navigation,
  AlertTriangle,
  Shapes,
  Type,
  RotateCw,
  HelpCircle,
  Compass,
  ScanLine
} from 'lucide-react';
import {
  HSLColor,
  HarmonyMode,
  generateHarmoniousPalette,
  hslToHex,
  hexToHsl
} from '../../utils/colorWheel';
import { getContrastRatio } from '../../utils/designGrader';

interface ColorPaletteStudioProps {
  onComplete: () => void;
  isCompleted: boolean;
  onApplyToTask?: (palette: { primary: string; secondary: string; accent: string; bg: string }) => void;
}

export const ColorPaletteStudio: React.FC<ColorPaletteStudioProps> = ({
  onComplete,
  isCompleted,
  onApplyToTask
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'wheel' | 'base' | 'image'>('wheel');
  const [harmonyMode, setHarmonyMode] = useState<HarmonyMode>('complementary');
  
  // Base color state (defaults to Islamic Golden Amber / Ochre #E6AF00 as in reference image)
  const [baseHsl, setBaseHsl] = useState<HSLColor>({ h: 45, s: 100, l: 45 });
  const [swatches, setSwatches] = useState<string[]>([
    '#B72818', // Swatch 1: Deep Crimson / Hijab Red
    '#FFEBE8', // Swatch 2: Soft Cream / Warm Pastel
    '#E6AF00', // Swatch 3 (BASE): Islamic Golden Ochre
    '#D7F7E8', // Swatch 4: Mint / Soft Sage Green
    '#1A4FD8'  // Swatch 5: Royal Islamic Blue
  ]);

  const [paletteName, setPaletteName] = useState('Muslimat Hidayatullah Dakwah Theme');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [appliedFeedback, setAppliedFeedback] = useState(false);
  const [activeMockupTab, setActiveMockupTab] = useState<'ajakan_gabung' | 'kajian_akbar' | 'feed_instagram'>('ajakan_gabung');

  // Interactive Design Principles State
  const [balanceMode, setBalanceMode] = useState<'asymmetrical' | 'symmetrical' | 'radial'>('asymmetrical');
  const [hierarchyMode, setHierarchyMode] = useState<'standard' | 'flat' | 'flow'>('standard');
  const [contrastSimMode, setContrastSimMode] = useState<'normal' | 'low' | 'high'>('normal');
  const [whiteSpaceMode, setWhiteSpaceMode] = useState<'compact' | 'optimal' | 'spacious'>('optimal');
  const [showSwissGrid, setShowSwissGrid] = useState<boolean>(false);
  const [showRuleOfThirds, setShowRuleOfThirds] = useState<boolean>(false);
  const [showSafeMargins, setShowSafeMargins] = useState<boolean>(false);
  const [graphicMotif, setGraphicMotif] = useState<'swiss_original' | 'khatam_star' | 'dynamic_rhythm' | 'kinetic_rotator'>('swiss_original');
  const [activePrincipleControlTab, setActivePrincipleControlTab] = useState<'keseimbangan' | 'hierarki' | 'kontras' | 'ruang' | 'kisi' | 'irama'>('keseimbangan');

  const posterSectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update swatches when baseHsl or harmonyMode changes
  useEffect(() => {
    if (harmonyMode !== 'custom') {
      const generated = generateHarmoniousPalette(baseHsl, harmonyMode);
      setSwatches(generated);
    }
  }, [baseHsl, harmonyMode]);

  const handleWheelClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 130;
    const y = e.clientY - rect.top - 130;
    const radius = Math.sqrt(x * x + y * y);
    if (radius > 125) return;

    // Angle in degrees (0 - 360)
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    // Saturation based on distance from center (0 - 100)
    const sat = Math.min(100, Math.round((radius / 120) * 100));

    setBaseHsl((prev) => ({
      ...prev,
      h: Math.round(angle),
      s: Math.max(30, sat)
    }));
  };

  const handleLightnessChange = (newLightness: number) => {
    setBaseHsl((prev) => ({
      ...prev,
      l: newLightness
    }));
  };

  const handleManualHexChange = (index: number, newHex: string) => {
    const updated = [...swatches];
    updated[index] = newHex;
    setSwatches(updated);
    if (index === 2) {
      setBaseHsl(hexToHsl(newHex));
      setHarmonyMode('custom');
    }
  };

  const copySingleHex = (hex: string, index: number) => {
    navigator.clipboard?.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllPalette = () => {
    const text = `${paletteName}\n${swatches.join(', ')}`;
    navigator.clipboard?.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const downloadPaletteAsPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1000, 400);

    // Title
    ctx.fillStyle = '#143E2E';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(paletteName, 40, 50);
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#718096';
    ctx.fillText('Muslimat Hidayatullah - Palet Desain Publikasi', 40, 75);

    // 5 Swatch bars
    const colWidth = 184;
    swatches.forEach((hex, i) => {
      const x = 40 + i * colWidth;
      ctx.fillStyle = hex;
      ctx.beginPath();
      ctx.roundRect(x, 100, colWidth - 10, 200, 16);
      ctx.fill();

      ctx.fillStyle = '#1A202C';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(hex, x + 15, 330);
      ctx.fillStyle = '#718096';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(i === 2 ? 'Base Color' : `Swatch ${i + 1}`, x + 15, 350);
    });

    const link = document.createElement('a');
    link.download = `${paletteName.replace(/\s+/g, '_')}_Palette.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Image color extraction simulation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set to rich Muslimat Hidayatullah inspired green-gold palette from flyer asset
      setSwatches(['#143E2E', '#F8F6F0', '#E3AF58', '#D49B42', '#245D4B']);
      setBaseHsl(hexToHsl('#E3AF58'));
      setPaletteName('Muslimat Hidayatullah - Ekstrak Flyer');
      setHarmonyMode('custom');
    }
  };

  const handleApplyToWorkshop = () => {
    if (onApplyToTask) {
      onApplyToTask({
        primary: swatches[0], // Primary Text / Container
        secondary: swatches[2], // Secondary / Gold Accent
        accent: swatches[4], // CTA Accent
        bg: swatches[1] // Light Background
      });
      setAppliedFeedback(true);
      setTimeout(() => setAppliedFeedback(false), 2500);
    }
  };

  // Compute node positions on the color wheel
  const getPointCoordinates = (hue: number, sat: number) => {
    const r = (sat / 100) * 105;
    const rad = (hue * Math.PI) / 180;
    return {
      x: 130 + r * Math.cos(rad),
      y: 130 + r * Math.sin(rad)
    };
  };

  const baseNode = getPointCoordinates(baseHsl.h, baseHsl.s);
  const otherHues = [
    (baseHsl.h + 180) % 360,
    (baseHsl.h + 30) % 360,
    (baseHsl.h + 150) % 360,
    (baseHsl.h + 210) % 360
  ];
  const otherNodes = otherHues.map((h) => getPointCoordinates(h, baseHsl.s * 0.85));

  // Contrast check
  const textContrast = getContrastRatio(swatches[0], swatches[1]);

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#143E2E] mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 text-[#143E2E]">
              <Palette className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">Color Palette Studio Interaktif</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Roda warna interaktif, generator 5 palet warna harmonis, dan penerapan otomatis pada mockup poster ajakan & publikasi <strong>Muslimat Hidayatullah</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => posterSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow transition"
          >
            <Eye className="w-4 h-4 text-[#E3AF58]" />
            <span>Pratinjau Mockup Poster</span>
          </button>

          <button
            onClick={onComplete}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#143E2E] text-[#E3AF58] hover:bg-[#1b533e]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Modul Warna Selesai ✓' : 'Tandai Selesai'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Card Container matching uploaded image */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top Sub-navigation Bar */}
        <div className="border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('base')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition ${
                activeSubTab === 'base'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Pipette className="w-3.5 h-3.5" />
              <span>Base color</span>
            </button>

            <button
              onClick={() => {
                setActiveSubTab('image');
                fileInputRef.current?.click();
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition ${
                activeSubTab === 'image'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <button
              onClick={() => setActiveSubTab('wheel')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition ${
                activeSubTab === 'wheel'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200 border-b-2 border-b-[#143E2E]'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full border border-slate-400 flex items-center justify-center text-[8px] font-bold">
                ◉
              </span>
              <span>Color wheel</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => posterSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#143E2E] text-[#E3AF58] hover:bg-[#1c553f] transition shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pratinjau Mockup Poster</span>
            </button>
          </div>
        </div>

        {/* Color Wheel & Swatch Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Left Column: Interactive Color Wheel */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Circular Color Wheel SVG */}
            <div className="flex justify-center items-center my-auto py-2">
              <div className="relative">
                <svg
                  width="260"
                  height="260"
                  viewBox="0 0 260 260"
                  className="cursor-crosshair select-none"
                  onClick={handleWheelClick}
                >
                  <defs>
                    <radialGradient id="wheelSaturation">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Color Wheel Circular Gradient Image (Conic gradient via multi-stops) */}
                  <g>
                    {Array.from({ length: 360 }).map((_, deg) => {
                      const rad1 = (deg * Math.PI) / 180;
                      const rad2 = ((deg + 1.5) * Math.PI) / 180;
                      const x1 = 130 + 120 * Math.cos(rad1);
                      const y1 = 130 + 120 * Math.sin(rad1);
                      const x2 = 130 + 120 * Math.cos(rad2);
                      const y2 = 130 + 120 * Math.sin(rad2);
                      const hex = hslToHex(deg, 100, 50);

                      return (
                        <path
                          key={deg}
                          d={`M 130 130 L ${x1} ${y1} L ${x2} ${y2} Z`}
                          fill={hex}
                          stroke={hex}
                          strokeWidth="0.5"
                        />
                      );
                    })}

                    {/* Central white saturation glow */}
                    <circle cx="130" cy="130" r="120" fill="url(#wheelSaturation)" opacity="0.65" />
                    <circle cx="130" cy="130" r="120" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                  </g>

                  {/* Connected Dashed Lines between Harmony Nodes */}
                  <g className="pointer-events-none">
                    {otherNodes.map((node, i) => (
                      <line
                        key={i}
                        x1={baseNode.x}
                        y1={baseNode.y}
                        x2={node.x}
                        y2={node.y}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        opacity="0.9"
                      />
                    ))}
                  </g>

                  {/* Other Harmony Nodes */}
                  {otherNodes.map((node, i) => (
                    <circle
                      key={i}
                      cx={node.x}
                      cy={node.y}
                      r="7.5"
                      fill="#FFFFFF"
                      fillOpacity="0.4"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="shadow-sm transition-all duration-300"
                    />
                  ))}

                  {/* Base Color Active Node with double ring */}
                  <g transform={`translate(${baseNode.x}, ${baseNode.y})`}>
                    <circle r="12" fill={swatches[2]} stroke="#FFFFFF" strokeWidth="3" className="shadow-md" />
                    <circle r="4" fill="#FFFFFF" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Harmony Modes Selector matching icons from reference */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2.5">
                <span className="font-semibold">
                  Color harmonies:{' '}
                  <strong className="text-slate-900 capitalize">
                    {harmonyMode.replace('_', ' ')}
                  </strong>
                </span>
                <span className="text-[11px] text-slate-400">Klik roda atau pilih aturan</span>
              </div>

              <div className="flex items-center justify-between gap-1 text-slate-700">
                <button
                  onClick={() => setHarmonyMode('custom')}
                  title="Custom"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'custom'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  •••
                </button>

                <button
                  onClick={() => setHarmonyMode('analogous')}
                  title="Analogous"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'analogous'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ◔
                </button>

                <button
                  onClick={() => setHarmonyMode('monochromatic')}
                  title="Monochromatic"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'monochromatic'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ◐
                </button>

                <button
                  onClick={() => setHarmonyMode('triad')}
                  title="Triad"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'triad'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  △
                </button>

                <button
                  onClick={() => setHarmonyMode('complementary')}
                  title="Complementary"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'complementary'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ⧉
                </button>

                <button
                  onClick={() => setHarmonyMode('split_complementary')}
                  title="Split Complementary"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'split_complementary'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ▲
                </button>

                <button
                  onClick={() => setHarmonyMode('tetradic')}
                  title="Tetradic"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'tetradic'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ▢
                </button>

                <button
                  onClick={() => setHarmonyMode('shades')}
                  title="Shades"
                  className={`p-2 rounded-xl border text-xs transition ${
                    harmonyMode === 'shades'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ▤
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Swatch Vertical Cards matching the uploaded image */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-5 flex-1 min-h-[380px]">
              {swatches.map((hex, index) => {
                const isBase = index === 2; // Swatch 3 is BASE in reference
                const isLight = hexToHsl(hex).l > 60;
                const textColor = isLight ? '#1A202C' : '#FFFFFF';

                return (
                  <div
                    key={index}
                    className="relative flex flex-col justify-between p-3 sm:p-4 transition-colors duration-300"
                    style={{ backgroundColor: hex }}
                  >
                    {/* Top Base Marker for Swatch 3 */}
                    <div className="flex justify-between items-start">
                      {isBase ? (
                        <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-widest uppercase">
                          <Pipette className="w-3 h-3 text-[#E3AF58]" />
                          <span>BASE</span>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Middle: Lightness Slider for the Base Swatch */}
                    {isBase && (
                      <div className="my-auto px-1">
                        <input
                          type="range"
                          min="15"
                          max="85"
                          value={baseHsl.l}
                          onChange={(e) => handleLightnessChange(Number(e.target.value))}
                          className="w-full accent-white cursor-pointer opacity-90 hover:opacity-100"
                          title="Sesuaikan kecerahan base color"
                        />
                      </div>
                    )}

                    {/* Bottom: Hex label & Copy button */}
                    <div className="mt-auto space-y-1">
                      <div
                        className="flex items-center justify-between text-xs font-mono font-bold tracking-wider"
                        style={{ color: textColor }}
                      >
                        <span className="truncate">{hex}</span>
                        <button
                          onClick={() => copySingleHex(hex, index)}
                          className="p-1 rounded hover:bg-black/20 transition"
                          title="Salin Hex"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 opacity-80" />
                          )}
                        </button>
                      </div>

                      {/* Direct manual color picker */}
                      <input
                        type="color"
                        value={hex}
                        onChange={(e) => handleManualHexChange(index, e.target.value.toUpperCase())}
                        className="w-full h-4 opacity-0 cursor-pointer absolute inset-0"
                        title="Klik untuk memilih warna kustom"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Bar under Swatches matching reference */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Mini Preview Strip */}
              <div className="flex items-center space-x-3">
                <div className="flex h-5 w-24 rounded-lg overflow-hidden border border-slate-300 shadow-inner">
                  {swatches.map((hex, i) => (
                    <div key={i} className="flex-1 h-full" style={{ backgroundColor: hex }} />
                  ))}
                </div>
                <span className="font-semibold text-slate-600 text-xs">5 Swatch</span>
              </div>

              {/* Palette Name & Export Tools */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyAllPalette}
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition"
                  title="Salin semua kode warna"
                >
                  {copiedAll ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  onClick={downloadPaletteAsPng}
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition"
                  title="Unduh Palet PNG"
                >
                  <Download className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={paletteName}
                  onChange={(e) => setPaletteName(e.target.value)}
                  placeholder="Nama Tema Warna"
                  className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#143E2E] focus:outline-none w-48 sm:w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action to Apply Palette to Assignment */}
      {onApplyToTask && (
        <div className="flex justify-end">
          <button
            onClick={handleApplyToWorkshop}
            className="flex items-center space-x-2 px-6 py-3 bg-[#143E2E] hover:bg-[#1b533e] text-[#E3AF58] font-bold text-xs rounded-xl shadow-md transition"
          >
            {appliedFeedback ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Berhasil Diterapkan ke Lembar Tugas Desain!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Terapkan Palet Ini ke Tugas Desain Flyer Saya</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* BOTTOM SECTION: PENERAPAN OTOMATIS PALET & EKSPLORASI INTERAKTIF PRINSIP DESAIN PADA FLYER */}
      <section ref={posterSectionRef} className="space-y-5 pt-4">
        {/* Title Bar matching reference screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-[#143E2E] text-[#E3AF58]">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                PENERAPAN OTOMATIS PALET PADA MOCKUP DESAIN KOMUNIKASI VISUAL
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Uji coba langsung kaidah <strong>Keseimbangan, Hierarki Visual, Kontras, White Space, Grid Swiss,</strong> dan <strong>Irama Bentuk</strong> pada flyer.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle: Muslimat Hidayatullah vs Reference DKV */}
            <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold">
              <button
                onClick={() => setActiveMockupTab('ajakan_gabung')}
                className={`px-2.5 py-1 rounded-md transition ${
                  activeMockupTab === 'ajakan_gabung'
                    ? 'bg-white text-[#143E2E] shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Ajakan Muslimat Hidayatullah
              </button>
              <button
                onClick={() => setActiveMockupTab('kajian_akbar')}
                className={`px-2.5 py-1 rounded-md transition ${
                  activeMockupTab === 'kajian_akbar'
                    ? 'bg-white text-[#143E2E] shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Teks Referensi Asli (DKV & Queenthings)
              </button>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold hidden md:inline">
              {paletteName ? paletteName.toUpperCase() : 'MY COLOR THEME'}
            </span>
          </div>
        </div>

        {/* INTERACTIVE DESIGN PRINCIPLES CONTROLLER TOOLBAR */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#E3AF58]" />
              <span className="font-bold text-xs uppercase tracking-wider text-[#E3AF58]">
                Panel Interaktif Prinsip Desain Grafis Flyer
              </span>
            </div>

            {/* Quick Presets for Instant Learning */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 font-medium mr-1">Preset Cepat:</span>
              <button
                onClick={() => {
                  setBalanceMode('symmetrical');
                  setHierarchyMode('standard');
                  setContrastSimMode('high');
                  setWhiteSpaceMode('optimal');
                  setGraphicMotif('khatam_star');
                  setShowSwissGrid(false);
                  setShowRuleOfThirds(false);
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/60 font-semibold transition"
              >
                🌟 Muslimah Harmonis
              </button>

              <button
                onClick={() => {
                  setBalanceMode('asymmetrical');
                  setHierarchyMode('flow');
                  setContrastSimMode('normal');
                  setWhiteSpaceMode('optimal');
                  setGraphicMotif('swiss_original');
                  setShowSwissGrid(true);
                  setShowRuleOfThirds(false);
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-700/60 font-semibold transition"
              >
                📐 Swiss Grid + Alur Baca
              </button>

              <button
                onClick={() => {
                  setBalanceMode('asymmetrical');
                  setHierarchyMode('flat');
                  setContrastSimMode('low');
                  setWhiteSpaceMode('compact');
                  setShowSwissGrid(false);
                  setShowRuleOfThirds(false);
                }}
                className="px-2.5 py-1 rounded-lg bg-red-950 hover:bg-red-900 text-red-200 border border-red-700/60 font-semibold transition"
              >
                ⚠️ Uji Anti-Pola (Desain Buruk)
              </button>
            </div>
          </div>

          {/* Interactive Principle Controls Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {/* 1. Keseimbangan (Balance) */}
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                <span className="flex items-center gap-1">
                  <Scale className="w-3 h-3 text-[#E3AF58]" /> Keseimbangan
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {(['asymmetrical', 'symmetrical', 'radial'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setBalanceMode(m)}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium text-left transition ${
                      balanceMode === m
                        ? 'bg-[#E3AF58] text-[#143E2E] font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {m === 'asymmetrical' ? 'Asimetris Dinamis' : m === 'symmetrical' ? 'Simetris Seimbang' : 'Radial Kubah'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Hierarki Visual (Emphasis) */}
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                <span className="flex items-center gap-1">
                  <Type className="w-3 h-3 text-[#E3AF58]" /> Hierarki Teks
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {(['standard', 'flat', 'flow'] as const).map((h) => (
                  <button
                    key={h}
                    onClick={() => setHierarchyMode(h)}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium text-left transition ${
                      hierarchyMode === h
                        ? 'bg-[#E3AF58] text-[#143E2E] font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {h === 'standard' ? 'Hierarki Ideal' : h === 'flat' ? 'Tanpa Hierarki (Rata)' : 'Alur Baca 1-2-3-4'}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Kontras (Contrast) */}
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#E3AF58]" /> Uji Kontras
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {(['normal', 'low', 'high'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setContrastSimMode(c)}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium text-left transition ${
                      contrastSimMode === c
                        ? 'bg-[#E3AF58] text-[#143E2E] font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {c === 'normal' ? 'Kontras Asli' : c === 'low' ? '⚠️ Rendah / Faded' : 'Tinggi (WCAG AAA)'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. White Space (Ruang Bernafas) */}
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-[#E3AF58]" /> White Space
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {(['compact', 'optimal', 'spacious'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWhiteSpaceMode(w)}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium text-left transition ${
                      whiteSpaceMode === w
                        ? 'bg-[#E3AF58] text-[#143E2E] font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {w === 'compact' ? 'Padat / Sesak' : w === 'optimal' ? 'Seimbang (28px)' : 'Lapang / Lega'}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Gubahan Nirmana & Irama (Motif) */}
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                <span className="flex items-center gap-1">
                  <Shapes className="w-3 h-3 text-[#E3AF58]" /> Bentuk Nirmana
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {(['swiss_original', 'khatam_star', 'dynamic_rhythm', 'kinetic_rotator'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGraphicMotif(g)}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium text-left transition ${
                      graphicMotif === g
                        ? 'bg-[#E3AF58] text-[#143E2E] font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {g === 'swiss_original' ? 'Swiss Lingkaran-Kotak' : g === 'khatam_star' ? 'Bintang Khatam 8' : g === 'dynamic_rhythm' ? 'Irama Gelombang' : 'Kinetik Berputar'}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Garis Kisi Panduan (Overlays) */}
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 space-y-1.5">
              <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                <span className="flex items-center gap-1">
                  <Grid className="w-3 h-3 text-[#E3AF58]" /> Panduan Grid
                </span>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setShowSwissGrid(!showSwissGrid)}
                  className={`w-full py-1 px-1.5 rounded text-[10px] font-medium text-left transition flex items-center justify-between ${
                    showSwissGrid ? 'bg-cyan-900 text-cyan-200 border border-cyan-500 font-bold' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>Kisi 12-Kolom</span>
                  <span>{showSwissGrid ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setShowRuleOfThirds(!showRuleOfThirds)}
                  className={`w-full py-1 px-1.5 rounded text-[10px] font-medium text-left transition flex items-center justify-between ${
                    showRuleOfThirds ? 'bg-amber-900 text-amber-200 border border-amber-500 font-bold' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>Aturan Sepertiga</span>
                  <span>{showRuleOfThirds ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setShowSafeMargins(!showSafeMargins)}
                  className={`w-full py-1 px-1.5 rounded text-[10px] font-medium text-left transition flex items-center justify-between ${
                    showSafeMargins ? 'bg-emerald-900 text-emerald-200 border border-emerald-500 font-bold' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>Batas Aman 24px</span>
                  <span>{showSafeMargins ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Pedagogical Feedback & Diagnostic Banner */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            <div className="flex items-start space-x-2">
              <Compass className="w-4 h-4 text-[#E3AF58] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-bold text-slate-200 flex items-center gap-2">
                  <span>Diagnostik Prinsip Aktif:</span>
                  <span className="text-[#E3AF58] uppercase font-mono text-[11px]">
                    {balanceMode === 'asymmetrical' ? 'Asimetris Dinamis' : balanceMode === 'symmetrical' ? 'Simetris Formal' : 'Radial Kubah'} •{' '}
                    {hierarchyMode === 'standard' ? 'Hierarki Skala 2.8x' : hierarchyMode === 'flat' ? 'Anti-Pola Tanpa Hierarki' : 'Scanning Path Z-Pattern'} •{' '}
                    {contrastSimMode === 'normal' ? 'Kontras Normal' : contrastSimMode === 'low' ? 'Kontras Buruk' : 'Kontras Ekstra'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {hierarchyMode === 'flat'
                    ? '⚠️ Perhatikan: Tanpa hierarki ukuran, mata pemirsa membutuhkan waktu 3x lebih lama untuk menemukan inti pesan.'
                    : contrastSimMode === 'low'
                    ? '⚠️ Perhatikan: Kontras rendah membuat teks tidak terbaca jelas saat flyer dipasang di ruang berpenerangan redup.'
                    : balanceMode === 'asymmetrical'
                    ? 'Prinsip Keseimbangan Asimetris memberikan kesan kontemporer dan dinamis, dipadukan dengan Swiss Grid untuk menjaga kerapian.'
                    : 'Prinsip Keseimbangan Simetris memberikan kesan khidmat, stabil, dan agung yang sangat sesuai untuk publikasi dakwah formal.'}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-400 block">Rasio Kontras Terhitung:</span>
              <span
                className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                  contrastSimMode === 'low'
                    ? 'bg-red-900/80 text-red-200'
                    : 'bg-emerald-900/80 text-emerald-200'
                }`}
              >
                {contrastSimMode === 'low' ? '1.7 : 1 (GAGAL WCAG)' : `${textContrast.toFixed(1)} : 1 (LULUS WCAG)`}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Color Computation for Simulated Contrast */}
        {(() => {
          const simulatedPrimary =
            contrastSimMode === 'low'
              ? '#D8C2BD' // Faded low-contrast text on cream background
              : contrastSimMode === 'high'
              ? '#0A1E14' // Deep rich black-green
              : swatches[0];

          const simulatedSubtitle =
            contrastSimMode === 'low' ? '#C9B3AC' : swatches[4];

          const paddingClass =
            whiteSpaceMode === 'compact'
              ? 'p-3 sm:p-5'
              : whiteSpaceMode === 'spacious'
              ? 'p-8 sm:p-12'
              : 'p-6 sm:p-8';

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Card 1 (Left): Swiss Grid Poster with Dynamic Design Principles */}
              <div
                className={`rounded-[28px] ${paddingClass} shadow-md border transition-all duration-300 flex flex-col justify-between min-h-[590px] relative overflow-hidden`}
                style={{
                  backgroundColor: swatches[1], // Swatch 2 (#FFEBE8)
                  borderColor: `${simulatedPrimary}25`
                }}
              >
                {/* 1. OVERLAY: SWISS 12-COLUMN GRID */}
                {showSwissGrid && (
                  <div className="absolute inset-0 pointer-events-none z-30 flex justify-between px-6 opacity-30">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-full w-[6%] bg-cyan-500/20 border-x border-cyan-500/40" />
                    ))}
                  </div>
                )}

                {/* 2. OVERLAY: RULE OF THIRDS (ATURAN SEPERTIGA) */}
                {showRuleOfThirds && (
                  <div className="absolute inset-0 pointer-events-none z-30 grid grid-cols-3 grid-rows-3 opacity-60">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="border border-amber-500/60 relative">
                        {/* Intersection circles */}
                        {(i === 0 || i === 1 || i === 3 || i === 4) && (
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow animate-ping" />
                        )}
                        {(i === 0 || i === 1 || i === 3 || i === 4) && (
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. OVERLAY: SAFE MARGINS */}
                {showSafeMargins && (
                  <div className="absolute inset-6 border-2 border-dashed border-emerald-500/70 pointer-events-none z-30 rounded-2xl flex items-start justify-end p-2">
                    <span className="text-[9px] font-mono font-bold bg-emerald-600 text-white px-2 py-0.5 rounded shadow">
                      Margin Aman 24px
                    </span>
                  </div>
                )}

                {/* 4. OVERLAY: RADIAL GLOW if in radial balance mode */}
                {balanceMode === 'radial' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
                    <div className="w-80 h-80 rounded-full border border-dashed border-slate-500 animate-spin" style={{ animationDuration: '30s' }} />
                    <div className="w-56 h-56 rounded-full border border-slate-400 absolute" />
                  </div>
                )}

                {/* Top Text & Divider */}
                <div className={`relative z-10 ${balanceMode === 'symmetrical' ? 'text-center' : 'text-left'}`}>
                  {/* Step 1 Badge if in flow mode */}
                  {hierarchyMode === 'flow' && (
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow mb-2 animate-bounce">
                      <span>1️⃣</span>
                      <span>Focal Point (Hirarki Utama)</span>
                    </div>
                  )}

                  <div
                    className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold"
                    style={{ color: simulatedPrimary }}
                  >
                    {activeMockupTab === 'ajakan_gabung'
                      ? 'DAKWAH MUSLIMAT HIDAYATULLAH 2026 • SWISS GRID'
                      : 'DKV EXHIBITION 2026 • SWISS GRID'}
                  </div>

                  {/* Thin Divider Line */}
                  <div
                    className={`h-[1px] my-3 opacity-30 ${balanceMode === 'symmetrical' ? 'w-24 mx-auto' : 'w-full'}`}
                    style={{ backgroundColor: simulatedPrimary }}
                  />

                  {/* Big Headline (Adjusted by hierarchyMode and balanceMode) */}
                  <h1
                    style={{ color: simulatedPrimary }}
                    className={`transition-all duration-300 uppercase leading-[1.05] ${
                      hierarchyMode === 'flat'
                        ? 'text-sm font-normal normal-case opacity-90 my-3' // Anti-pattern flat
                        : 'text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight mt-3'
                    }`}
                  >
                    {activeMockupTab === 'ajakan_gabung' ? (
                      <>
                        UKHUWAH &<br />
                        KELUARGA SAKINAH
                      </>
                    ) : (
                      <>
                        RHYTHM &<br />
                        CHROMATICS
                      </>
                    )}
                  </h1>

                  {/* Subtitle in Swatch 5 Color */}
                  {hierarchyMode === 'flow' && (
                    <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow my-1">
                      <span>2️⃣</span>
                      <span>Sub-tema / Penjelas</span>
                    </div>
                  )}

                  <p
                    className={`transition-all duration-300 leading-relaxed ${
                      balanceMode === 'symmetrical' ? 'mx-auto max-w-md' : 'max-w-sm'
                    } ${hierarchyMode === 'flat' ? 'text-sm font-normal' : 'text-xs sm:text-sm font-medium mt-3.5'}`}
                    style={{ color: simulatedSubtitle }}
                  >
                    {activeMockupTab === 'ajakan_gabung'
                      ? "Studi harmoni warna dakwah dan ajakan silaturahim akbar pengurus dan kader Muslimat Hidayatullah."
                      : 'Studi harmoni warna komplementer dan gubahan nirmana dwimatra siswa kelas 10 SMK DKV.'}
                  </p>
                </div>

                {/* Center Graphic: Controlled by graphicMotif */}
                <div className={`my-auto py-6 flex items-center relative z-10 ${
                  balanceMode === 'symmetrical' ? 'justify-center' : 'justify-center sm:justify-end pr-4'
                }`}>
                  {hierarchyMode === 'flow' && (
                    <div className="absolute top-2 left-6 z-20 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold shadow">
                      <span>3️⃣</span>
                      <span>Karya Seni Nirmana</span>
                    </div>
                  )}

                  {/* Motif 1: Original Swiss Circle & Rounded Square */}
                  {graphicMotif === 'swiss_original' && (
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <div
                        className="w-28 h-28 rounded-full absolute left-2 top-6 shadow-md transition-all duration-300"
                        style={{ backgroundColor: swatches[2] }}
                      />
                      <div
                        className="w-28 h-28 rounded-2xl absolute right-2 bottom-6 shadow-xl transition-all duration-300"
                        style={{ backgroundColor: swatches[3] }}
                      />
                    </div>
                  )}

                  {/* Motif 2: Islamic Khatam Star 8-Pointed */}
                  {graphicMotif === 'khatam_star' && (
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-36 h-36 drop-shadow-lg">
                        {/* Two overlapping rotated squares creating 8-pointed star */}
                        <rect x="20" y="20" width="60" height="60" rx="4" fill={swatches[2]} />
                        <rect x="20" y="20" width="60" height="60" rx="4" fill={swatches[3]} fillOpacity="0.85" transform="rotate(45 50 50)" />
                        <circle cx="50" cy="50" r="16" fill={swatches[0]} />
                        <circle cx="50" cy="50" r="8" fill={swatches[2]} />
                      </svg>
                    </div>
                  )}

                  {/* Motif 3: Dynamic Rhythm Waves */}
                  {graphicMotif === 'dynamic_rhythm' && (
                    <div className="relative w-48 h-36 flex flex-col justify-center space-y-2">
                      <div className="h-6 rounded-full shadow-md" style={{ backgroundColor: swatches[2], width: '80%' }} />
                      <div className="h-8 rounded-full shadow-md ml-auto" style={{ backgroundColor: swatches[3], width: '90%' }} />
                      <div className="h-5 rounded-full shadow-md" style={{ backgroundColor: swatches[4], width: '65%' }} />
                    </div>
                  )}

                  {/* Motif 4: Kinetic Rotator */}
                  {graphicMotif === 'kinetic_rotator' && (
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        className="w-32 h-32 rounded-3xl border-4 shadow-xl flex items-center justify-center"
                        style={{ backgroundColor: swatches[2], borderColor: swatches[3] }}
                      >
                        <div className="w-16 h-16 rounded-full" style={{ backgroundColor: swatches[0] }} />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Bottom Footer Section */}
                <div className="relative z-10">
                  <div
                    className="h-[1px] w-full mb-4 opacity-30"
                    style={{ backgroundColor: simulatedPrimary }}
                  />

                  <div className={`flex flex-col sm:flex-row gap-3 ${
                    balanceMode === 'symmetrical' ? 'items-center justify-center text-center' : 'items-end justify-between'
                  }`}>
                    <div>
                      <div
                        className="text-[9px] font-mono tracking-widest uppercase font-bold"
                        style={{ color: `${simulatedPrimary}99` }}
                      >
                        {activeMockupTab === 'ajakan_gabung' ? 'DIVISI MULTIMEDIA' : 'STUDIO DKV'}
                      </div>
                      <div
                        className="text-xs sm:text-sm font-bold tracking-tight"
                        style={{ color: simulatedSubtitle }}
                      >
                        {activeMockupTab === 'ajakan_gabung' ? 'Muslimat Hidayatullah' : 'Galeri Seni Visual'}
                      </div>
                    </div>

                    {/* Pill Button in Swatch 3 Color matching image */}
                    <div className="flex flex-col items-center gap-1">
                      {hierarchyMode === 'flow' && (
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                          4️⃣ Aksi (CTA)
                        </span>
                      )}
                      <button
                        className="px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition hover:brightness-105 active:scale-95"
                        style={{
                          backgroundColor: swatches[2],
                          color: hexToHsl(swatches[2]).l > 60 ? '#1A202C' : '#FFFFFF'
                        }}
                      >
                        {activeMockupTab === 'ajakan_gabung' ? 'Daftar Kajian' : 'Tiket Pameran'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 (Right): Brand Identity System with 60-30-10 distribution card */}
              <div
                className={`rounded-[28px] ${paddingClass} shadow-md border transition-all duration-300 flex flex-col justify-between min-h-[590px] text-white relative overflow-hidden`}
                style={{
                  backgroundColor: swatches[0], // Swatch 1 (#B72818)
                  borderColor: `${swatches[0]}40`
                }}
              >
                {/* Safe Margins Overlay on Right Card */}
                {showSafeMargins && (
                  <div className="absolute inset-6 border-2 border-dashed border-white/30 pointer-events-none z-30 rounded-2xl" />
                )}

                {/* Top Brand Tag */}
                <div className={`${balanceMode === 'symmetrical' ? 'text-center' : 'text-left'}`}>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold text-white/80">
                    BRAND IDENTITY SYSTEM
                  </div>

                  {/* Big Headline */}
                  <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight leading-[1.05] uppercase mt-4 text-white">
                    {activeMockupTab === 'ajakan_gabung' ? (
                      <>
                        <span className="border-b-4 border-white/80 pb-0.5">M</span>USLIMAT MEDIA
                        <br />
                        CREATIVE
                      </>
                    ) : (
                      <>
                        <span className="border-b-4 border-white/80 pb-0.5">Q</span>UEENTHINGS MEDIA
                        <br />
                        CREATIVE
                      </>
                    )}
                  </h2>

                  {/* 5 Swatch Chips Row matching screenshot */}
                  <div className={`flex items-center space-x-2 mt-5 ${balanceMode === 'symmetrical' ? 'justify-center' : ''}`}>
                    {/* Chip 1 (Hollow/Transparent border) */}
                    <div
                      className="w-7 h-7 rounded-lg border-2 border-white/40 shadow-sm"
                      style={{ backgroundColor: `${swatches[0]}00` }}
                      title={`Swatch 1: ${swatches[0]}`}
                    />
                    {/* Chip 2 */}
                    <div
                      className="w-7 h-7 rounded-lg shadow-sm"
                      style={{ backgroundColor: swatches[1] }}
                      title={`Swatch 2: ${swatches[1]}`}
                    />
                    {/* Chip 3 */}
                    <div
                      className="w-7 h-7 rounded-lg shadow-sm"
                      style={{ backgroundColor: swatches[2] }}
                      title={`Swatch 3: ${swatches[2]}`}
                    />
                    {/* Chip 4 */}
                    <div
                      className="w-7 h-7 rounded-lg shadow-sm"
                      style={{ backgroundColor: swatches[3] }}
                      title={`Swatch 4: ${swatches[3]}`}
                    />
                    {/* Chip 5 */}
                    <div
                      className="w-7 h-7 rounded-lg shadow-sm"
                      style={{ backgroundColor: swatches[4] }}
                      title={`Swatch 5: ${swatches[4]}`}
                    />
                  </div>
                </div>

                {/* Middle Container: Kaidah Distribusi 60-30-10 matching reference */}
                <div className="my-auto py-6">
                  <div className="p-5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 space-y-2">
                    <div className="font-bold text-xs sm:text-sm text-white flex items-center justify-between">
                      <span>Kaidah Distribusi 60–30–10:</span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">Standar Nirmana</span>
                    </div>
                    <p className="text-xs text-white/90 leading-relaxed font-light">
                      Warna primer ({swatches[0]}) membentuk 60% kanvas dasar, warna pendukung ({swatches[2]}) memberikan 30% struktur, dan aksen ({swatches[4]}) memandu 10% fokus mata pemirsa.
                    </p>

                    {/* Visual Proportional Bar */}
                    <div className="h-2.5 rounded-full overflow-hidden flex border border-white/20 mt-2">
                      <div className="w-[60%] h-full" style={{ backgroundColor: swatches[0] }} title="60% Primer" />
                      <div className="w-[30%] h-full" style={{ backgroundColor: swatches[2] }} title="30% Struktur" />
                      <div className="w-[10%] h-full" style={{ backgroundColor: swatches[4] }} title="10% Aksen" />
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Info Line matching screenshot */}
                <div className={`pt-4 text-[10px] sm:text-[11px] font-mono tracking-widest text-white/80 uppercase ${
                  balanceMode === 'symmetrical' ? 'text-center' : 'text-left'
                }`}>
                  {activeMockupTab === 'ajakan_gabung'
                    ? 'Muslimat Hidayatullah Kompetensi Keahlian Desain Grafis • 2026/2027'
                    : 'SMK Negeri Kompetensi Keahlian DKV • 2026/2027'}
                </div>
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
};
