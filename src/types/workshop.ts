export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'prinsip_desain' | 'palet_warna';
}

export interface EvaluationCategoryBreakdown {
  category: string;
  score: number;
  maxScore: number;
  status: 'optimal' | 'cukup' | 'perlu_perbaikan';
  feedback: string;
}

export interface TaskSubmission {
  id: string;
  participantName: string;
  title: string;
  subtitle: string;
  bodyText: string;
  callToAction: string;
  category: 'Kajian Muslimah' | 'Bakti Sosial' | 'Workshop Organisasi' | 'Peringatan Hari Besar Islam';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  h1Font: string;
  bodyFont: string;
  h1Size: number;
  bodySize: number;
  alignment: 'left' | 'center' | 'right';
  hasPattern: boolean;
  ornamentStyle: 'khatam' | 'arch' | 'floral' | 'minimal';
  uploadedImageUrl?: string;
  score: number;
  grade: 'A' | 'B+' | 'B' | 'C' | 'D';
  passed: boolean;
  breakdowns: EvaluationCategoryBreakdown[];
  critiqueSummary: string;
  submittedAt: string;
}

export interface Participant {
  id: string;
  name: string;
  organization: string;
  email: string;
  preTestScore: number | null;
  postTestScore: number | null;
  nirmanaCompleted: boolean;
  typographyCompleted: boolean;
  paletteCompleted: boolean;
  taskSubmission: TaskSubmission | null;
  certificateId: string | null;
  certificateIssuedAt: string | null;
  enrolledAt: string;
}

export interface CertificateData {
  certificateId: string;
  participantName: string;
  organization: string;
  issueDate: string;
  preTestScore: number;
  postTestScore: number;
  taskScore: number;
  finalScore: number;
  grade: string;
  instructorName: string;
  instructorTitle: string;
  verificationCode: string;
}
