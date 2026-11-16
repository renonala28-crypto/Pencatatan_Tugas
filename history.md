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

## 16 November 2026: Tahap 2, Database (selesai)

- Membuat `supabase/migrations/20261116162900_create_tasks_table.sql` setelah memastikan belum ada folder atau migrasi Supabase sebelumnya.
- Migrasi membuat tabel `public.tasks` dengan kolom, default, relasi pemilik, batasan nilai, dan batas panjang sesuai `spec.md`. RLS aktif dengan empat kebijakan operasi untuk `authenticated`; kebijakan UPDATE memakai `USING` dan `WITH CHECK` agar pemilik tidak dapat diganti. Hak tabel dicabut dari `anon` dan `PUBLIC`, lalu diberikan kepada `authenticated`.
- Migrasi dibuat, menunggu dijalankan di Supabase.
- Pengguna mengirim hasil SQL Editor Supabase “Success. No rows returned” setelah menjalankan migrasi. Karena skrip yang dijalankan mencakup pembuatan tabel dan keempat kebijakan, migrasi dicatat sebagai diterapkan. Dashboard Supabase meminta sign-in saat dibuka melalui sesi asisten, sehingga hasil query `pg_policies` tidak diperiksa secara terpisah.
- Berikutnya: Tahap 3, akun. Konfigurasi lokal Supabase masih belum tersedia, jadi pengujian autentikasi nyata tertunda.

## 16 November 2026: Tahap 3, Akun (menunggu konfigurasi Supabase)

- Membuat form masuk dan daftar Supabase Auth, menangani konfirmasi email, pemulihan sesi, tampilan beranda setelah masuk, dan keluar yang mengembalikan pengguna ke form masuk.
- Verifikasi: `npm run build` berhasil. Browser diuji pada lebar 360 piksel tanpa overflow; Tab/Enter melewati ke konten; tombol Masuk/Daftar berpindah form; pengiriman tanpa konfigurasi memberi pesan jelas dan mempertahankan isian; tidak ada error JavaScript.
- Belum diuji: pendaftaran dan konfirmasi email nyata, pemulihan sesi setelah refresh, serta keluar dari sesi Supabase, karena `.env.local` belum tersedia.
- Berikutnya: isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_PUBLISHABLE_KEY` di `.env.local`, mulai ulang Vite, lalu uji alur akun sebelum menandai tahap ini selesai.

## 16 November 2026: Lanjutan Tahap 3 (menunggu uji akun Supabase)

- `.env.local` kini tersedia dan terdaftar sebagai file yang diabaikan Git. Nilainya tidak dibaca atau ditampilkan. Halaman memuat form tanpa peringatan konfigurasi; ini belum membuktikan bahwa kredensial valid.
- Perubahan responsif di `src/styles.css`: menghapus lebar minimum tetap dan membiarkan tombol pilihan membungkus pada ruang sempit. Browser tidak menunjukkan overflow pada lebar 360 px atau viewport efektif 180 px untuk memeriksa reflow pada pembesaran 200%.
- Verifikasi: `npm run build` berhasil. Tidak ada error JavaScript pada halaman. Tautan Akun mengubah alamat ke `#akun`; callback Masuk/Daftar mengubah judul formulir saat dipicu dari DOM.
- Batas pengujian: klik pointer melalui alat browser gagal menghasilkan perubahan yang dapat diamati, meskipun elemen terlihat dan aktif. Karena itu klik nyata pada kontrol belum dinyatakan lulus. Pendaftaran, konfirmasi email, pemulihan sesi setelah refresh, dan keluar dengan akun Supabase juga belum diuji.
- Berikutnya: uji sendiri pendaftaran dan konfirmasi email, masuk, refresh untuk memastikan sesi pulih, lalu keluar. Jangan kirim kata sandi atau nilai `.env.local` ke chat.

## 16 November 2026: Perbaikan error pendaftaran

- Pengguna melaporkan `Pendaftaran gagal: Failed to fetch`. Pemeriksaan format lokal tanpa menampilkan nilainya menemukan bahwa URL proyek dan key masih berupa nilai contoh. Sebelumnya aplikasi menganggap semua nilai non-kosong sebagai konfigurasi valid dan mencoba membuat request.
- `src/lib/supabase.js` kini hanya membuat client untuk URL HTTPS proyek Supabase dan Publishable key berformat `sb_publishable_`. Form menampilkan variabel yang perlu diperbaiki dan tidak mengirim request jika konfigurasi belum valid.
- Verifikasi: `npm run build` berhasil. Smoke test browser pada nilai contoh menampilkan peringatan konfigurasi; submit menghasilkan petunjuk pengaturan dan tidak memanggil endpoint Auth (`authRequests: []`).
- Tahap 3 masih menunggu URL proyek dan Publishable key yang sebenarnya dimasukkan pengguna ke `.env.local`, lalu uji daftar/konfirmasi email, masuk, pemulihan sesi, dan keluar.

## Format entri berikutnya

Tambahkan entri bertanggal setelah pekerjaan dilakukan. Catat fitur atau file yang berubah, perintah atau skenario yang diuji beserta hasilnya, kendala yang masih ada, dan satu langkah berikutnya. Pertahankan entri lama agar progres dapat ditelusuri.
