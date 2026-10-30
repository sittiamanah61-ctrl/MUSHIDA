import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { NirmanaStudio } from './components/studios/NirmanaStudio';
import { TypographyStudio } from './components/studios/TypographyStudio';
import { ColorPaletteStudio } from './components/studios/ColorPaletteStudio';
import { TaskSubmissionStudio } from './components/tasks/TaskSubmissionStudio';
import { QuizModal } from './components/quiz/QuizModal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { INITIAL_PARTICIPANTS } from './data/initialParticipants';
import { Participant, TaskSubmission, CertificateData } from './types/workshop';
import { Sparkles, Award, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  
  // Current Participant State
  const [participantName, setParticipantName] = useState<string>('Nurul Aini, S.Kom');
  const [organization, setOrganization] = useState<string>('Muslimat Hidayatullah');
  const [preTestScore, setPreTestScore] = useState<number | null>(null);
  const [postTestScore, setPostTestScore] = useState<number | null>(null);
  const [nirmanaDone, setNirmanaDone] = useState<boolean>(false);
  const [typoDone, setTypoDone] = useState<boolean>(false);
  const [paletteDone, setPaletteDone] = useState<boolean>(false);
  const [taskSubmission, setTaskSubmission] = useState<TaskSubmission | null>(null);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [certificateIssuedAt, setCertificateIssuedAt] = useState<string | null>(null);

  // External palette transferred between Palette Studio and Task Studio
  const [appliedPalette, setAppliedPalette] = useState<{
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
  } | null>(null);

  // Modals
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<'pretest' | 'posttest'>('pretest');
  const [certModalOpen, setCertModalOpen] = useState<boolean>(false);
  const [instructorModalOpen, setInstructorModalOpen] = useState<boolean>(false);
  const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState<boolean>(false);

  // Instructor Participant Database
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);

  // Derived completion checks
  const preTestDone = preTestScore !== null;
  const taskPassed = !!taskSubmission && taskSubmission.passed;
  const postTestPassed = postTestScore !== null && postTestScore >= 75;

  const canGetCertificate =
    preTestDone &&
    nirmanaDone &&
    typoDone &&
    paletteDone &&
    taskPassed &&
    postTestPassed;

  // Build missing requirements list
  const missingRequirements: string[] = [];
  if (!preTestDone) missingRequirements.push('Selesaikan Pre-Test (10 Soal)');
  if (!nirmanaDone) missingRequirements.push('Eksplorasi Studio Nirmana 2D');
  if (!typoDone) missingRequirements.push('Eksplorasi Studio Tipografi');
  if (!paletteDone) missingRequirements.push('Eksplorasi Studio Palet Warna');
  if (!taskPassed) missingRequirements.push('Kirim & Lulus Penilaian Tugas Desain (Skor minimal 75)');
  if (!postTestPassed) missingRequirements.push('Lulus Post-Test dengan nilai minimal 75');

  // Trigger certificate generation when fully satisfied
  useEffect(() => {
    if (canGetCertificate && !certificateId) {
      const newId = `CERT-DSN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setCertificateId(newId);
      setCertificateIssuedAt(now);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  }, [canGetCertificate, certificateId]);

  // Sync current user to participants list for instructor view
  useEffect(() => {
    setParticipants((prev) => {
      const existingIdx = prev.findIndex((p) => p.id === 'current-user');
      const currentUserData: Participant = {
        id: 'current-user',
        name: participantName,
        organization,
        email: 'peserta.aktif@mushida.or.id',
        preTestScore,
        postTestScore,
        nirmanaCompleted: nirmanaDone,
        typographyCompleted: typoDone,
        paletteCompleted: paletteDone,
        taskSubmission,
        certificateId,
        certificateIssuedAt,
        enrolledAt: '2026-10-29T10:00:00Z'
      };

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = currentUserData;
        return copy;
      }
      return [currentUserData, ...prev];
    });
  }, [
    participantName,
    organization,
    preTestScore,
    postTestScore,
    nirmanaDone,
    typoDone,
    paletteDone,
    taskSubmission,
    certificateId,
    certificateIssuedAt
  ]);

  // Handle Instructor PIN verification
  const handleInstructorLogin = (pin: string) => {
    if (pin.trim() === 'guru123') {
      setIsInstructorLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleInstructorLogout = () => {
    setIsInstructorLoggedIn(false);
  };

  const handleUpdateParticipant = (updated: Participant) => {
    setParticipants((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (updated.id === 'current-user' && updated.taskSubmission) {
      setTaskSubmission(updated.taskSubmission);
    }
  };

  // Certificate calculation data
  const finalAverage = Math.round(
    ((preTestScore || 70) * 0.15) +
    ((taskSubmission?.score || 85) * 0.5) +
    ((postTestScore || 85) * 0.35)
  );

  const certData: CertificateData = {
    certificateId: certificateId || 'CERT-DSN-2026-PREVIEW',
    participantName,
    organization,
    issueDate: certificateIssuedAt || new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    preTestScore: preTestScore || 0,
    postTestScore: postTestScore || 0,
    taskScore: taskSubmission?.score || 0,
    finalScore: finalAverage,
    grade: finalAverage >= 90 ? 'A (Mumtaz)' : finalAverage >= 80 ? 'B+ (Sangat Baik)' : 'B (Baik)',
    instructorName: 'Sitti Saadah Al amanah, S.Kom',
    instructorTitle: 'Instruktur Desain Grafis & Multimedia',
    verificationCode: certificateId || 'CERT-DSN-2026-SAMPLE'
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-slate-800 flex flex-col selection:bg-[#E3AF58]/30 selection:text-[#143E2E]">
      {/* Sticky Header Nav with animated design motifs */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        participantName={participantName}
        setParticipantName={setParticipantName}
        organization={organization}
        setOrganization={setOrganization}
        isInstructorLoggedIn={isInstructorLoggedIn}
        setIsInstructorModalOpen={setInstructorModalOpen}
        preTestDone={preTestDone}
        nirmanaDone={nirmanaDone}
        typoDone={typoDone}
        paletteDone={paletteDone}
        taskPassed={taskPassed}
        postTestPassed={postTestPassed}
        canGetCertificate={canGetCertificate}
        setIsCertModalOpen={setCertModalOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Tab 1: Beranda & Ringkasan */}
        {activeTab === 'beranda' && (
          <HeroSection
            onStartPreTest={() => {
              setQuizMode('pretest');
              setQuizModalOpen(true);
            }}
            onOpenStudio={(tab) => {
              if (tab === 'posttest') {
                setQuizMode('posttest');
                setQuizModalOpen(true);
              } else {
                setActiveTab(tab);
              }
            }}
            preTestScore={preTestScore}
            nirmanaDone={nirmanaDone}
            typoDone={typoDone}
            paletteDone={paletteDone}
            taskPassed={taskPassed}
            postTestPassed={postTestPassed}
            canGetCertificate={canGetCertificate}
            onOpenCertificate={() => setCertModalOpen(true)}
          />
        )}

        {/* Tab 2: Pre-Test Tab trigger */}
        {activeTab === 'pretest' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#143E2E] flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#143E2E]">Modul 1: Pre-Test Teori Desain Dasar</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kuis ini terdiri dari 10 nomor soal mudah mengenai prinsip keseimbangan, kontras keterbacaan,
              aturan palet warna 60-30-10, dan tipografi publikasi Muslimah.
            </p>
            {preTestScore !== null && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-bold text-sm inline-block">
                Nilai Pre-Test Anda: {preTestScore} / 100
              </div>
            )}
            <div>
              <button
                onClick={() => {
                  setQuizMode('pretest');
                  setQuizModalOpen(true);
                }}
                className="px-6 py-3 bg-[#143E2E] hover:bg-[#1c553f] text-[#E3AF58] font-bold text-sm rounded-xl shadow transition"
              >
                {preTestScore !== null ? 'Buka Kembali / Tinjau Soal' : 'Mulai Kerjakan Pre-Test (10 Soal)'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Studio Nirmana */}
        {activeTab === 'nirmana' && (
          <NirmanaStudio
            onComplete={() => setNirmanaDone(true)}
            isCompleted={nirmanaDone}
          />
        )}

        {/* Tab 4: Studio Tipografi */}
        {activeTab === 'typography' && (
          <TypographyStudio
            onComplete={() => setTypoDone(true)}
            isCompleted={typoDone}
          />
        )}

        {/* Tab 5: Studio Palet Warna */}
        {activeTab === 'palette' && (
          <ColorPaletteStudio
            onComplete={() => setPaletteDone(true)}
            isCompleted={paletteDone}
            onApplyToTask={(pal) => {
              setAppliedPalette(pal);
              setActiveTab('task');
            }}
          />
        )}

        {/* Tab 6: Tugas & Penilaian Otomatis */}
        {activeTab === 'task' && (
          <TaskSubmissionStudio
            participantName={participantName}
            organization={organization}
            currentSubmission={taskSubmission}
            onSaveSubmission={(sub) => setTaskSubmission(sub)}
            externalPalette={appliedPalette}
          />
        )}

        {/* Tab 7: Post-Test Tab trigger */}
        {activeTab === 'posttest' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#E3AF58]/20 text-[#143E2E] flex items-center justify-center mx-auto border border-[#E3AF58]">
              <Award className="w-8 h-8 text-[#D49B42]" />
            </div>
            <h2 className="text-2xl font-bold text-[#143E2E]">Modul 6: Post-Test Kelulusan Workshop</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Post-test menguji penguasaan materi setelah Anda mempelajari Nirmana, Tipografi, Palet Warna, dan mengerjakan tugas.
              Dibutuhkan nilai minimal <strong>75 / 100</strong> untuk membuka sertifikat resmi.
            </p>
            {postTestScore !== null && (
              <div
                className={`p-4 rounded-2xl border font-bold text-sm inline-block ${
                  postTestPassed
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}
              >
                Nilai Post-Test Anda: {postTestScore} / 100 ({postTestPassed ? 'LULUS ✓' : 'Belum Lulus, Coba Lagi'})
              </div>
            )}
            <div>
              <button
                onClick={() => {
                  setQuizMode('posttest');
                  setQuizModalOpen(true);
                }}
                className="px-6 py-3 bg-[#143E2E] hover:bg-[#1c553f] text-[#E3AF58] font-bold text-sm rounded-xl shadow transition"
              >
                {postTestScore !== null ? 'Kerjakan Ulang / Tinjau Soal Post-Test' : 'Mulai Post-Test (10 Soal)'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 8: Sertifikat Kelulusan */}
        {activeTab === 'certificate' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#143E2E] to-[#1c553f] text-[#E3AF58] flex items-center justify-center mx-auto border-2 border-[#E3AF58] shadow-lg">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#143E2E]">Sertifikat Kelulusan Resmi Digital</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Disahkan langsung oleh Instruktur <strong>Sitti Saadah Al amanah, S.Kom</strong>
              </p>
            </div>

            {canGetCertificate ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-900 text-xs sm:text-sm space-y-1">
                  <div className="font-bold flex items-center justify-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Selamat! Anda Telah Memenuhi Seluruh Syarat Kelulusan
                  </div>
                  <p className="text-slate-600 text-xs">
                    No. Sertifikat: <strong className="font-mono">{certificateId}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setCertModalOpen(true)}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#E3AF58] to-[#D49B42] text-[#143E2E] font-bold text-sm rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition"
                >
                  Buka & Unduh Sertifikat Resmi (PNG / Cetak PDF)
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left text-xs space-y-2">
                  <div className="font-bold text-amber-900">Syarat yang belum terpenuhi:</div>
                  {missingRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCertModalOpen(true)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
                >
                  Pratinjau Format Sertifikat
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#103426] text-emerald-200/80 border-t border-[#D49B42]/30 py-8 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#E3AF58]/20 border border-[#E3AF58]/50 flex items-center justify-center text-[#E3AF58] font-bold font-cinzel">
              MH
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                Workshop Desain Flyer Profesional Muslimah
              </p>
              <p className="text-[11px] text-emerald-300/70">
                Instruktur: <strong>Sitti Saadah Al amanah, S.Kom</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E3AF58]" />
              Kreativitas • Kolaborasi • Dakwah Visual
            </span>
            <span>•</span>
            <button
              onClick={() => setInstructorModalOpen(true)}
              className="text-[#E3AF58] hover:underline font-semibold"
            >
              Login Instruktur (guru123)
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <QuizModal
        mode={quizMode}
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        previousScore={quizMode === 'pretest' ? preTestScore : postTestScore}
        onFinish={(score) => {
          if (quizMode === 'pretest') {
            setPreTestScore(score);
          } else {
            setPostTestScore(score);
          }
        }}
      />

      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        certData={certData}
        canGetCertificate={canGetCertificate}
        missingRequirements={missingRequirements}
      />

      <InstructorDashboard
        isOpen={instructorModalOpen}
        onClose={() => setInstructorModalOpen(false)}
        isLoggedIn={isInstructorLoggedIn}
        onLogin={handleInstructorLogin}
        onLogout={handleInstructorLogout}
        participants={participants}
        onUpdateParticipant={handleUpdateParticipant}
      />
    </div>
  );
}
