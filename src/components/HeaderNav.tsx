import React from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Type,
  Shapes,
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  User,
  ShieldCheck,
  Compass,
  FileCheck2,
  BookOpen
} from 'lucide-react';

interface HeaderNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  participantName: string;
  setParticipantName: (name: string) => void;
  organization: string;
  setOrganization: (org: string) => void;
  isInstructorLoggedIn: boolean;
  setIsInstructorModalOpen: (open: boolean) => void;
  preTestDone: boolean;
  nirmanaDone: boolean;
  typoDone: boolean;
  paletteDone: boolean;
  taskPassed: boolean;
  postTestPassed: boolean;
  canGetCertificate: boolean;
  setIsCertModalOpen: (open: boolean) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  participantName,
  setParticipantName,
  organization,
  setOrganization,
  isInstructorLoggedIn,
  setIsInstructorModalOpen,
  preTestDone,
  nirmanaDone,
  typoDone,
  paletteDone,
  taskPassed,
  postTestPassed,
  canGetCertificate,
  setIsCertModalOpen
}) => {
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [tempName, setTempName] = React.useState(participantName);
  const [tempOrg, setTempOrg] = React.useState(organization);

  const handleSaveProfile = () => {
    if (tempName.trim()) setParticipantName(tempName.trim());
    if (tempOrg.trim()) setOrganization(tempOrg.trim());
    setIsEditingProfile(false);
  };

  const completedModulesCount = [
    preTestDone,
    nirmanaDone,
    typoDone,
    paletteDone,
    taskPassed,
    postTestPassed
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedModulesCount / 6) * 100);

  return (
    <header className="sticky top-0 z-40 bg-[#143E2E]/95 backdrop-blur-md text-white border-b border-[#D49B42]/30 shadow-lg">
      {/* Top Islamic & Design Decorative Animated Ribbon */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0E2F23] via-[#174230] to-[#0E2F23] border-b border-[#D49B42]/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Static design badge without animations */}
          <div className="flex items-center space-x-3 text-[#E3AF58]">
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E3AF58]" />
              <span className="font-semibold tracking-wide uppercase text-[11px]">
                Desain Flyer Profesional
              </span>
            </div>
            <span className="text-[#E3AF58]/50">•</span>
            <span className="hidden sm:inline text-emerald-100/80">
              Pemateri: <strong className="text-white">Sitti Saadah Al amanah, S.Kom</strong>
            </span>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center space-x-1.5 bg-[#1F5440] hover:bg-[#276850] px-2.5 py-0.5 rounded-full text-xs text-emerald-100 transition border border-[#D49B42]/40"
              title="Ubah nama peserta untuk sertifikat"
            >
              <User className="w-3 h-3 text-[#E3AF58]" />
              <span className="max-w-[120px] truncate font-medium">{participantName}</span>
            </button>

            <button
              onClick={() => setIsInstructorModalOpen(true)}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition ${
                isInstructorLoggedIn
                  ? 'bg-[#E3AF58] text-[#143E2E] font-semibold'
                  : 'bg-emerald-950/60 hover:bg-emerald-900 text-amber-200 border border-amber-400/30'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{isInstructorLoggedIn ? 'Dashboard Pemateri' : 'Login Pemateri'}</span>
            </button>
          </div>
        </div>

        {/* Static design icons in header background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
          <div className="absolute left-[15%] top-1/2 -translate-y-1/2">
            <Compass className="w-6 h-6 text-[#E3AF58]" />
          </div>
          <div className="absolute right-[25%] top-1/2 -translate-y-1/2">
            <Shapes className="w-5 h-5 text-[#E3AF58]" />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Organization Title */}
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E3AF58] to-[#B37E28] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#143E2E] rounded-[10px] flex items-center justify-center">
                <Palette className="w-5 h-5 text-[#E3AF58]" />
              </div>
            </div>
            {/* Subtle pulsing badge */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E3AF58] rounded-full border-2 border-[#143E2E] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                Desain Flyer Profesional
                <span className="text-xs bg-[#E3AF58]/20 text-[#E3AF58] border border-[#E3AF58]/50 px-2 py-0.5 rounded-full font-medium">
                  Muslimah
                </span>
              </h1>
            </div>
            <p className="text-xs text-emerald-200/90 font-light flex items-center gap-1">
              <span>Muslimat Hidayatullah</span>
              <span className="text-[#E3AF58]">•</span>
              <span>Publikasi Menarik, Informatif & Konsisten</span>
            </p>
          </div>
        </div>

        {/* Progress pill & Certificate status button */}
        <div className="flex items-center gap-3">
          <div className="bg-[#0E2F23]/80 border border-[#D49B42]/30 rounded-xl px-3 py-1.5 flex items-center gap-3 text-xs">
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-emerald-200/80">Progres Modul:</span>
                <span className="font-bold text-[#E3AF58]">{completedModulesCount}/6 ({progressPercent}%)</span>
              </div>
              <div className="w-28 sm:w-36 h-2 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800">
                <div
                  className="h-full bg-gradient-to-r from-[#D49B42] to-[#F3C878] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Certificate Quick Button */}
          <button
            onClick={() => {
              if (canGetCertificate) {
                setIsCertModalOpen(true);
              } else {
                setActiveTab('certificate');
              }
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
              canGetCertificate
                ? 'bg-gradient-to-r from-[#E3AF58] to-[#C99132] text-[#143E2E] hover:brightness-110 animate-bounce'
                : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900'
            }`}
          >
            {canGetCertificate ? (
              <>
                <Award className="w-4 h-4 text-[#143E2E]" />
                <span>Klaim Sertifikat!</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sertifikat ({completedModulesCount}/6)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#103326] px-4 border-t border-[#174230]/60 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 py-2">
          <button
            onClick={() => setActiveTab('beranda')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'beranda'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Beranda & Panduan</span>
          </button>

          <button
            onClick={() => setActiveTab('pretest')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'pretest'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            {preTestDone ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
            <span>1. Pre-Test (10 Soal)</span>
          </button>

          <button
            onClick={() => setActiveTab('nirmana')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'nirmana'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            <Shapes className="w-3.5 h-3.5" />
            <span>2. Studio Nirmana</span>
            {nirmanaDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('typography')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'typography'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>3. Studio Tipografi</span>
            {typoDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('palette')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'palette'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>4. Studio Palet Warna</span>
            {paletteDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('task')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'task'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>5. Tugas & Nilai Otomatis</span>
            {taskPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('posttest')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'posttest'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            {postTestPassed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
            <span>6. Post-Test (10 Soal)</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'certificate'
                ? 'bg-[#E3AF58] text-[#143E2E] shadow'
                : 'text-emerald-100/90 hover:text-white hover:bg-[#174230]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Sertifikat Resmi</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white text-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#E3AF58]"
          >
            <div className="flex items-center space-x-2 text-[#143E2E] mb-4">
              <User className="w-5 h-5 text-[#D49B42]" />
              <h3 className="font-bold text-lg">Profil Peserta Workshop</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Nama ini akan dicetak secara resmi pada Sertifikat Kelulusan yang diterbitkan oleh Instruktur Sitti Saadah Al amanah, S.Kom.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Peserta (Beserta Gelar jika ada):
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Contoh: Fatimah Az-Zahra, S.Pd"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Organisasi / Lembaga / Sekolah:
                </label>
                <input
                  type="text"
                  value={tempOrg}
                  onChange={(e) => setTempOrg(e.target.value)}
                  placeholder="Contoh: Muslimat Hidayatullah Surabaya"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-5 py-2 text-xs font-semibold bg-[#143E2E] text-[#E3AF58] hover:bg-[#1c553f] rounded-xl shadow transition"
              >
                Simpan Profil
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </header>
  );
};
