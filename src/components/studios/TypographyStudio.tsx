import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Sliders,
  Calendar,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

interface TypographyStudioProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const TypographyStudio: React.FC<TypographyStudioProps> = ({ onComplete, isCompleted }) => {
  const [fontPairing, setFontPairing] = useState<'islamic_serif' | 'modern_cinzel' | 'clean_sans'>('islamic_serif');
  const [headlineText, setHeadlineText] = useState('KAJIAN MUSLIMAH AKBAR');
  const [subtitleText, setSubtitleText] = useState('Menebar Kebaikan & Menjaga Martabat Muslimah di Era Digital');
  const [bodyText, setBodyText] = useState('Ahad, 15 November 2026 • 08.30 - 11.30 WIB • Masjid Agung Al-Hidayah');
  const [ctaText, setCtaText] = useState('Pendaftaran Terbuka • Gratis Khusus Muslimah');

  const [h1Size, setH1Size] = useState(32);
  const [bodySize, setBodySize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.3);
  const [letterSpacing, setLetterSpacing] = useState(0.5);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [themeMode, setThemeMode] = useState<'emerald_gold' | 'light_cream'>('emerald_gold');

  // Hierarchy analysis
  const hierarchyRatio = h1Size / Math.max(bodySize, 10);
  const isHierarchyGood = hierarchyRatio >= 1.8;
  const isLineHeightGood = lineHeight >= 1.2 && lineHeight <= 1.6;

  const fontConfig = {
    islamic_serif: {
      headingFont: "'Amiri', serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      name: 'Amiri (Serif Islami) + Plus Jakarta Sans',
      desc: 'Sangat cocok untuk flyer kajian, dakwah, dan seminar formal berakar tradisi Islami.'
    },
    modern_cinzel: {
      headingFont: "'Cinzel', serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      name: 'Cinzel (Editorial Mewah) + Plus Jakarta Sans',
      desc: 'Memberikan kesan agung, monumental, dan berkelas pada judul agenda organisasi.'
    },
    clean_sans: {
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      name: 'Plus Jakarta Sans (Modern & Clean)',
      desc: 'Minimalis, ramah pembaca muda, dan sangat jelas terbaca di feed Instagram/WhatsApp.'
    }
  }[fontPairing];

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#143E2E] mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 text-[#143E2E]">
              <Type className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">Studio Tipografi & Hierarki Visual</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Tipografi bukan sekadar memilih font, melainkan seni mengatur hierarki teks agar pesan utama terbaca dalam 3 detik pertama.
            Eksplorasi perbandingan ukuran judul, teks isi, dan kombinasi font elegan untuk publikasi Muslimah.
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
          <span>{isCompleted ? 'Modul Tipografi Selesai ✓' : 'Tandai Modul Dipahami'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-[#D49B42]" />
            <h3 className="font-bold text-sm text-[#143E2E]">Kombinasi Huruf & Skala</h3>
          </div>

          {/* Font Pairing Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Pilihan Pasangan Huruf (Font Pairing):
            </label>
            <div className="space-y-2 text-xs">
              {(['islamic_serif', 'modern_cinzel', 'clean_sans'] as const).map((key) => {
                const isSelected = fontPairing === key;
                return (
                  <button
                    key={key}
                    onClick={() => setFontPairing(key)}
                    className={`w-full p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? 'border-[#143E2E] bg-emerald-50/70 text-[#143E2E]'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{key === 'islamic_serif' ? 'Amiri + Jakarta Sans' : key === 'modern_cinzel' ? 'Cinzel + Jakarta Sans' : 'Plus Jakarta Sans Clean'}</span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#D49B42]" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {key === 'islamic_serif'
                        ? 'Gaya kaligrafi anggun untuk dakwah dan kajian'
                        : key === 'modern_cinzel'
                        ? 'Gaya editorial berbobot dan prestisius'
                        : 'Gaya modern minimalis ramah media sosial'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Input Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teks Judul Utama (H1 / Focal Point):
              </label>
              <input
                type="text"
                value={headlineText}
                onChange={(e) => setHeadlineText(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subjudul (H2 / Penjelas Tema):
              </label>
              <input
                type="text"
                value={subtitleText}
                onChange={(e) => setSubtitleText(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teks Informasi & Detail (Body):
              </label>
              <input
                type="text"
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
              />
            </div>
          </div>

          {/* Alignment Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Perataan Teks (Alignment):
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setAlignment('left')}
                className={`flex items-center justify-center space-x-1 py-1.5 rounded-lg border text-xs font-medium ${
                  alignment === 'left' ? 'bg-[#143E2E] text-white border-[#143E2E]' : 'border-slate-200 text-slate-700'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Rata Kiri</span>
              </button>
              <button
                onClick={() => setAlignment('center')}
                className={`flex items-center justify-center space-x-1 py-1.5 rounded-lg border text-xs font-medium ${
                  alignment === 'center' ? 'bg-[#143E2E] text-white border-[#143E2E]' : 'border-slate-200 text-slate-700'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
                <span>Rata Tengah</span>
              </button>
              <button
                onClick={() => setAlignment('right')}
                className={`flex items-center justify-center space-x-1 py-1.5 rounded-lg border text-xs font-medium ${
                  alignment === 'right' ? 'bg-[#143E2E] text-white border-[#143E2E]' : 'border-slate-200 text-slate-700'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
                <span>Rata Kanan</span>
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-1">
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span className="font-semibold">Ukuran Judul (H1 Size):</span>
                <span className="font-bold text-[#143E2E]">{h1Size}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="48"
                value={h1Size}
                onChange={(e) => setH1Size(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span className="font-semibold">Ukuran Teks Isi (Body Size):</span>
                <span className="font-bold text-[#143E2E]">{bodySize}px</span>
              </div>
              <input
                type="range"
                min="11"
                max="18"
                value={bodySize}
                onChange={(e) => setBodySize(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span className="font-semibold">Jarak Antar Baris (Leading / Line Height):</span>
                <span className="font-bold text-[#143E2E]">{lineHeight}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.0"
                step="0.05"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span className="font-semibold">Jarak Antar Huruf (Tracking / Spacing):</span>
                <span className="font-bold text-[#143E2E]">{letterSpacing}px</span>
              </div>
              <input
                type="range"
                min="-1"
                max="4"
                step="0.5"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>
          </div>
        </div>

        {/* Live Flyer Typography Preview */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card Mockup */}
          <div
            className={`w-full rounded-2xl p-7 shadow-lg border-2 transition-all relative overflow-hidden ${
              themeMode === 'emerald_gold'
                ? 'bg-gradient-to-b from-[#143E2E] via-[#103426] to-[#0A261B] text-white border-[#D49B42]/50'
                : 'bg-[#FAF7F2] text-[#143E2E] border-slate-300'
            }`}
          >
            {/* Top Toolbar on Canvas */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 text-xs">
              <span className="text-[#E3AF58] font-semibold tracking-wider uppercase text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Live Preview Flyer Publikasi
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setThemeMode(themeMode === 'emerald_gold' ? 'light_cream' : 'emerald_gold')}
                  className="px-2.5 py-1 rounded-lg bg-black/30 hover:bg-black/50 text-xs text-white border border-white/10 transition"
                >
                  Ubah Mode Latar: {themeMode === 'emerald_gold' ? 'Hijau Emerald' : 'Krem Terang'}
                </button>
              </div>
            </div>

            {/* Simulated Flyer Content */}
            <div
              className={`space-y-5 max-w-lg mx-auto ${
                alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'
              }`}
            >
              {/* Category pill */}
              <div className={`inline-block ${alignment === 'center' ? 'mx-auto' : ''}`}>
                <span className="bg-[#E3AF58]/20 text-[#E3AF58] border border-[#E3AF58]/50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Kajian Muslimat Hidayatullah
                </span>
              </div>

              {/* H1 Heading */}
              <h1
                style={{
                  fontFamily: fontConfig.headingFont,
                  fontSize: `${h1Size}px`,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}px`
                }}
                className={`font-bold transition-all ${
                  themeMode === 'emerald_gold' ? 'text-[#FAF7F2]' : 'text-[#143E2E]'
                }`}
              >
                {headlineText}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: fontConfig.bodyFont,
                  fontSize: `${Math.round(bodySize * 1.15)}px`,
                  lineHeight: 1.4
                }}
                className={`font-medium ${
                  themeMode === 'emerald_gold' ? 'text-[#E3AF58]' : 'text-[#D49B42]'
                }`}
              >
                {subtitleText}
              </p>

              {/* Divider ornament */}
              <div className="flex items-center justify-center space-x-2 py-1 opacity-70">
                <div className="h-[1px] w-12 bg-[#E3AF58]" />
                <span className="text-[#E3AF58] text-xs">❖</span>
                <div className="h-[1px] w-12 bg-[#E3AF58]" />
              </div>

              {/* Body details */}
              <div
                style={{
                  fontFamily: fontConfig.bodyFont,
                  fontSize: `${bodySize}px`,
                  lineHeight: lineHeight
                }}
                className={`space-y-1.5 ${
                  themeMode === 'emerald_gold' ? 'text-emerald-100/90' : 'text-slate-700'
                }`}
              >
                <p className="font-light">{bodyText}</p>
                <p className="text-xs opacity-75">Narasumber: Ustadzah Pembina Muslimah • Live Streaming & Offline</p>
              </div>

              {/* CTA Button */}
              <div className="pt-3">
                <button
                  className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md ${
                    themeMode === 'emerald_gold'
                      ? 'bg-gradient-to-r from-[#E3AF58] to-[#D49B42] text-[#143E2E]'
                      : 'bg-[#143E2E] text-[#E3AF58]'
                  }`}
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Realtime Hierarchy Audit Feedback */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#143E2E] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D49B42]" />
              Audit Otomatis Hierarki Tipografi:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
                {isHierarchyGood ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-slate-800">
                    Skala Rasio Font: {hierarchyRatio.toFixed(1)}x
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isHierarchyGood
                      ? 'Ideal! Judul minimal 1.8x lebih besar dari teks isi sehingga mata langsung fokus ke tema.'
                      : 'Perhatian: Judul kurang kontras dengan teks isi. Naikkan ukuran judul atau kecilkan teks isi.'}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5">
                {isLineHeightGood ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-slate-800">
                    Leading (Jarak Baris): {lineHeight}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isLineHeightGood
                      ? 'Jarak baris pas dan nyaman untuk teks multi-baris.'
                      : 'Jarak baris terlalu rapat atau terlalu renggang, berpotensi melelahkan mata pembaca.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
