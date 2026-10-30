import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Shapes,
  Sliders,
  RotateCw,
  Sparkles,
  CheckCircle2,
  Info,
  Maximize2,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';

interface NirmanaStudioProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const NirmanaStudio: React.FC<NirmanaStudioProps> = ({ onComplete, isCompleted }) => {
  const [nirmanaType, setNirmanaType] = useState<'dots' | 'lines' | 'shapes' | 'islamic_khatam' | 'rhythm'>('islamic_khatam');
  const [elementCount, setElementCount] = useState(16);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [symmetryMode, setSymmetryMode] = useState<'radial' | 'bilateral' | 'dynamic_asymmetric'>('radial');
  const [colorTheme, setColorTheme] = useState<'emerald_gold' | 'sage_cream' | 'terracotta_sand' | 'monochrome'>('emerald_gold');
  const [isCopied, setIsCopied] = useState(false);

  const colors = {
    emerald_gold: { bg: '#103426', primary: '#E3AF58', secondary: '#FAF7F2', accent: '#D49B42' },
    sage_cream: { bg: '#F8F6F0', primary: '#1B4D3E', secondary: '#52795D', accent: '#E3AF58' },
    terracotta_sand: { bg: '#FAF4EE', primary: '#8D4B32', secondary: '#DDA77B', accent: '#1B4D3E' },
    monochrome: { bg: '#174230', primary: '#FFFFFF', secondary: '#A3B899', accent: '#F4EFE6' },
  }[colorTheme];

  const handleCopySvg = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#143E2E] mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 text-[#143E2E]">
              <Shapes className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">Studio Nirmana 2D (Dasar Desain Grafis)</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Nirmana adalah penataan unsur-unsur rupa (titik, garis, bidang, warna, dan tekstur) menjadi kesatuan harmonis.
            Dalam publikasi Muslimah, nirmana simetris melambangkan keseimbangan (Mizan) dan ketenangan visual.
          </p>
        </div>

        <button
          onClick={onComplete}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-[#143E2E] text-[#E3AF58] hover:bg-[#1b533e]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Modul Nirmana Selesai ✓' : 'Tandai Modul Dipahami'}</span>
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Sidebar */}
        <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-[#D49B42]" />
            <h3 className="font-bold text-sm text-[#143E2E]">Pengaturan Unsur Rupa</h3>
          </div>

          {/* Unsur Rupa Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Jenis Eksplorasi Nirmana:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setNirmanaType('islamic_khatam')}
                className={`p-2.5 rounded-xl border text-left transition font-medium flex items-center justify-between ${
                  nirmanaType === 'islamic_khatam'
                    ? 'border-[#143E2E] bg-emerald-50 text-[#143E2E] font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Bintang Khatam 8</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D49B42]" />
              </button>

              <button
                onClick={() => setNirmanaType('dots')}
                className={`p-2.5 rounded-xl border text-left transition font-medium ${
                  nirmanaType === 'dots'
                    ? 'border-[#143E2E] bg-emerald-50 text-[#143E2E] font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Titik & Gradasi (Stippling)
              </button>

              <button
                onClick={() => setNirmanaType('lines')}
                className={`p-2.5 rounded-xl border text-left transition font-medium ${
                  nirmanaType === 'lines'
                    ? 'border-[#143E2E] bg-emerald-50 text-[#143E2E] font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Garis Berirama (Contour)
              </button>

              <button
                onClick={() => setNirmanaType('shapes')}
                className={`p-2.5 rounded-xl border text-left transition font-medium ${
                  nirmanaType === 'shapes'
                    ? 'border-[#143E2E] bg-emerald-50 text-[#143E2E] font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Bidang Geometris (Polygons)
              </button>

              <button
                onClick={() => setNirmanaType('rhythm')}
                className={`p-2.5 rounded-xl border text-left transition font-medium col-span-2 ${
                  nirmanaType === 'rhythm'
                    ? 'border-[#143E2E] bg-emerald-50 text-[#143E2E] font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                Irama & Pengulangan (Repetition & Flow)
              </button>
            </div>
          </div>

          {/* Symmetry Principle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Prinsip Keseimbangan (Balance):
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                onClick={() => setSymmetryMode('radial')}
                className={`py-2 px-2 rounded-lg text-center font-medium border transition ${
                  symmetryMode === 'radial'
                    ? 'bg-[#143E2E] text-white border-[#143E2E]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Radial (Kubah)
              </button>
              <button
                onClick={() => setSymmetryMode('bilateral')}
                className={`py-2 px-2 rounded-lg text-center font-medium border transition ${
                  symmetryMode === 'bilateral'
                    ? 'bg-[#143E2E] text-white border-[#143E2E]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Simetris 2 Sisi
              </button>
              <button
                onClick={() => setSymmetryMode('dynamic_asymmetric')}
                className={`py-2 px-2 rounded-lg text-center font-medium border transition ${
                  symmetryMode === 'dynamic_asymmetric'
                    ? 'bg-[#143E2E] text-white border-[#143E2E]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Asimetris Dinamis
              </button>
            </div>
          </div>

          {/* Sliders: Count, Scale, Rotation */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span className="font-semibold">Jumlah Elemen / Kerapatan:</span>
                <span className="font-bold text-[#143E2E]">{elementCount}</span>
              </div>
              <input
                type="range"
                min="4"
                max="36"
                step="2"
                value={elementCount}
                onChange={(e) => setElementCount(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span className="font-semibold">Skala & Pembesaran:</span>
                <span className="font-bold text-[#143E2E]">{scaleFactor.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={scaleFactor}
                onChange={(e) => setScaleFactor(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span className="font-semibold">Sudut Rotasi:</span>
                <span className="font-bold text-[#143E2E]">{rotationAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>
          </div>

          {/* Color Scheme for Nirmana */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Tema Warna Nirmana:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setColorTheme('emerald_gold')}
                className={`p-2 rounded-xl border flex items-center space-x-2 transition ${
                  colorTheme === 'emerald_gold' ? 'border-[#143E2E] bg-emerald-50' : 'border-slate-200'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-[#103426] border border-[#E3AF58]" />
                <span className="font-medium text-slate-800">Emerald & Emas</span>
              </button>

              <button
                onClick={() => setColorTheme('sage_cream')}
                className={`p-2 rounded-xl border flex items-center space-x-2 transition ${
                  colorTheme === 'sage_cream' ? 'border-[#143E2E] bg-emerald-50' : 'border-slate-200'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-[#52795D] border border-amber-300" />
                <span className="font-medium text-slate-800">Sage & Krem</span>
              </button>

              <button
                onClick={() => setColorTheme('terracotta_sand')}
                className={`p-2 rounded-xl border flex items-center space-x-2 transition ${
                  colorTheme === 'terracotta_sand' ? 'border-[#143E2E] bg-emerald-50' : 'border-slate-200'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-[#8D4B32] border border-amber-200" />
                <span className="font-medium text-slate-800">Terracotta Sand</span>
              </button>

              <button
                onClick={() => setColorTheme('monochrome')}
                className={`p-2 rounded-xl border flex items-center space-x-2 transition ${
                  colorTheme === 'monochrome' ? 'border-[#143E2E] bg-emerald-50' : 'border-slate-200'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-[#174230] border border-white" />
                <span className="font-medium text-slate-800">Monokrom Hijau</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live SVG Interactive Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className="w-full aspect-square sm:h-[480px] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-lg border-2 border-[#D49B42]/50 transition-colors duration-500"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between text-xs relative z-10">
              <span
                className="px-3 py-1 rounded-full font-bold backdrop-blur-md uppercase tracking-wider"
                style={{
                  backgroundColor: `${colors.primary}25`,
                  color: colors.primary,
                  borderColor: `${colors.primary}60`,
                  borderWidth: '1px'
                }}
              >
                Prinsip Nirmana: {nirmanaType.toUpperCase()}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setRotationAngle((prev) => (prev + 45) % 360);
                  }}
                  className="p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white transition"
                  title="Putar 45°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopySvg}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white transition"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Tersalin' : 'Preset'}</span>
                </button>
              </div>
            </div>

            {/* Dynamic Interactive SVG Canvas */}
            <div className="w-full h-full flex items-center justify-center my-auto relative">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full max-h-[380px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform={`translate(200, 200) scale(${scaleFactor}) rotate(${rotationAngle}) translate(-200, -200)`}
                  className="transition-transform duration-200"
                >
                  {/* Outer circle frame guide */}
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="0.8"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />

                  {/* Render based on nirmanaType */}
                  {nirmanaType === 'islamic_khatam' && (
                    <g>
                      {Array.from({ length: Math.min(elementCount, 24) }).map((_, i) => {
                        const step = 360 / Math.min(elementCount, 24);
                        const angle = i * step;
                        return (
                          <g key={i} transform={`rotate(${angle} 200 200)`}>
                            {/* 8-pointed star interlocking kites */}
                            <polygon
                              points="200,50 225,125 300,125 240,175 260,250 200,205 140,250 160,175 100,125 175,125"
                              fill={i % 2 === 0 ? colors.primary : colors.accent}
                              fillOpacity={0.25}
                              stroke={colors.primary}
                              strokeWidth="1.5"
                            />
                            <circle cx="200" cy="70" r="4" fill={colors.secondary} />
                          </g>
                        );
                      })}
                      {/* Central Golden Rosette */}
                      <circle cx="200" cy="200" r="30" fill={colors.accent} fillOpacity="0.4" stroke={colors.primary} strokeWidth="2" />
                      <circle cx="200" cy="200" r="14" fill={colors.primary} />
                    </g>
                  )}

                  {nirmanaType === 'dots' && (
                    <g>
                      {Array.from({ length: elementCount * 5 }).map((_, i) => {
                        const ring = Math.floor(i / elementCount);
                        const radius = 30 + ring * 28;
                        const angle = (i % elementCount) * ((2 * Math.PI) / elementCount) + (ring % 2 ? 0.2 : 0);
                        const cx = 200 + radius * Math.cos(angle);
                        const cy = 200 + radius * Math.sin(angle);
                        const r = Math.max(1.5, 7 - ring * 0.9);
                        return (
                          <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill={ring % 2 === 0 ? colors.primary : colors.accent}
                            opacity={0.85 - ring * 0.12}
                          />
                        );
                      })}
                    </g>
                  )}

                  {nirmanaType === 'lines' && (
                    <g>
                      {Array.from({ length: elementCount }).map((_, i) => {
                        const offset = (i - elementCount / 2) * (280 / elementCount);
                        const curve = Math.sin((i / elementCount) * Math.PI) * 60;
                        return (
                          <path
                            key={i}
                            d={`M 40 ${200 + offset} Q 200 ${200 + offset + curve} 360 ${200 + offset}`}
                            fill="none"
                            stroke={i % 2 === 0 ? colors.primary : colors.accent}
                            strokeWidth={i % 4 === 0 ? 3 : 1.5}
                            opacity={0.8}
                          />
                        );
                      })}
                    </g>
                  )}

                  {nirmanaType === 'shapes' && (
                    <g>
                      {Array.from({ length: elementCount }).map((_, i) => {
                        const angle = (i * 360) / elementCount;
                        return (
                          <rect
                            key={i}
                            x="150"
                            y="150"
                            width="100"
                            height="100"
                            fill="none"
                            stroke={i % 2 === 0 ? colors.primary : colors.accent}
                            strokeWidth="1.8"
                            transform={`rotate(${angle} 200 200)`}
                            opacity={0.7}
                          />
                        );
                      })}
                    </g>
                  )}

                  {nirmanaType === 'rhythm' && (
                    <g>
                      {Array.from({ length: elementCount }).map((_, i) => {
                        const angle = (i * 360) / elementCount;
                        const dist = 50 + (i % 3) * 35;
                        return (
                          <g key={i} transform={`rotate(${angle} 200 200)`}>
                            <ellipse
                              cx={200 + dist}
                              cy="200"
                              rx={18 + (i % 4) * 5}
                              ry={8 + (i % 2) * 4}
                              fill={colors.accent}
                              fillOpacity="0.3"
                              stroke={colors.primary}
                              strokeWidth="1.5"
                            />
                            <line
                              x1="200"
                              y1="200"
                              x2={200 + dist}
                              y2="200"
                              stroke={colors.primary}
                              strokeWidth="1"
                              strokeDasharray="2 3"
                              opacity="0.5"
                            />
                          </g>
                        );
                      })}
                    </g>
                  )}
                </g>
              </svg>
            </div>

            {/* Bottom Insight Pill */}
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 text-xs text-slate-200 border border-white/10 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#E3AF58]" />
                Kaidah: Keseimbangan {symmetryMode === 'radial' ? 'Pusat (Radial)' : symmetryMode === 'bilateral' ? 'Simetris Cermin' : 'Asimetris Dinamis'}
              </span>
              <span className="text-[#E3AF58] font-mono text-[11px]">
                {elementCount} Elemen • {rotationAngle}°
              </span>
            </div>
          </div>

          {/* Practical Application to Muslimah Flyer */}
          <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
              <Sparkles className="w-3.5 h-3.5 text-[#D49B42]" />
              Penerapan Nirmana pada Desain Flyer Organisasi:
            </h4>
            <p className="leading-relaxed">
              Pola geometris nirmana sangat ideal digunakan sebagai <em>watermark</em> background, bingkai sudut,
              atau pemisah section pada flyer kajian/workshop. Hal ini memberi sentuhan identitas Islami tanpa membuat mata audiens terdistraksi dari teks utama.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
