import { EvaluationCategoryBreakdown, TaskSubmission } from '../types/workshop';

// Calculate relative luminance of a hex color for WCAG contrast
export function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return 0.5;
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate contrast ratio between two hex colors (1:1 to 21:1)
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Automated grading rubric for design flyer submission
export function evaluateTaskSubmission(
  submission: Omit<TaskSubmission, 'score' | 'grade' | 'passed' | 'breakdowns' | 'critiqueSummary' | 'submittedAt'>
): {
  score: number;
  grade: 'A' | 'B+' | 'B' | 'C' | 'D';
  passed: boolean;
  breakdowns: EvaluationCategoryBreakdown[];
  critiqueSummary: string;
} {
  const breakdowns: EvaluationCategoryBreakdown[] = [];

  // 1. Kontras Warna & Keterbacaan (Max 25 pts)
  const textBgRatio = getContrastRatio(submission.primaryColor, submission.backgroundColor);
  const buttonContrast = getContrastRatio(submission.secondaryColor, submission.accentColor);
  let contrastScore = 20;
  let contrastFeedback = '';

  if (textBgRatio >= 7) {
    contrastScore = 25;
    contrastFeedback = `Rasio kontras teks utama sangat tinggi (${textBgRatio.toFixed(1)}:1). Memenuhi standar tertinggi WCAG AAA, tulisan sangat mudah dibaca audiens dari kejauhan.`;
  } else if (textBgRatio >= 4.5) {
    contrastScore = 22;
    contrastFeedback = `Rasio kontras teks memenuhi standar WCAG AA (${textBgRatio.toFixed(1)}:1). Tingkat keterbacaan flyer sudah aman dan jelas di layar smartphone.`;
  } else if (textBgRatio >= 3) {
    contrastScore = 17;
    contrastFeedback = `Rasio kontras teks cukup (${textBgRatio.toFixed(1)}:1), namun disarankan mempertegas warna teks atau menggelapkan/mencerahkan latar agar lebih tajam.`;
  } else {
    contrastScore = 12;
    contrastFeedback = `Peringatan keterbacaan: rasio kontras rendah (${textBgRatio.toFixed(1)}:1). Warna teks dan background terlalu mirip sehingga sulit dibaca.`;
  }

  breakdowns.push({
    category: 'Kontras Warna & Keterbacaan',
    score: contrastScore,
    maxScore: 25,
    status: contrastScore >= 22 ? 'optimal' : contrastScore >= 16 ? 'cukup' : 'perlu_perbaikan',
    feedback: contrastFeedback
  });

  // 2. Hierarki Visual & Tipografi (Max 25 pts)
  const fontRatio = submission.h1Size / Math.max(submission.bodySize, 10);
  let typoScore = 21;
  let typoFeedback = '';

  if (fontRatio >= 2.0 && fontRatio <= 3.5) {
    typoScore = 25;
    typoFeedback = `Hierarki tipografi luar biasa! Perbandingan ukuran judul (${submission.h1Size}px) dan teks isi (${submission.bodySize}px) memiliki rasio ${fontRatio.toFixed(1)}x yang ideal sehingga fokus mata audiens langsung tertuju ke pesan utama.`;
  } else if (fontRatio > 3.5) {
    typoScore = 22;
    typoFeedback = `Judul sangat mencolok, namun pastikan teks isi tetap proporsional dan tidak tenggelam.`;
  } else if (fontRatio >= 1.5) {
    typoScore = 20;
    typoFeedback = `Hierarki ukuran judul cukup baik (${fontRatio.toFixed(1)}x), masih bisa dipertegas sedikit agar judul makin menonjol saat di-feed Instagram.`;
  } else {
    typoScore = 14;
    typoFeedback = `Ukuran judul dan teks isi terlalu berdekatan (${fontRatio.toFixed(1)}x). Berikan perbedaan ukuran minimal 2x lipat agar pembaca mengenali judul dalam 3 detik.`;
  }

  breakdowns.push({
    category: 'Hierarki Visual & Tipografi',
    score: typoScore,
    maxScore: 25,
    status: typoScore >= 22 ? 'optimal' : typoScore >= 16 ? 'cukup' : 'perlu_perbaikan',
    feedback: typoFeedback
  });

  // 3. Komposisi & Nirmana (Keseimbangan & White Space) (Max 25 pts)
  let compScore = 22;
  let compFeedback = '';

  const hasGoodTitleLength = submission.title.length >= 10 && submission.title.length <= 60;
  const hasGoodBodyLength = submission.bodyText.length >= 15;
  const hasCTA = submission.callToAction.length > 5;

  if (hasGoodTitleLength && hasGoodBodyLength && hasCTA) {
    compScore = 24;
    compFeedback = `Struktur komposisi lengkap dan seimbang: terdapat Focal Point (Judul), Informasi Acara (Body), dan Call-To-Action yang jelas dengan perataan ${submission.alignment === 'center' ? 'tengah simetris' : 'kiri dinamis'}.`;
  } else {
    compScore = 18;
    compFeedback = `Komposisi konten masih bisa disempurnakan. Pastikan terdapat tanggal, jam, dan petunjuk pendaftaran yang lengkap bagi audiens.`;
  }

  breakdowns.push({
    category: 'Komposisi & Nirmana (Keseimbangan)',
    score: compScore,
    maxScore: 25,
    status: compScore >= 22 ? 'optimal' : compScore >= 16 ? 'cukup' : 'perlu_perbaikan',
    feedback: compFeedback
  });

  // 4. Kesesuaian Tema Muslimah & Harmoni Palet (Max 25 pts)
  let aestheticScore = 22;
  let aestheticFeedback = '';

  // Check if green / gold / cream hues or harmonious tones are present
  const isEmeraldOrSage = /#1[0-9a-f]{5}|#2[0-9a-f]{5}|#3[0-9a-f]{5}|#4[0-9a-f]{5}/i.test(submission.primaryColor);
  const hasIslamicOrnament = submission.ornamentStyle === 'khatam' || submission.ornamentStyle === 'arch';

  if (hasIslamicOrnament && isEmeraldOrSage) {
    aestheticScore = 25;
    aestheticFeedback = `Karakter visual Muslimah sangat kuat dan anggun! Penggunaan nuansa hijau berpadu ornamen ${submission.ornamentStyle === 'khatam' ? 'Khatam Bintang Delapan' : 'Lengkung Kubah Masjid'} memancarkan keteduhan dan kemuliaan dakwah.`;
  } else if (hasIslamicOrnament || isEmeraldOrSage) {
    aestheticScore = 23;
    aestheticFeedback = `Sentuhan estetika Islami terlihat manis dan harmonis dengan tema organisasi Muslimah. Ornamen memperkaya visual tanpa berlebihan.`;
  } else {
    aestheticScore = 20;
    aestheticFeedback = `Kombinasi warna bersih dan modern. Pertimbangkan menambahkan ornamen khas geometris atau aksen emas untuk memperkuat identitas publikasi Muslimah.`;
  }

  breakdowns.push({
    category: 'Estetika & Nilai Desain Muslimah',
    score: aestheticScore,
    maxScore: 25,
    status: aestheticScore >= 22 ? 'optimal' : aestheticScore >= 16 ? 'cukup' : 'perlu_perbaikan',
    feedback: aestheticFeedback
  });

  const totalScore = contrastScore + typoScore + compScore + aestheticScore;
  let grade: 'A' | 'B+' | 'B' | 'C' | 'D' = 'B';
  if (totalScore >= 90) grade = 'A';
  else if (totalScore >= 80) grade = 'B+';
  else if (totalScore >= 75) grade = 'B';
  else if (totalScore >= 60) grade = 'C';
  else grade = 'D';

  const passed = totalScore >= 75;

  let critiqueSummary = '';
  if (totalScore >= 90) {
    critiqueSummary = `Mumtaz! Karya flyer Anda sangat istimewa. Tata letak harmonis, hierarki teks tajam, dan palet warna mencerminkan publikasi organisasi Muslimah yang profesional dan bernilai tinggi.`;
  } else if (totalScore >= 80) {
    critiqueSummary = `Kerja yang sangat bagus! Desain flyer telah memenuhi prinsip-prinsip utama desain grafis dasar, mudah dibaca, dan siap dipublikasikan ke media sosial organisasi.`;
  } else if (totalScore >= 75) {
    critiqueSummary = `Selamat, tugas Anda telah mencapai batas kelulusan workshop. Perhatikan catatan evaluasi untuk menyempurnakan kontras atau hierarki teks agar makin memikat.`;
  } else {
    critiqueSummary = `Desain memiliki potensi yang baik, namun rasio kontras teks atau hierarki ukuran font masih perlu perbaikan. Silakan sesuaikan kembali dan lakukan evaluasi ulang!`;
  }

  return {
    score: totalScore,
    grade,
    passed,
    breakdowns,
    critiqueSummary
  };
}
