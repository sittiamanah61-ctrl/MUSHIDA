import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Award,
  Play,
  CheckCircle2,
  Clock,
  Shapes,
  Type,
  Palette,
  FileCheck2,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

interface HeroSectionProps {
  onStartPreTest: () => void;
  onOpenStudio: (tab: string) => void;
  preTestScore: number | null;
  nirmanaDone: boolean;
  typoDone: boolean;
  paletteDone: boolean;
  taskPassed: boolean;
  postTestPassed: boolean;
  canGetCertificate: boolean;
  onOpenCertificate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPreTest,
  onOpenStudio,
  preTestScore,
  nirmanaDone,
  typoDone,
  paletteDone,
  taskPassed,
  postTestPassed,
  canGetCertificate,
  onOpenCertificate
}) => {
  return (
    <div className="space-y-10">
      {/* Hero Banner with Islamic Aesthetic & Design Animation */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#103426] via-[#174230] to-[#0A261B] text-white shadow-2xl border-2 border-[#D49B42]/40">
        {/* Animated Islamic Geometric & Graphic Design Background Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M30 0 L60 30 L30 60 L0 30 Z M30 10 L50 30 L30 50 L10 30 Z"
                  fill="none"
                  stroke="#E3AF58"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-grid)" />
          </svg>
        </div>

        {/* Floating animated particles / sparkles */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 45, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 left-8 text-[#E3AF58]/60 pointer-events-none hidden md:block"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>

        <motion.div
          animate={{ y: [12, -12, 12], rotate: [0, -45, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 right-16 text-[#E3AF58]/40 pointer-events-none hidden md:block"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
          {/* Left Column: Workshop Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#E3AF58]/20 border border-[#E3AF58]/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#E3AF58] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E3AF58] animate-ping" />
              <span>Workshop Desain Flyer Profesional</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Membangun Publikasi Organisasi Muslimah{' '}
                <span className="text-gold-gradient block mt-1">
                  Menarik, Informatif & Berkarakter
                </span>
              </h1>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-light">
                Platform studio interaktif bagi pengurus organisasi muslimah, santriwati, dan mahasiswi untuk menguasai
                kaidah dasar <strong>Nirmana 2D</strong>, <strong>Hierarki Tipografi</strong>, dan <strong>Harmoni Palet Warna</strong> dengan evaluasi tugas otomatis dan penerbitan sertifikat digital.
              </p>
            </div>

            {/* Instructor Profile Card */}
            <div className="bg-emerald-950/60 border border-[#D49B42]/50 rounded-2xl p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center gap-4 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E3AF58] to-[#B37E28] p-0.5 shadow-md shrink-0">
                <div className="w-full h-full bg-[#143E2E] rounded-[14px] flex items-center justify-center text-[#E3AF58]">
                  <GraduationCap className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[11px] font-semibold tracking-wider text-[#E3AF58] uppercase">
                  Pemateri Utama
                </div>
                <div className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Sitti Saadah Al amanah, S.Kom</span>
                  <span className="text-xs bg-[#E3AF58]/30 text-amber-200 px-2 py-0.5 rounded-full font-normal">
                    Pengajar & Praktisi Multimedia
                  </span>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartPreTest}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#E3AF58] to-[#D49B42] text-[#143E2E] font-bold px-6 py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{preTestScore !== null ? 'Lihat / Ulangi Pre-Test' : 'Mulai Pre-Test Sekarang'}</span>
              </button>

              <button
                onClick={() => onOpenStudio('nirmana')}
                className="flex items-center space-x-2 bg-[#1F5440] hover:bg-[#276850] text-emerald-100 font-semibold px-5 py-3 rounded-xl border border-[#D49B42]/40 transition"
              >
                <Shapes className="w-4 h-4 text-[#E3AF58]" />
                <span>Buka Studio Nirmana</span>
              </button>

              {canGetCertificate && (
                <button
                  onClick={onOpenCertificate}
                  className="flex items-center space-x-2 bg-[#FAF7F2] text-[#143E2E] font-bold px-5 py-3 rounded-xl shadow hover:bg-white transition"
                >
                  <Award className="w-4 h-4 text-[#D49B42]" />
                  <span>Cetak Sertifikat Anda</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Visual Poster Asset & Muslimah Character Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Outer decorative golden Islamic glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#E3AF58] via-[#B37E28] to-[#E3AF58] rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D49B42]/60 bg-[#103426]">
                <img
                  src="/assets/aistudio/image_9e9c80ff.png"
                  alt="Poster Workshop Desain Flyer Profesional Muslimah"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition duration-500"
                />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-xs text-white">
                  <p className="font-semibold text-[#E3AF58] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Kajian Publikasi Muslimat Hidayatullah
                  </p>
                  <p className="text-[11px] text-slate-200">
                    Kreativitas • Kolaborasi • Dakwah Visual Berkemajuan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Step Workshop Learning Flow */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#D49B42]/30 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#143E2E] flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#D49B42]" />
              Alur Pembelajaran & Kelulusan Sertifikat
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Selesaikan seluruh modul berikut untuk membuka Sertifikat Kelulusan Resmi yang ditandatangani Instruktur.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#143E2E] bg-[#E3AF58]/20 px-3 py-1 rounded-full border border-[#D49B42]/40 self-start sm:self-auto">
            Passing Grade: 75 / 100
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Pre-Test */}
          <div
            onClick={onStartPreTest}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              preTestScore !== null
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white border-slate-200 hover:border-[#D49B42]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#143E2E]/10 flex items-center justify-center text-[#143E2E]">
                <HelpCircle className="w-5 h-5 text-[#143E2E]" />
              </div>
              {preTestScore !== null ? (
                <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Skor: {preTestScore}
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> Wajib di awal
                </span>
              )}
            </div>
            <h3 className="font-bold text-[#143E2E] mt-3">1. Pre-Test Prinsip Desain</h3>
            <p className="text-xs text-slate-600 mt-1">
              10 soal pilihan ganda sederhana untuk mengukur wawasan awal mengenai prinsip desain dan warna.
            </p>
          </div>

          {/* Card 2: Studio Nirmana */}
          <div
            onClick={() => onOpenStudio('nirmana')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              nirmanaDone
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white border-slate-200 hover:border-[#D49B42]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#143E2E]/10 flex items-center justify-center text-[#143E2E]">
                <Shapes className="w-5 h-5 text-[#143E2E]" />
              </div>
              {nirmanaDone ? (
                <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Selesai
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Eksplorasi
                </span>
              )}
            </div>
            <h3 className="font-bold text-[#143E2E] mt-3">2. Studio Nirmana 2D</h3>
            <p className="text-xs text-slate-600 mt-1">
              Eksperimen titik, garis, irama, keseimbangan simetris/asimetris, dan ornamen bintang Islami.
            </p>
          </div>

          {/* Card 3: Studio Tipografi */}
          <div
            onClick={() => onOpenStudio('typography')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              typoDone
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white border-slate-200 hover:border-[#D49B42]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#143E2E]/10 flex items-center justify-center text-[#143E2E]">
                <Type className="w-5 h-5 text-[#143E2E]" />
              </div>
              {typoDone ? (
                <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Selesai
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Eksplorasi
                </span>
              )}
            </div>
            <h3 className="font-bold text-[#143E2E] mt-3">3. Studio Tipografi</h3>
            <p className="text-xs text-slate-600 mt-1">
              Atur hierarki judul, subjudul, leading, kerning, dan pairing font Islami yang anggun & jelas.
            </p>
          </div>

          {/* Card 4: Studio Palet Warna */}
          <div
            onClick={() => onOpenStudio('palette')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              paletteDone
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white border-slate-200 hover:border-[#D49B42]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#143E2E]/10 flex items-center justify-center text-[#143E2E]">
                <Palette className="w-5 h-5 text-[#143E2E]" />
              </div>
              {paletteDone ? (
                <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Selesai
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Eksplorasi
                </span>
              )}
            </div>
            <h3 className="font-bold text-[#143E2E] mt-3">4. Studio Palet Warna</h3>
            <p className="text-xs text-slate-600 mt-1">
              Terapkan aturan 60-30-10, uji kontras rasio WCAG, dan preview langsung pada mockup poster flyer.
            </p>
          </div>

          {/* Card 5: Tugas & Penilaian Otomatis */}
          <div
            onClick={() => onOpenStudio('task')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              taskPassed
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white border-slate-200 hover:border-[#D49B42]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#143E2E]/10 flex items-center justify-center text-[#143E2E]">
                <FileCheck2 className="w-5 h-5 text-[#143E2E]" />
              </div>
              {taskPassed ? (
                <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Lulus Rubrik
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Wajib Dinilai
                </span>
              )}
            </div>
            <h3 className="font-bold text-[#143E2E] mt-3">5. Tugas Desain & Evaluasi AI</h3>
            <p className="text-xs text-slate-600 mt-1">
              Rancang flyer dan dapatkan penilaian otomatis langsung dengan umpan balik rubrik 4 pilar desain.
            </p>
          </div>

          {/* Card 6: Post-Test */}
          <div
            onClick={() => onOpenStudio('posttest')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
              postTestPassed
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-white border-slate-200 hover:border-[#D49B42]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#143E2E]/10 flex items-center justify-center text-[#143E2E]">
                <Award className="w-5 h-5 text-[#143E2E]" />
              </div>
              {postTestPassed ? (
                <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Lulus Post-Test
                </span>
              ) : (
                <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  Syarat Kelulusan
                </span>
              )}
            </div>
            <h3 className="font-bold text-[#143E2E] mt-3">6. Post-Test (Minimal 75)</h3>
            <p className="text-xs text-slate-600 mt-1">
              Uji pemahaman akhir setelah materi. Dapatkan nilai minimal 75 untuk membuka sertifikat resmi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
