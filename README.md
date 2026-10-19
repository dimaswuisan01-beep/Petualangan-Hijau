# Petualangan Fotosintesis: Misi Hijau 🌱☀️💧
### Media Pembelajaran Interaktif & Kuis Sains Siswa Kelas IV SD

Aplikasi web edukatif interaktif untuk membantu siswa kelas IV Sekolah Dasar memahami proses fotosintesis, bahan yang diperlukan, hasil fotosintesis, serta manfaatnya bagi kehidupan manusia dan ekosistem bumi bersama **8 Sahabat Karakter Fotosintesis**. Dilengkapi materi interaktif, kuis 5 soal dengan umpan balik langsung, refleksi belajar, serta **Panel Guru dengan Leaderboard Siswa Lengkap dan Fitur Cetak Rekap Nilai (Print Preview)**.

---

## 👥 8 Sahabat Karakter Utama
1. **Matahari** (*Si Terang Berenergi*) — Sumber energi utama fotosintesis.
2. **Air** (*Si Tetes Penyejuk*) — Diserap akar dari dalam tanah menuju daun.
3. **Tumbuhan** (*Si Koki Hijau Alam*) — Tokoh utama pembuat makanan mandiri di alam.
4. **Daun** (*Si Dapur Klorofil*) — Tempat klorofil menangkap cahaya dan stomata bertukar gas.
5. **Oksigen** (*Si Nafas Segar Dunia*) — Gas segar hasil fotosintesis untuk pernapasan manusia & hewan.
6. **Glukosa** (*Si Manis Energi*) — Makanan kaya nutrisi bagi pertumbuhan tumbuhan.
7. **Karbon Dioksida** (*Si Gas Udara*) — Gas yang diserap dari udara oleh stomata daun.
8. **Murid SD (Manusia)** (*Si Penjaga Sahabat Hijau*) — Murid berseragam merah putih penjaga kelestarian alam.

Lokasi aset gambar: `public/assets/characters/`

---

## 🏆 Fitur Leaderboard Guru & Cetak Rekap Nilai
Pada menu **Leaderboard Guru (Panel Guru)** di bagian atas aplikasi:
1. **Daftar Peringkat / Leaderboard Siswa:**
   - Menampilkan seluruh data murid yang telah mengerjakan kuis secara berurutan berdasarkan skor tertinggi.
   - Format tabel resmi:
     - **Nomor** (disertai medali 🥇🥈🥉 untuk 3 besar)
     - **Nama Murid**
     - **Kelas**
     - **Sekolah**
     - **Nilai / Skor** (0–100)
     - **Kategori / Keterangan**
2. **Statistik Kelas Otomatis:**
   - Total siswa yang telah berpartisipasi.
   - Rata-rata nilai kelas.
   - Skor tertinggi dan jumlah siswa peraih nilai 100.
3. **Fitur Cetak (Print Preview) Langsung:**
   - Tombol **"Cetak Rekap / Print Preview"** langsung memicu dialog cetak peramban (`window.print()`).
   - Format cetak dirancang rapi sesuai standar format laporan sekolah (Kop Laporan, Tanggal, Tabel Nomor, Nama, Kelas, Sekolah, Nilai/Skor, dan Area Tanda Tangan Guru Kelas).

---

## 🚀 Menjalankan Aplikasi Secara Lokal
```bash
# Pasang dependensi
npm install

# Jalankan server pengembangan lokal (port 3000)
npm run dev
```

Buka peramban di `http://localhost:3000`.

---

## 📦 Build Produksi
```bash
npm run build
```
Folder `dist/` siap dipublikasikan ke layanan hosting statis pilihan Anda (GitHub Pages, Vercel, Netlify, dll).
