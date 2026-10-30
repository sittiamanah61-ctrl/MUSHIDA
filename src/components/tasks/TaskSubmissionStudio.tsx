import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileCheck2,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  Upload,
  RefreshCw,
  Eye,
  Sliders,
  Type,
  Palette,
  ShieldCheck,
  Check,
  Share2
} from 'lucide-react';
import { evaluateTaskSubmission } from '../../utils/designGrader';
import { TaskSubmission } from '../../types/workshop';

interface TaskSubmissionStudioProps {
  participantName: string;
  organization: string;
  currentSubmission: TaskSubmission | null;
  onSaveSubmission: (submission: TaskSubmission) => void;
  externalPalette?: { primary: string; secondary: string; accent: string; bg: string } | null;
}

export const TaskSubmissionStudio: React.FC<TaskSubmissionStudioProps> = ({
  participantName,
  organization,
  currentSubmission,
  onSaveSubmission,
  externalPalette
}) => {
  const [title, setTitle] = useState(
    currentSubmission?.title || 'Kajian Muslimah: Membangun Generasi Rabbani'
  );
  const [subtitle, setSubtitle] = useState(
    currentSubmission?.subtitle || 'Meneladani Keanggunan & Keteguhan Shahabiyah'
  );
  const [bodyText, setBodyText] = useState(
    currentSubmission?.bodyText || 'Ahad, 22 November 2026 • 09.00 WIB • Masjid Al-Hikmah'
  );
  const [callToAction, setCallToAction] = useState(
    currentSubmission?.callToAction || 'Daftar Sekarang: bit.ly/kajian-muslimah'
  );
  const [category, setCategory] = useState<TaskSubmission['category']>(
    currentSubmission?.category || 'Kajian Muslimah'
  );

  // Styling attributes
  const [primaryColor, setPrimaryColor] = useState(
    externalPalette?.primary || currentSubmission?.primaryColor || '#143E2E'
  );
  const [secondaryColor, setSecondaryColor] = useState(
    externalPalette?.secondary || currentSubmission?.secondaryColor || '#E3AF58'
  );
  const [accentColor, setAccentColor] = useState(
    externalPalette?.accent || currentSubmission?.accentColor || '#D49B42'
  );
  const [backgroundColor, setBackgroundColor] = useState(
    externalPalette?.bg || currentSubmission?.backgroundColor || '#F8F6F0'
  );

  const [h1Font, setH1Font] = useState(currentSubmission?.h1Font || 'Amiri');
  const [bodyFont, setBodyFont] = useState(currentSubmission?.bodyFont || 'Plus Jakarta Sans');
  const [h1Size, setH1Size] = useState(currentSubmission?.h1Size || 32);
  const [bodySize, setBodySize] = useState(currentSubmission?.bodySize || 13);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>(
    currentSubmission?.alignment || 'center'
  );
  const [ornamentStyle, setOrnamentStyle] = useState<'khatam' | 'arch' | 'floral' | 'minimal'>(
    currentSubmission?.ornamentStyle || 'khatam'
  );
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    currentSubmission?.uploadedImageUrl
  );

  const [evaluationResult, setEvaluationResult] = useState<TaskSubmission | null>(
    currentSubmission || null
  );
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Handle image upload simulation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEvaluate = () => {
    setIsEvaluating(true);

    setTimeout(() => {
      const evalData = evaluateTaskSubmission({
        id: currentSubmission?.id || `sub-${Date.now()}`,
        participantName,
        title,
        subtitle,
        bodyText,
        callToAction,
        category,
        primaryColor,
        secondaryColor,
        accentColor,
        backgroundColor,
        h1Font,
        bodyFont,
        h1Size,
        bodySize,
        alignment,
        hasPattern: ornamentStyle !== 'minimal',
        ornamentStyle,
        uploadedImageUrl: uploadedImage
      });

      const fullSubmission: TaskSubmission = {
        id: currentSubmission?.id || `sub-${Date.now()}`,
        participantName,
        title,
        subtitle,
        bodyText,
        callToAction,
        category,
        primaryColor,
        secondaryColor,
        accentColor,
        backgroundColor,
        h1Font,
        bodyFont,
        h1Size,
        bodySize,
        alignment,
        hasPattern: ornamentStyle !== 'minimal',
        ornamentStyle,
        uploadedImageUrl: uploadedImage,
        score: evalData.score,
        grade: evalData.grade,
        passed: evalData.passed,
        breakdowns: evalData.breakdowns,
        critiqueSummary: evalData.critiqueSummary,
        submittedAt: new Date().toISOString()
      };

      setEvaluationResult(fullSubmission);
      onSaveSubmission(fullSubmission);
      setIsEvaluating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#143E2E] mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 text-[#143E2E]">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">Penilaian Tugas Desain Otomatis</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Rancang karya flyer publikasi organisasi Muslimah Anda di lembar kerja ini. Sistem otomatis kami akan mengevaluasi
            karya Anda berdasarkan <strong>4 Pilar Rubrik Desain Grafis</strong> (Kontras, Hierarki Tipografi, Komposisi White Space, dan Estetika Muslimah).
          </p>
        </div>

        {evaluationResult?.passed ? (
          <div className="flex items-center space-x-2 bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Tugas LULUS (Nilai: {evaluationResult.score}/100)</span>
          </div>
        ) : (
          <span className="text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl self-start md:self-auto">
            Batas Kelulusan: 75 Poin
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form Column */}
        <div className="lg:col-span-6 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#143E2E] flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#D49B42]" />
              Formulir Konten & Parameter Desain Flyer
            </h3>
            <span className="text-[11px] text-slate-500">Peserta: {participantName}</span>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kategori Publikasi:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none bg-white"
            >
              <option value="Kajian Muslimah">Kajian Muslimah</option>
              <option value="Workshop Organisasi">Workshop Organisasi</option>
              <option value="Bakti Sosial">Bakti Sosial & Santunan</option>
              <option value="Peringatan Hari Besar Islam">Peringatan Hari Besar Islam (PHBI)</option>
            </select>
          </div>

          {/* Texts */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judul Utama Poster (Focal Point):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Kajian Muslimah Syawal Penuh Berkah"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subjudul / Tema Penjelas:
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Contoh: Mempererat Ukhuwah & Menata Masa Depan"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Informasi Waktu & Lokasi (Body):
              </label>
              <input
                type="text"
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Contoh: Sabtu, 10 Oktober 2026 • 09.00 WIB • Aula Hidayatullah"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Call to Action (CTA / Pendaftaran):
              </label>
              <input
                type="text"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                placeholder="Contoh: Registrasi: bit.ly/daftar-kajian • CP: 0812-3456"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
              />
            </div>
          </div>

          {/* Color Scheme Picker */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Kombinasi Warna Poster:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div>
                <span className="block text-slate-600 mb-1">Latar (60%)</span>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer border border-slate-300"
                />
              </div>
              <div>
                <span className="block text-slate-600 mb-1">Teks Utama</span>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer border border-slate-300"
                />
              </div>
              <div>
                <span className="block text-slate-600 mb-1">Ornamen</span>
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer border border-slate-300"
                />
              </div>
              <div>
                <span className="block text-slate-600 mb-1">Tombol CTA</span>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Font & Layout adjustments */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gaya Font Judul:
              </label>
              <select
                value={h1Font}
                onChange={(e) => setH1Font(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] bg-white"
              >
                <option value="Amiri">Amiri (Serif Islami)</option>
                <option value="Cinzel">Cinzel (Editorial Megah)</option>
                <option value="Plus Jakarta Sans">Jakarta Sans (Modern Clean)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Gaya Ornamen:
              </label>
              <select
                value={ornamentStyle}
                onChange={(e) => setOrnamentStyle(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] bg-white"
              >
                <option value="khatam">Bintang Khatam 8</option>
                <option value="arch">Lengkung Kubah Masjid</option>
                <option value="floral">Floral Arabesque</option>
                <option value="minimal">Minimalis Bersih</option>
              </select>
            </div>
          </div>

          {/* Font size sliders */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Ukuran Judul:</span>
                <span className="font-bold text-[#143E2E]">{h1Size}px</span>
              </div>
              <input
                type="range"
                min="22"
                max="44"
                value={h1Size}
                onChange={(e) => setH1Size(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-700 mb-1">
                <span>Ukuran Body:</span>
                <span className="font-bold text-[#143E2E]">{bodySize}px</span>
              </div>
              <input
                type="range"
                min="11"
                max="16"
                value={bodySize}
                onChange={(e) => setBodySize(Number(e.target.value))}
                className="w-full accent-[#143E2E]"
              />
            </div>
          </div>

          {/* Optional Image Upload */}
          <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center">
            <label className="cursor-pointer block">
              <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
              <span className="text-xs font-semibold text-slate-700 block">
                {uploadedImage ? 'Foto Ilustrasi Terpasang ✓ (Klik untuk ganti)' : 'Unggah Foto Pembicara / Logo (Opsional)'}
              </span>
              <span className="text-[11px] text-slate-400">PNG, JPG maksimal 2MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit & Grade button */}
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full py-3.5 bg-gradient-to-r from-[#143E2E] via-[#1c553f] to-[#143E2E] text-[#E3AF58] font-bold text-sm rounded-xl shadow-lg hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center space-x-2 border border-[#D49B42]/50"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#E3AF58]" />
                <span>Menganalisis Rubrik Desain...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Nilai Tugas Desain Sekarang (Otomatis)</span>
              </>
            )}
          </button>
        </div>

        {/* Live Poster Preview & Automated Evaluation Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Live Rendered Poster */}
          <div
            className="w-full aspect-[4/5] rounded-2xl p-6 sm:p-8 shadow-xl border-2 transition-all relative overflow-hidden flex flex-col justify-between"
            style={{
              backgroundColor,
              borderColor: `${secondaryColor}80`
            }}
          >
            {/* Background pattern if enabled */}
            {ornamentStyle !== 'minimal' && (
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: `radial-gradient(${secondaryColor} 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />
            )}

            {/* Poster Header */}
            <div className="relative z-10 flex items-center justify-between border-b pb-3" style={{ borderColor: `${primaryColor}20` }}>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: primaryColor }}>
                  {organization}
                </span>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${secondaryColor}25`,
                  color: primaryColor,
                  border: `1px solid ${secondaryColor}60`
                }}
              >
                {category}
              </span>
            </div>

            {/* Poster Middle Content */}
            <div
              className={`relative z-10 my-auto space-y-4 py-4 ${
                alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'
              }`}
            >
              {/* Optional Speaker Photo */}
              {uploadedImage && (
                <div className={`flex ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-md p-0.5"
                    style={{ borderColor: secondaryColor }}
                  >
                    <img src={uploadedImage} alt="Speaker" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
              )}

              {/* Title */}
              <h1
                style={{
                  fontFamily: h1Font === 'Amiri' ? "'Amiri', serif" : h1Font === 'Cinzel' ? "'Cinzel', serif" : "'Plus Jakarta Sans', sans-serif",
                  fontSize: `${h1Size}px`,
                  lineHeight: 1.25,
                  color: primaryColor
                }}
                className="font-extrabold tracking-tight"
              >
                {title || 'Judul Poster Anda'}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: `${Math.round(bodySize * 1.15)}px`,
                  color: secondaryColor
                }}
                className="font-medium"
              >
                {subtitle}
              </p>

              {/* Ornament Separator */}
              {ornamentStyle === 'khatam' && (
                <div className="flex items-center justify-center space-x-2 py-1 opacity-70">
                  <div className="h-[1px] w-12" style={{ backgroundColor: secondaryColor }} />
                  <span style={{ color: secondaryColor }} className="text-xs">۞</span>
                  <div className="h-[1px] w-12" style={{ backgroundColor: secondaryColor }} />
                </div>
              )}

              {/* Body */}
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: `${bodySize}px`,
                  backgroundColor: `${primaryColor}06`,
                  borderColor: `${secondaryColor}40`,
                  color: primaryColor
                }}
                className="p-3 rounded-xl border"
              >
                {bodyText}
              </div>
            </div>

            {/* Poster CTA Footer */}
            <div className="relative z-10 pt-3 border-t" style={{ borderColor: `${primaryColor}15` }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="text-[11px] font-medium" style={{ color: `${primaryColor}AA` }}>
                  {callToAction}
                </span>
                <span
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow"
                  style={{ backgroundColor: accentColor }}
                >
                  Daftar
                </span>
              </div>
            </div>
          </div>

          {/* Automated Evaluation Report Card */}
          {evaluationResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl border-2 border-[#D49B42]/40 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#D49B42]" />
                  <h3 className="font-bold text-sm text-[#143E2E]">
                    Hasil Penilaian Tugas Otomatis
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      evaluationResult.passed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Grade: {evaluationResult.grade} ({evaluationResult.score}/100)
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                      evaluationResult.passed ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                  >
                    {evaluationResult.passed ? 'LULUS ✓' : 'REVISI'}
                  </span>
                </div>
              </div>

              {/* Summary critique */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed">
                {evaluationResult.critiqueSummary}
              </div>

              {/* Rubric Breakdown List */}
              <div className="space-y-2.5">
                {evaluationResult.breakdowns.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">{item.category}</span>
                      <span className="font-bold text-[#143E2E]">
                        {item.score} / {item.maxScore} pts
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{item.feedback}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
