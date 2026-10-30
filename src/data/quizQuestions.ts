import { QuizQuestion } from '../types/workshop';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa fungsi utama dari prinsip 'Keseimbangan' (Balance) dalam desain flyer poster?",
    options: [
      "Membuat poster terlihat rata dan nyaman dipandang tanpa berat sebelah",
      "Memastikan semua warna menggunakan warna hijau saja",
      "Mengisi semua ruang kosong tanpa menyisakan tempat",
      "Menggunakan sebanyak mungkin jenis font dalam satu halaman"
    ],
    correctIndex: 0,
    explanation: "Keseimbangan (simetris atau asimetris) menjaga distribusi bobot visual elemen agar poster terasa harmonis dan nyaman dilihat audiens.",
    category: 'prinsip_desain'
  },
  {
    id: 2,
    question: "Mengapa prinsip 'Kontras' sangat penting saat menaruh teks di atas latar belakang?",
    options: [
      "Agar warna teks menyatu dan tidak terlihat sama sekali",
      "Agar tulisan mudah dibaca dan langsung mencuri perhatian",
      "Hanya sebagai hiasan tambahan tanpa fungsi khusus",
      "Agar ukuran file gambar menjadi lebih kecil"
    ],
    correctIndex: 1,
    explanation: "Kontras warna (misalnya teks terang di atas latar gelap atau sebaliknya) menjamin tingkat keterbacaan (readability) yang tinggi bagi pembaca poster.",
    category: 'prinsip_desain'
  },
  {
    id: 3,
    question: "Dalam membuat poster kajian atau workshop, elemen manakah yang seharusnya memiliki ukuran paling besar (Hierarki Utama)?",
    options: [
      "Nomor telepon panitia dan alamat lengkap",
      "Judul utama workshop atau tema kegiatan",
      "Syarat dan ketentuan pendaftaran",
      "Daftar nama seluruh panitia pelaksana"
    ],
    correctIndex: 1,
    explanation: "Judul utama adalah fokus utama (focal point) yang harus dilihat audiens pertama kali dalam 3 detik pertama.",
    category: 'prinsip_desain'
  },
  {
    id: 4,
    question: "Apa manfaat dari 'White Space' (ruang kosong) pada desain publikasi organisasi Muslimah?",
    options: [
      "Tanda bahwa pembuat desain kehabisan ide",
      "Memberikan 'ruang bernafas' visual sehingga pesan tidak terasa sesak dan rapi",
      "Pemborosan tempat yang seharusnya diisi teks lagi",
      "Membuat poster terlihat belum selesai dikerjakan"
    ],
    correctIndex: 1,
    explanation: "White space memberikan kesan elegan, bersih, dan mempermudah mata membaca informasi penting secara bertahap.",
    category: 'prinsip_desain'
  },
  {
    id: 5,
    question: "Perataan teks (Alignment) mana yang paling direkomendasikan untuk teks isi/paragraf informasi panjang agar nyaman dibaca?",
    options: [
      "Rata Kiri (Left-aligned)",
      "Rata Kanan (Right-aligned)",
      "Teks bergelombang acak",
      "Setiap huruf dibuat terpisah jauh"
    ],
    correctIndex: 0,
    explanation: "Perataan kiri memberikan titik awal yang konsisten bagi mata saat membaca bahasa dengan aksara Latin.",
    category: 'prinsip_desain'
  },
  {
    id: 6,
    question: "Manakah yang merupakan kelompok warna primer dalam teori dasar warna?",
    options: [
      "Hijau, Oranye, dan Ungu",
      "Merah, Kuning, dan Biru",
      "Emas, Perak, dan Tembaga",
      "Hitam, Abu-abu, dan Putih"
    ],
    correctIndex: 1,
    explanation: "Merah, Kuning, dan Biru adalah warna primer murni yang menjadi fondasi pencampuran warna sekunder.",
    category: 'palet_warna'
  },
  {
    id: 7,
    question: "Dalam aturan proporsi warna poster '60 - 30 - 10', porsi 10% biasanya digunakan untuk apa?",
    options: [
      "Warna latar belakang keseluruhan",
      "Warna teks paragraf panjang",
      "Warna aksen penegas seperti tombol aksi (CTA) atau badge penting",
      "Semua elemen gambar"
    ],
    correctIndex: 2,
    explanation: "Aturan 60-30-10: 60% warna dominan (background), 30% warna sekunder (elemen/kartu), dan 10% warna aksen menyala untuk menarik perhatian (tombol daftar, harga, badge).",
    category: 'palet_warna'
  },
  {
    id: 8,
    question: "Warna yang posisinya saling berhadapan/berseberangan pada lingkaran warna disebut warna apa?",
    options: [
      "Warna Analog (Analogous)",
      "Warna Monokromatik",
      "Warna Komplementer (Complementary)",
      "Warna Netral"
    ],
    correctIndex: 2,
    explanation: "Warna komplementer (seperti Hijau dengan Merah/Emas hangat) menghasilkan kontras tinggi yang dinamis dan menarik perhatian.",
    category: 'palet_warna'
  },
  {
    id: 9,
    question: "Kombinasi warna Hijau Zamrud (Emerald) dipadukan dengan aksen Emas (Gold) sering digunakan pada poster Muslimah karena melambangkan...",
    options: [
      "Ketakutan dan bahaya",
      "Kesejukan, kedamaian Islami, dan keanggunan (keberkahan)",
      "Kepanikan dan ketergesaan",
      "Kematian dan kegelapan"
    ],
    correctIndex: 1,
    explanation: "Hijau zamrud melambangkan keteduhan dan identitas Islami, sedangkan emas melambangkan kemuliaan, kualitas, dan kehangatan.",
    category: 'palet_warna'
  },
  {
    id: 10,
    question: "Untuk menjaga keterbacaan flyer acara di media sosial, berapa maksimal variasi jenis huruf (font) yang disarankan dalam satu desain?",
    options: [
      "Cukup 2 hingga 3 jenis huruf yang serasi",
      "Minimal 8 jenis huruf agar tampak meriah",
      "Sebanyak mungkin gaya huruf yang ada di komputer",
      "Hanya 1 huruf kapital saja sepanjang poster"
    ],
    correctIndex: 0,
    explanation: "Membatasi 2-3 keluarga font (misal: satu font display untuk judul, satu font sans-serif bersih untuk isi) menjaga kesatuan dan profesionalisme desain.",
    category: 'prinsip_desain'
  }
];
