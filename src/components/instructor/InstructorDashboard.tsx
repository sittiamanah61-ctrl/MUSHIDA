import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Users,
  Award,
  FileCheck2,
  Download,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  LogOut,
  X,
  Edit3,
  Save,
  Check,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Participant } from '../../types/workshop';

interface InstructorDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  participants: Participant[];
  onUpdateParticipant: (updated: Participant) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLogin,
  onLogout,
  participants,
  onUpdateParticipant
}) => {
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'certified' | 'in_progress'>('all');
  const [inspectingParticipant, setInspectingParticipant] = useState<Participant | null>(null);

  // Score override state
  const [isEditingScore, setIsEditingScore] = useState(false);
  const [newScore, setNewScore] = useState(0);
  const [instructorNote, setInstructorNote] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pinInput);
    if (success) {
      setPinInput('');
      setLoginError('');
    } else {
      setLoginError('PIN yang Anda masukkan salah. Silakan coba kembali.');
    }
  };

  // Metrics
  const totalCount = participants.length;
  const certifiedCount = participants.filter((p) => p.certificateId).length;
  const taskCount = participants.filter((p) => p.taskSubmission !== null).length;
  
  const preTestScores = participants.map((p) => p.preTestScore).filter((s): s is number => s !== null);
  const avgPreTest = preTestScores.length
    ? Math.round(preTestScores.reduce((a, b) => a + b, 0) / preTestScores.length)
    : 0;

  const postTestScores = participants.map((p) => p.postTestScore).filter((s): s is number => s !== null);
  const avgPostTest = postTestScores.length
    ? Math.round(postTestScores.reduce((a, b) => a + b, 0) / postTestScores.length)
    : 0;

  // Filtered list
  const filteredParticipants = participants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.organization.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus === 'certified') return !!p.certificateId;
    if (filterStatus === 'in_progress') return !p.certificateId;
    return true;
  });

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'ID Peserta',
      'Nama Peserta',
      'Organisasi',
      'Email',
      'Skor Pre-Test',
      'Nirmana',
      'Tipografi',
      'Warna',
      'Nilai Tugas',
      'Skor Post-Test',
      'No Sertifikat'
    ];
    const rows = participants.map((p) => [
      p.id,
      `"${p.name}"`,
      `"${p.organization}"`,
      p.email,
      p.preTestScore ?? '-',
      p.nirmanaCompleted ? 'Selesai' : 'Belum',
      p.typographyCompleted ? 'Selesai' : 'Belum',
      p.paletteCompleted ? 'Selesai' : 'Belum',
      p.taskSubmission ? p.taskSubmission.score : '-',
      p.postTestScore ?? '-',
      p.certificateId ?? '-'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Workshop_Desain_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInspection = (p: Participant) => {
    setInspectingParticipant(p);
    setNewScore(p.taskSubmission?.score || 80);
    setInstructorNote(p.taskSubmission?.critiqueSummary || '');
    setIsEditingScore(false);
  };

  const handleSaveScoreOverride = () => {
    if (!inspectingParticipant) return;
    const updated: Participant = {
      ...inspectingParticipant,
      taskSubmission: inspectingParticipant.taskSubmission
        ? {
            ...inspectingParticipant.taskSubmission,
            score: newScore,
            passed: newScore >= 75,
            critiqueSummary: instructorNote
          }
        : null
    };
    onUpdateParticipant(updated);
    setInspectingParticipant(updated);
    setIsEditingScore(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border-2 border-[#D49B42]/50 overflow-hidden flex flex-col my-auto max-h-[95vh]"
      >
        {/* Header */}
        <div className="bg-[#143E2E] text-white p-5 flex items-center justify-between border-b border-[#D49B42]/40">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#E3AF58]/20 text-[#E3AF58] border border-[#E3AF58]/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                Dashboard Pemateri
                <span className="text-xs bg-[#E3AF58] text-[#143E2E] px-2 py-0.5 rounded-full font-bold">
                  Sitti Saadah Al amanah, S.Kom
                </span>
              </h3>
              <p className="text-xs text-emerald-200/80">
                Pusat Manajemen Peserta, Evaluasi Tugas, dan Penerbitan Sertifikat Resmi
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-900 hover:bg-emerald-800 text-emerald-200 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-emerald-900 text-emerald-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-10 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#143E2E] to-[#1c553f] text-[#E3AF58] flex items-center justify-center mx-auto border-2 border-[#E3AF58] shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-800">
                  Verifikasi Akses Pemateri
                </h4>
                <p className="text-xs text-slate-500">
                  Masukkan PIN khusus untuk mengelola data nilai dan sertifikat peserta.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Masukkan PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
                    autoFocus
                  />
                  {loginError && (
                    <p className="text-xs text-red-600 mt-2 font-medium">{loginError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#143E2E] hover:bg-[#1c553f] text-[#E3AF58] font-bold text-sm rounded-xl shadow-md transition"
                >
                  Masuk ke Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard View */
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Total Peserta
                  </div>
                  <div className="text-2xl font-extrabold text-[#143E2E] mt-1">{totalCount}</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Aktif terdaftar</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    Pre-Test vs Post-Test
                  </div>
                  <div className="text-2xl font-extrabold text-amber-900 mt-1">
                    {avgPreTest} <span className="text-xs font-normal text-slate-500">→</span> {avgPostTest}
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">Peningkatan nilai (+{avgPostTest - avgPreTest})</div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <div className="text-xs font-semibold text-blue-800 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-blue-600" />
                    Tugas Otomatis
                  </div>
                  <div className="text-2xl font-extrabold text-blue-900 mt-1">{taskCount}</div>
                  <div className="text-[11px] text-blue-700 mt-0.5">Flyer dinilai sistem</div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <div className="text-xs font-semibold text-purple-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-purple-600" />
                    Sertifikat Terbit
                  </div>
                  <div className="text-2xl font-extrabold text-purple-900 mt-1">{certifiedCount}</div>
                  <div className="text-[11px] text-purple-700 mt-0.5">Peserta lulus resmi</div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama atau organisasi..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] focus:outline-none"
                    />
                  </div>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#143E2E] bg-white"
                  >
                    <option value="all">Semua Status</option>
                    <option value="certified">Sudah Bersertifikat</option>
                    <option value="in_progress">Sedang Belajar</option>
                  </select>
                </div>

                <button
                  onClick={handleExportCsv}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Rekap Nilai CSV</span>
                </button>
              </div>

              {/* Participants Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200 text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Peserta & Lembaga</th>
                      <th className="p-3.5 text-center">Pre-Test</th>
                      <th className="p-3.5 text-center">Studio</th>
                      <th className="p-3.5 text-center">Tugas Flyer</th>
                      <th className="p-3.5 text-center">Post-Test</th>
                      <th className="p-3.5 text-center">Status Sertifikat</th>
                      <th className="p-3.5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredParticipants.map((p) => {
                      const studiosDoneCount = [
                        p.nirmanaCompleted,
                        p.typographyCompleted,
                        p.paletteCompleted
                      ].filter(Boolean).length;

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3.5">
                            <div className="font-bold text-slate-800 text-xs">{p.name}</div>
                            <div className="text-[11px] text-slate-500">{p.organization}</div>
                          </td>

                          <td className="p-3.5 text-center">
                            {p.preTestScore !== null ? (
                              <span className="font-bold text-slate-700">{p.preTestScore}</span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>

                          <td className="p-3.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                              {studiosDoneCount}/3 Modul
                            </span>
                          </td>

                          <td className="p-3.5 text-center">
                            {p.taskSubmission ? (
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                  p.taskSubmission.passed
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {p.taskSubmission.score} ({p.taskSubmission.grade})
                              </span>
                            ) : (
                              <span className="text-slate-400">Belum kumpul</span>
                            )}
                          </td>

                          <td className="p-3.5 text-center">
                            {p.postTestScore !== null ? (
                              <span
                                className={`font-bold ${
                                  p.postTestScore >= 75 ? 'text-emerald-700' : 'text-amber-700'
                                }`}
                              >
                                {p.postTestScore}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>

                          <td className="p-3.5 text-center">
                            {p.certificateId ? (
                              <span className="inline-flex items-center text-emerald-700 font-bold text-[11px] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                                {p.certificateId}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Belum Lengkap</span>
                            )}
                          </td>

                          <td className="p-3.5 text-center">
                            <button
                              onClick={() => openInspection(p)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#143E2E] hover:text-[#E3AF58] text-slate-700 font-semibold text-xs transition"
                            >
                              Tinjau Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Detail Inspection Modal */}
              {inspectingParticipant && (
                <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#E3AF58] space-y-4 max-h-[90vh] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h4 className="font-bold text-base text-[#143E2E]">
                          Detail Peserta: {inspectingParticipant.name}
                        </h4>
                        <p className="text-xs text-slate-500">{inspectingParticipant.organization}</p>
                      </div>
                      <button
                        onClick={() => setInspectingParticipant(null)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Task Overview */}
                    {inspectingParticipant.taskSubmission ? (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-slate-50 border text-xs space-y-1">
                          <div className="font-bold text-slate-800">
                            Judul Flyer: {inspectingParticipant.taskSubmission.title}
                          </div>
                          <div className="text-slate-600">
                            Subjudul: {inspectingParticipant.taskSubmission.subtitle}
                          </div>
                          <div className="text-slate-600">
                            Kategori: {inspectingParticipant.taskSubmission.category}
                          </div>
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-700">Rincian Nilai Rubrik Otomatis:</span>
                          {inspectingParticipant.taskSubmission.breakdowns.map((b, i) => (
                            <div key={i} className="flex justify-between text-xs p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                              <span>{b.category}</span>
                              <span className="font-bold text-[#143E2E]">{b.score}/{b.maxScore} pts</span>
                            </div>
                          ))}
                        </div>

                        {/* Score override */}
                        <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/70 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-950 flex items-center gap-1">
                              <Edit3 className="w-3.5 h-3.5 text-[#D49B42]" />
                              Penyesuaian Nilai oleh Instruktur:
                            </span>
                            <span className="text-xs font-bold text-[#143E2E]">
                              Skor Saat Ini: {inspectingParticipant.taskSubmission.score}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={newScore}
                              onChange={(e) => setNewScore(Number(e.target.value))}
                              className="w-24 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                            <span className="text-xs text-slate-500">/ 100</span>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Catatan & Apresiasi Khusus Instruktur:
                            </label>
                            <textarea
                              rows={2}
                              value={instructorNote}
                              onChange={(e) => setInstructorNote(e.target.value)}
                              className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>

                          <button
                            onClick={handleSaveScoreOverride}
                            className="w-full py-2 bg-[#143E2E] hover:bg-[#1c553f] text-[#E3AF58] text-xs font-bold rounded-lg shadow transition flex items-center justify-center space-x-1"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Simpan Nilai & Catatan Instruktur</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500">
                        Peserta belum mengirimkan tugas desain flyer.
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
