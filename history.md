# Riwayat pengembangan PraktikLog

## 16 November 2026 — Perencanaan awal

- Menetapkan tema pencatatan tugas praktikum mahasiswa dengan React dan Supabase.
- Menyusun instruksi agen, spesifikasi fitur dan model data, tahapan implementasi, serta skenario penerimaan.
- Status implementasi belum dimulai. Belum ada migrasi yang diterapkan, aplikasi yang dijalankan, atau pengujian fitur.
- Langkah berikutnya adalah memeriksa folder proyek dan menjalankan tahap fondasi di plan.md.

## 16 November 2026: Tahap 1, Fondasi (selesai)

- Karena folder hanya berisi empat dokumen perencanaan, membuat React + Vite dengan JavaScript tanpa mengubah dokumen tersebut. Menambahkan klien `@supabase/supabase-js`, `.env.example`, dan aturan agar `.env.local` tidak masuk Git.
- Kerangka halaman menampilkan petunjuk yang jelas saat `VITE_SUPABASE_URL` atau `VITE_SUPABASE_PUBLISHABLE_KEY` belum diisi. Nilai koneksi yang sebenarnya belum diuji karena kredensial Supabase belum tersedia.
- Design Read: kerangka aplikasi pencatatan tugas untuk mahasiswa, gaya alat praktis, ENERGY 1 / RHYTHM 1 / MOTION 1. Tema terang bernuansa kertas mendukung keterbacaan daftar tugas; aksen terakota menandai label bagian dan status konfigurasi; font sistem mudah dibaca tanpa unduhan tambahan; ruang vertikal memisahkan pengantar dari pengaturan; panel bersudut 10 px mengelompokkan status tanpa bayangan; tata letak satu kolom menjaga fokus pada tugas. Label bagian yang ringkas menjadi motif visual berulang seperti penanda catatan praktikum.
- Verifikasi: `npm install` berhasil (audit melaporkan 0 kerentanan); `npm run build` berhasil; dev server Vite siap di `http://127.0.0.1:5173/`; halaman tampil dengan petunjuk konfigurasi. Pada lebar 360 piksel, lebar konten sama dengan viewport (tidak ada overflow). Rasio kontras pasangan teks yang diuji 5,74:1 atau lebih. Uji keyboard: Tab memfokuskan tautan lewati, Enter menuju konten utama, tautan Konfigurasi membuka bagiannya, dan wordmark kembali ke awal halaman. Tidak ada error console setelah perbaikan transformasi JSX.
- Belum diuji: koneksi ke proyek Supabase nyata, karena `.env.local` dan kredensial belum diberikan. Perintah lint belum tersedia di skrip proyek.
- Berikutnya: Tahap 2, migrasi tabel `tasks`, batasan dan kebijakan Row Level Security.

## 16 November 2026: Tahap 2, Database (menunggu penerapan)

- Membuat `supabase/migrations/20261116162900_create_tasks_table.sql` setelah memastikan belum ada folder atau migrasi Supabase sebelumnya.
- Migrasi membuat tabel `public.tasks` dengan kolom, default, relasi pemilik, batasan nilai, dan batas panjang sesuai `spec.md`. RLS aktif dengan empat kebijakan operasi untuk `authenticated`; kebijakan UPDATE memakai `USING` dan `WITH CHECK` agar pemilik tidak dapat diganti. Hak tabel dicabut dari `anon` dan `PUBLIC`, lalu diberikan kepada `authenticated`.
- Migrasi dibuat, menunggu dijalankan di Supabase.
- Pemeriksaan saat ini berupa peninjauan isi SQL terhadap spesifikasi. Migrasi belum dijalankan karena belum ada hasil dari SQL Editor Supabase; kriteria penerapan belum ditandai selesai.
- Berikutnya: jalankan migrasi di SQL Editor Supabase dan kirimkan hasilnya sebelum status penerapan diperbarui.

## Format entri berikutnya

Tambahkan entri bertanggal setelah pekerjaan dilakukan. Catat fitur atau file yang berubah, perintah atau skenario yang diuji beserta hasilnya, kendala yang masih ada, dan satu langkah berikutnya. Pertahankan entri lama agar progres dapat ditelusuri.
