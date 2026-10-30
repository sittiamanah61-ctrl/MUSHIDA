import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  X
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizQuestions';

interface QuizModalProps {
  mode: 'pretest' | 'posttest';
  isOpen: boolean;
  onClose: () => void;
  onFinish: (score: number) => void;
  previousScore: number | null;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  mode,
  isOpen,
  onClose,
  onFinish,
  previousScore
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    setIsSubmitted(true);
    onFinish(finalScore);

    if (mode === 'posttest' && finalScore >= 75) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setShowReview(false);
  };

  const score = isSubmitted ? calculateScore() : 0;
  const passed = score >= 75;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-[#D49B42]/50 overflow-hidden flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#143E2E] text-white p-5 flex items-center justify-between border-b border-[#D49B42]/40">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-[#E3AF58]/20 text-[#E3AF58]">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                {mode === 'pretest' ? 'Pre-Test Workshop Desain' : 'Post-Test Kelulusan Workshop'}
                <span className="text-xs bg-[#E3AF58] text-[#143E2E] px-2 py-0.5 rounded-full font-semibold">
                  10 Nomor
                </span>
              </h3>
              <p className="text-xs text-emerald-200/80">
                Prinsip Desain Grafis & Palet Warna Dasar • Instruktur Sitti Saadah Al amanah, S.Kom
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-emerald-900 text-emerald-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isSubmitted ? (
            <>
              {/* Progress and Category Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">
                    Nomor {currentIndex + 1} dari {totalQuestions}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Kategori: {currentQ.category === 'prinsip_desain' ? 'Prinsip Desain' : 'Palet Warna'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#143E2E] to-[#E3AF58] transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#D49B42]/30">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-start space-x-3 ${
                        isSelected
                          ? 'border-[#143E2E] bg-emerald-50/80 text-[#143E2E] font-semibold shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                          isSelected
                            ? 'bg-[#143E2E] text-[#E3AF58]'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Question Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-100 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    className="flex items-center space-x-1 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#143E2E] text-[#E3AF58] hover:bg-[#1c553f] transition"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={answeredCount < totalQuestions}
                    className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#E3AF58] to-[#D49B42] text-[#143E2E] shadow-md hover:brightness-110 disabled:opacity-50 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Selesaikan Kuis ({answeredCount}/{totalQuestions})</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="space-y-6 text-center py-2">
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-gradient-to-tr from-[#143E2E] to-[#1c553f] text-[#E3AF58] shadow-lg border-2 border-[#E3AF58]">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {mode === 'pretest' ? 'Hasil Pre-Test Anda' : 'Hasil Post-Test Kelulusan'}
                </h3>
                <div className="text-4xl font-extrabold text-[#143E2E]">
                  {score} <span className="text-lg font-normal text-slate-500">/ 100</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  {mode === 'pretest'
                    ? 'Hasil pre-test menjadi tolok ukur awal. Sekarang Anda siap melanjutkan eksplorasi ke studio interaktif!'
                    : passed
                    ? 'Alhamdulillah! Anda berhasil melampaui batas kelulusan minimal 75. Sertifikat resmi telah terbuka!'
                    : 'Nilai Anda belum mencapai syarat kelulusan minimal 75. Silakan ulangi kuis setelah meninjau penjelasan instruktur.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowReview(!showReview)}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#143E2E]" />
                  <span>{showReview ? 'Sembunyikan Pembahasan' : 'Lihat Kunci & Pembahasan Soal'}</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Kuis</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#143E2E] text-[#E3AF58] hover:bg-[#1b533e] transition shadow"
                >
                  <span>Tutup & Lanjutkan</span>
                </button>
              </div>

              {/* Review Section */}
              {showReview && (
                <div className="text-left space-y-4 pt-4 border-t border-slate-100 mt-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#143E2E]">
                    Tinjauan 10 Soal & Penjelasan Instruktur:
                  </h4>
                  <div className="space-y-3">
                    {QUIZ_QUESTIONS.map((q, idx) => {
                      const userAns = selectedAnswers[q.id];
                      const isCorrect = userAns === q.correctIndex;
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-xl border text-xs space-y-2 ${
                            isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'
                          }`}
                        >
                          <div className="flex items-start justify-between font-semibold text-slate-800">
                            <span>
                              {idx + 1}. {q.question}
                            </span>
                            {isCorrect ? (
                              <span className="flex items-center text-emerald-700 text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Benar
                              </span>
                            ) : (
                              <span className="flex items-center text-red-700 text-[11px] font-bold">
                                <XCircle className="w-3.5 h-3.5 mr-1" /> Salah
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600">
                            Kunci Jawaban:{' '}
                            <strong className="text-emerald-800">
                              {q.options[q.correctIndex]}
                            </strong>
                          </p>
                          <div className="p-2.5 rounded-lg bg-white/80 border border-slate-200 text-[11px] text-slate-700">
                            <strong>Catatan Instruktur:</strong> {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
