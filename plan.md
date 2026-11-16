# Rencana implementasi PraktikLog

Tandai tahap selesai hanya setelah kriteria pada kolom terakhir diperiksa.

| Tahap | Pekerjaan | Kriteria selesai |
|---|---|---|
| 1. Fondasi (selesai) | Siapkan React, Vite, klien Supabase, contoh variabel lingkungan dan kerangka halaman. | Dev server berjalan. Konfigurasi yang belum lengkap menghasilkan petunjuk yang jelas. |
| 2. Database (selesai) | Buat migrasi tasks, batasan nilai, hak akses dan kebijakan per pemilik sesuai spec.md. | Migrasi dapat diterapkan pada proyek uji baru. Tabel memiliki keempat kebijakan operasi. |
| 3. Akun (menunggu uji akun Supabase) | Buat halaman daftar dan masuk, tangani konfirmasi email, pemulihan sesi saat refresh dan tombol keluar. | Pengguna yang masuk dapat membuka beranda. Setelah keluar, halaman pribadi meminta login. |
| 4. Pencatatan | Implementasikan daftar, formulir tambah/edit, perubahan status, tautan hasil dan konfirmasi hapus. | Perubahan bertahan setelah refresh. Kegagalan menyimpan tidak menghapus isian. |
| 5. Pemantauan | Tambahkan ringkasan, urutan tenggat, pencarian, filter, label keterlambatan dan tata letak responsif. | Skenario perhitungan dan filter pada spec.md lulus, termasuk tenggat hari ini. |
| 6. Verifikasi | Jalankan perintah build dan lint yang tersedia, uji skenario penerimaan, dan tulis cara menjalankan aplikasi. | Catat perintah dan hasil aktual di history.md. Sebutkan pengujian yang masih membutuhkan konfigurasi. |

## Urutan demo di kelas

Masuk sebagai mahasiswa, catat tugas konfigurasi VLAN, lalu isi tenggat kemarin agar label Terlambat terlihat. Tambahkan tautan laporan, ubah status menjadi Dikumpulkan, dan tunjukkan perubahan angka di beranda. Muat ulang halaman untuk menunjukkan bahwa catatan tersimpan.
