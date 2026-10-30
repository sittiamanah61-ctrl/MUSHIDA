import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  Sparkles,
  Share2,
  X,
  ShieldCheck,
  Calendar,
  Lock
} from 'lucide-react';
import { CertificateData } from '../../types/workshop';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certData: CertificateData;
  canGetCertificate: boolean;
  missingRequirements: string[];
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certData,
  canGetCertificate,
  missingRequirements
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPng = () => {
    // Render using standard Canvas API for instant high quality PNG download without external heavy bloat
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 850);
    gradient.addColorStop(0, '#FAF7F2');
    gradient.addColorStop(1, '#F4EFE6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 850);

    // Outer Border
    ctx.strokeStyle = '#D49B42';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 1160, 810);

    // Inner Border
    ctx.strokeStyle = '#143E2E';
    ctx.lineWidth = 4;
    ctx.strokeRect(34, 34, 1132, 782);

    // Thin accent
    ctx.strokeStyle = '#E3AF58';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(42, 42, 1116, 766);

    // Organization Header
    ctx.fillStyle = '#143E2E';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MUSLIMAT HIDAYATULLAH • PUSAT PENGEMBANGAN MULTIMEDIA', 600, 110);

    // Certificate Title
    ctx.fillStyle = '#143E2E';
    ctx.font = 'bold 44px "Cinzel", Georgia, serif';
    ctx.fillText('SERTIFIKAT KELULUSAN', 600, 175);

    ctx.fillStyle = '#D49B42';
    ctx.font = 'italic 18px "Amiri", serif';
    ctx.fillText('CERTIFICATE OF ACCOMPLISHMENT', 600, 210);

    // Given to
    ctx.fillStyle = '#555555';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Diberikan dengan penuh kehormatan kepada:', 600, 270);

    // Participant Name
    ctx.fillStyle = '#143E2E';
    ctx.font = 'bold 38px "Amiri", Georgia, serif';
    ctx.fillText(certData.participantName, 600, 325);

    // Gold decorative line under name
    ctx.strokeStyle = '#D49B42';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 345);
    ctx.lineTo(850, 345);
    ctx.stroke();

    // Organization
    ctx.fillStyle = '#666666';
    ctx.font = 'italic 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(certData.organization || 'Peserta Workshop Desain Grafis', 600, 380);

    // Narrative Statement
    ctx.fillStyle = '#2D3748';
    ctx.font = '17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Atas keberhasilan menyelesaikan seluruh rangkaian pembelajaran dan uji kompetensi:', 600, 440);

    ctx.fillStyle = '#143E2E';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('WORKSHOP DESAIN FLYER & POSTER PROFESIONAL MUSLIMAH', 600, 475);

    ctx.fillStyle = '#555555';
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Kompetensi: Nirmana 2D, Tipografi Hierarkis, dan Harmoni Palet Warna Publikasi Organisasi', 600, 510);

    // Scores
    ctx.fillStyle = '#143E2E';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Nilai Akhir: ${certData.finalScore}/100 • Predikat: ${certData.grade}`, 600, 560);

    // Date and Signatures
    ctx.textAlign = 'left';
    ctx.fillStyle = '#555555';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`No. Sertifikat: ${certData.verificationCode}`, 100, 720);
    ctx.fillText(`Tanggal Terbit: ${certData.issueDate}`, 100, 745);

    ctx.textAlign = 'right';
    ctx.fillText('Instruktur & Pemateri Utama,', 1100, 680);
    ctx.fillStyle = '#143E2E';
    ctx.font = 'bold 20px "Amiri", Georgia, serif';
    ctx.fillText(certData.instructorName, 1100, 730);
    ctx.fillStyle = '#D49B42';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(certData.instructorTitle, 1100, 755);

    // Export to link
    const link = document.createElement('a');
    link.download = `Sertifikat-${certData.participantName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border-2 border-[#D49B42]/50 overflow-hidden flex flex-col my-auto max-h-[95vh]"
      >
        {/* Modal Top Bar */}
        <div className="bg-[#143E2E] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#D49B42]/40">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-[#E3AF58]/20 text-[#E3AF58]">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Sertifikat Kelulusan Resmi Workshop
              </h3>
              <p className="text-xs text-emerald-200/80">
                Penerbitan Digital • Disahkan oleh Instruktur Sitti Saadah Al amanah, S.Kom
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {canGetCertificate && (
              <>
                <button
                  onClick={handleDownloadPng}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#E3AF58] text-[#143E2E] hover:brightness-110 shadow transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Unduh PNG</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white transition border border-emerald-600"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cetak / Simpan PDF</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-emerald-900 text-emerald-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {!canGetCertificate ? (
            /* Locked State */
            <div className="text-center py-8 space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full mx-auto bg-amber-100 text-amber-700 flex items-center justify-center border-2 border-amber-300">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">
                Sertifikat Masih Terkunci
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Untuk mendapatkan sertifikat resmi bertanda tangan Instruktur, Anda perlu menyelesaikan syarat berikut:
              </p>
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-left text-xs space-y-2">
                {missingRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-amber-900">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#143E2E] text-[#E3AF58] hover:bg-[#1c553f] transition shadow"
              >
                Kembali ke Alur Belajar
              </button>
            </div>
          ) : (
            /* Certificate Presentation Card */
            <div
              id="printable-certificate"
              ref={certRef}
              className="relative p-6 sm:p-10 rounded-2xl bg-[#FAF7F2] border-8 border-[#D49B42] text-slate-800 shadow-xl overflow-hidden"
            >
              {/* Inner Emerald Border */}
              <div className="border-2 border-[#143E2E] p-4 sm:p-8 rounded-lg relative">
                {/* Thin gold accent border */}
                <div className="absolute inset-1.5 border border-[#D49B42]/50 pointer-events-none rounded" />

                {/* Islamic Corner Ornaments */}
                <div className="absolute top-2 left-2 text-[#D49B42] text-lg font-serif">❖</div>
                <div className="absolute top-2 right-2 text-[#D49B42] text-lg font-serif">❖</div>
                <div className="absolute bottom-2 left-2 text-[#D49B42] text-lg font-serif">❖</div>
                <div className="absolute bottom-2 right-2 text-[#D49B42] text-lg font-serif">❖</div>

                {/* Certificate Content */}
                <div className="text-center space-y-4 max-w-2xl mx-auto py-2">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold tracking-widest text-[#143E2E] uppercase">
                      Muslimat Hidayatullah • Multimedia & Dakwah Visual
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#143E2E] font-cinzel">
                      SERTIFIKAT KELULUSAN
                    </h2>
                    <div className="text-xs sm:text-sm font-serif-islamic text-[#D49B42] italic">
                      Certificate of Mastery & Completion
                    </div>
                  </div>

                  <div className="py-2">
                    <p className="text-xs text-slate-500">Diberikan dengan bangga kepada:</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#143E2E] font-serif-islamic mt-1">
                      {certData.participantName}
                    </h3>
                    <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-[#D49B42] to-transparent mx-auto my-1.5" />
                    <p className="text-xs text-slate-600 font-medium">
                      {certData.organization || 'Peserta Workshop Desain Grafis'}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto">
                    Atas keberhasilan menyelesaikan seluruh tahapan pembelajaran, uji teori (Pre-Test & Post-Test), serta kelulusan rubrik tugas desain pada:
                  </p>

                  <div className="bg-[#143E2E]/5 border border-[#D49B42]/30 p-3 rounded-xl">
                    <div className="font-bold text-sm sm:text-base text-[#143E2E]">
                      WORKSHOP DESAIN FLYER & POSTER PROFESIONAL MUSLIMAH
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Kompetensi: Nirmana 2D Komposisi, Tipografi Hierarki, dan Harmoni Palet Warna 60-30-10
                    </div>
                  </div>

                  {/* Competency & Score Badge */}
                  <div className="inline-flex items-center space-x-3 bg-white border border-[#D49B42]/40 px-4 py-1.5 rounded-full text-xs shadow-sm">
                    <span className="text-[#143E2E] font-semibold">
                      Nilai Akhir: <strong>{certData.finalScore}/100</strong>
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-emerald-700 font-bold">
                      Predikat: {certData.grade} (Sangat Memuaskan)
                    </span>
                  </div>

                  {/* Signatures & Seal Footer */}
                  <div className="pt-6 grid grid-cols-2 gap-4 items-end text-xs">
                    {/* Left: Certificate Metadata & Verification */}
                    <div className="text-left space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Verifikasi Sertifikat:</div>
                      <div className="font-mono text-[11px] font-bold text-[#143E2E]">{certData.verificationCode}</div>
                      <div className="text-[11px] text-slate-600">Diterbitkan: {certData.issueDate}</div>
                      <div className="text-[10px] text-emerald-700 font-medium">✓ Terverifikasi Digital Resmi</div>
                    </div>

                    {/* Right: Instructor Signature */}
                    <div className="text-right space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase">Instruktur & Pemateri Utama,</div>
                      <div className="h-10 flex items-center justify-end">
                        <span className="font-serif-islamic text-xl text-[#143E2E] italic tracking-wider">
                          Sitti Saadah
                        </span>
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-[#143E2E] border-t border-[#D49B42]/60 pt-1 inline-block">
                        {certData.instructorName}
                      </div>
                      <div className="text-[11px] text-[#D49B42] font-medium block">
                        {certData.instructorTitle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
