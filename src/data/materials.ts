export interface MaterialCardData {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  characterIds: string[];
  content: {
    lead: string;
    paragraphs: string[];
    highlightBox?: {
      title: string;
      items: { icon: string; title: string; desc: string }[];
    };
    formula?: {
      inputs: { name: string; desc: string; charId: string }[];
      process: { name: string; place: string; charId: string };
      outputs: { name: string; desc: string; charId: string }[];
    };
    summaryItems?: { label: string; value: string; charId: string }[];
    didYouKnow?: string;
  };
}

export const MATERIAL_CARDS: MaterialCardData[] = [
  {
    id: 1,
    badge: 'Kartu 1 dari 5',
    title: 'Apa Itu Fotosintesis?',
    subtitle: 'Keajaiban tumbuhan hijau yang bisa memasak makanannya sendiri!',
    characterIds: ['tumbuhan', 'daun'],
    content: {
      lead: 'Pernahkah kamu berpikir, bagaimana ya cara tumbuhan makan kalau mereka tidak punya mulut atau pergi belanja ke warung?',
      paragraphs: [
        'Tumbuhan hijau itu sangat istimewa, lho! Berbeda dengan manusia dan hewan yang harus mencari makanan, tumbuhan hijau bisa **membuat makanannya sendiri**.',
        'Proses pembuatan makanan oleh tumbuhan hijau dengan memanfaatkan **energi cahaya matahari** inilah yang disebut dengan **Fotosintesis**.',
        'Kata "Foto" artinya cahaya, dan "Sintesis" artinya penggabungan atau pembuatan. Jadi, fotosintesis adalah proses memasak makanan menggunakan bantuan cahaya!'
      ],
      highlightBox: {
        title: 'Rahasia Penting!',
        items: [
          {
            icon: 'Sprout',
            title: 'Koki Mandiri Alam',
            desc: 'Tumbuhan tidak mengambil makanan jadi dari tanah, melainkan membuatnya sendiri di daun!'
          },
          {
            icon: 'Sun',
            title: 'Bantuan Tenaga Cahaya',
            desc: 'Cahaya matahari bertindak seperti kompor alami yang memberi energi pada proses ini.'
          }
        ]
      },
      didYouKnow: 'Tumbuhan disebut sebagai produsen utama di bumi karena mereka menghasilkan makanan sendiri yang berguna bagi seluruh makhluk hidup!'
    }
  },
  {
    id: 2,
    badge: 'Kartu 2 dari 5',
    title: 'Apa Saja yang Dibutuhkan?',
    subtitle: 'Empat sahabat penting dalam resep rahasia fotosintesis',
    characterIds: ['matahari', 'air', 'karbon-dioksida', 'daun'],
    content: {
      lead: 'Untuk memasak makanannya sendiri, tumbuhan memerlukan bahan-bahan istimewa dari alam sekitar:',
      paragraphs: [
        'Ada 3 bahan utama dan 1 penolong ajaib yang harus bekerja sama agar fotosintesis berhasil:'
      ],
      highlightBox: {
        title: 'Daftar Resep Fotosintesis',
        items: [
          {
            icon: 'Sun',
            title: '1. Cahaya Matahari',
            desc: 'Sebagai sumber energi utama yang menyinari tumbuhan di siang hari.'
          },
          {
            icon: 'Droplets',
            title: '2. Air (H₂O)',
            desc: 'Diserap oleh akar dari dalam tanah lalu dialirkan ke atas menuju daun.'
          },
          {
            icon: 'Cloud',
            title: '3. Karbon Dioksida (CO₂)',
            desc: 'Gas di udara yang masuk ke dalam daun melalui pori-pori kecil bernama stomata.'
          },
          {
            icon: 'Leaf',
            title: '4. Klorofil (Zat Hijau Daun)',
            desc: 'Zat warna hijau pada daun yang bertugas menangkap energi cahaya matahari.'
          }
        ]
      },
      didYouKnow: 'Stomata adalah mulut daun yang sangat kecil. Ukurannya hanya bisa dilihat memakai mikroskop!'
    }
  },
  {
    id: 3,
    badge: 'Kartu 3 dari 5',
    title: 'Bagaimana Prosesnya?',
    subtitle: 'Alur ilmiah perjalanan dari bahan mentah hingga menjadi makanan lezat',
    characterIds: ['air', 'karbon-dioksida', 'daun', 'glukosa', 'oksigen'],
    content: {
      lead: 'Yuk perhatikan alur fotosintesis secara berurutan agar kamu paham cara kerjanya:',
      paragraphs: [
        '1. **Penyerapan Air:** Akar tumbuhan menyerap air dan mineral dari tanah yang subur, kemudian dialirkan ke daun melalui pembuluh batang.',
        '2. **Penyerapan Karbon Dioksida:** Udara yang mengandung karbon dioksida masuk ke daun melalui lubang stomata.',
        '3. **Penangkapan Cahaya:** Klorofil di daun menangkap energi sinar matahari.',
        '4. **Memasak Zat Kimia:** Energi cahaya digunakan untuk mengubah air dan karbon dioksida menjadi gula (glukosa) dan gas oksigen!'
      ],
      formula: {
        inputs: [
          { name: 'Cahaya Matahari', desc: 'Sumber Energi Alami', charId: 'matahari' },
          { name: 'Air (dari tanah)', desc: 'Diserap lewat akar', charId: 'air' },
          { name: 'Karbon Dioksida', desc: 'Masuk lewat stomata', charId: 'karbon-dioksida' }
        ],
        process: {
          name: 'Proses Fotosintesis',
          place: 'Di dalam Klorofil Daun Hijau',
          charId: 'daun'
        },
        outputs: [
          { name: 'Glukosa (Gula)', desc: 'Makanan & cadangan energi tumbuhan', charId: 'glukosa' },
          { name: 'Oksigen (O₂)', desc: 'Gas segar dilepas ke udara bebas', charId: 'oksigen' }
        ]
      },
      didYouKnow: 'Ingat ya: Air dan mineral diserap dari tanah, tetapi bahan makanan organik (seperti glukosa) baru dibentuk di daun melalui fotosintesis!'
    }
  },
  {
    id: 4,
    badge: 'Kartu 4 dari 5',
    title: 'Mengapa Fotosintesis Penting?',
    subtitle: 'Kebaikan tumbuhan bagi kelangsungan hidup manusia, hewan, dan bumi',
    characterIds: ['oksigen', 'glukosa', 'tumbuhan', 'manusia'],
    content: {
      lead: 'Tanpa fotosintesis tumbuhan, kehidupan di bumi tidak akan bisa berjalan seperti sekarang!',
      paragraphs: [
        'Fotosintesis memberikan manfaat yang luar biasa besar untuk kita semua:'
      ],
      highlightBox: {
        title: 'Manfaat Besar Fotosintesis',
        items: [
          {
            icon: 'Wind',
            title: 'Menghasilkan Oksigen untuk Nafas',
            desc: 'Oksigen segar yang kita hirup setiap detik berasal dari fotosintesis tumbuhan dan alga di air.'
          },
          {
            icon: 'Sparkles',
            title: 'Sumber Makanan & Rantai Makanan',
            desc: 'Glukosa disimpan tumbuhan jadi buah, biji, umbi, dan sayuran yang dimakan manusia dan hewan.'
          },
          {
            icon: 'ShieldCheck',
            title: 'Menjaga Udara Bersih & Sejuk',
            desc: 'Tumbuhan menyerap karbon dioksida berlebih dari udara sehingga bumi tidak cepat panas.'
          },
          {
            icon: 'HeartHandshake',
            title: 'Sahabat Hidup Manusia',
            desc: 'Karena tumbuhan begitu baik, kita sebagai murid SD harus rajin merawat dan menyiram tanaman!'
          }
        ]
      },
      didYouKnow: 'Selain tumbuhan di daratan, alga dan fitoplankton hijau di lautan juga sangat banyak melakukan fotosintesis dan menghasilkan oksigen!'
    }
  },
  {
    id: 5,
    badge: 'Kartu 5 dari 5',
    title: 'Coba Ingat! Rangkuman Pintar',
    subtitle: 'Kunci rahasia fotosintesis yang siap kamu bawa ke babak kuis',
    characterIds: ['matahari', 'air', 'daun', 'glukosa'],
    content: {
      lead: 'Hebat! Kamu sudah membaca semua rahasia fotosintesis. Yuk kita ingat kembali 4 pilar utamanya:',
      paragraphs: [
        'Hafalkan 4 pilar penting ini untuk menjawab kuis dengan nilai sempurna (100 poin):'
      ],
      summaryItems: [
        { label: 'Sumber Energi', value: 'Cahaya Matahari', charId: 'matahari' },
        { label: 'Bahan Baku', value: 'Air (dari tanah) & Karbon Dioksida (dari udara)', charId: 'air' },
        { label: 'Tempat Terjadinya', value: 'Bagian tumbuhan hijau, terutama Daun (Klorofil)', charId: 'daun' },
        { label: 'Hasil Utama', value: 'Glukosa (makanan tumbuhan) & Oksigen (dilepas ke udara)', charId: 'glukosa' }
      ],
      didYouKnow: 'Jika kamu sudah siap, tekan tombol kuis di bawah ini untuk memulai tantangan 5 soal bersama 8 Sahabat Fotosintesis!'
    }
  }
];
