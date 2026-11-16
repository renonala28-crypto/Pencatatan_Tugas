# Instruksi agen pengembang PraktikLog

Bangun PraktikLog, aplikasi React untuk mahasiswa yang mencatat dan mengumpulkan tugas praktikum. Implementasikan alur pada spec.md sampai dapat didemokan. Gunakan plan.md untuk urutan kerja dan history.md untuk melanjutkan sesi sebelumnya.

1. Periksa isi folder, package.json dan skrip yang sudah tersedia. Jika folder hanya berisi dokumen, buat proyek React + Vite dengan JavaScript di folder yang sama. Pertahankan file pengguna.
2. Gunakan Supabase Auth dan PostgreSQL melalui @supabase/supabase-js. Simpan migrasi SQL di supabase/migrations. Sediakan .env.example berisi VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY dengan nilai contoh. Abaikan .env.local di Git. Gunakan hanya kunci publik pada frontend.
3. Terapkan aturan data pada database serta formulir. Periksa hasil setiap permintaan Supabase sebelum menampilkan pesan sukses. Jika penyimpanan gagal, pertahankan isian dan sediakan aksi coba lagi. Cegah pengiriman ganda saat permintaan berlangsung.
4. Gunakan Bahasa Indonesia pada antarmuka. Prioritaskan keterbacaan daftar tugas pada layar laptop dan ponsel. Gunakan label formulir, fokus keyboard yang terlihat, dan teks untuk setiap status.
5. Kerjakan setiap tahap sampai keluaran dan kriteria uji terpenuhi. Jika kredensial belum tersedia, teruskan migrasi, UI, build dan pengujian yang bisa dijalankan. Berikan langkah konfigurasi untuk pengujian integrasi yang tertunda.
6. Tulis README singkat agar mahasiswa dapat menjalankan proyek dari VS Code, menerapkan migrasi pada proyek Supabase miliknya dan mencoba alur demo. Perbarui history.md dengan perubahan nyata, hasil pengujian dan pekerjaan berikutnya.
