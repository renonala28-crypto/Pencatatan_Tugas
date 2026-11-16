# PraktikLog
## Tujuan

Mahasiswa bisa menjawab dua pertanyaan saat membuka aplikasi. Tugas praktikum mana yang perlu dikerjakan lebih dulu? Tugas mana yang sudah dikumpulkan? Satu akun menyimpan tugas milik satu mahasiswa.

## Alur pengguna

- Mahasiswa mendaftar dengan email dan kata sandi, mengikuti konfirmasi email jika diaktifkan, lalu masuk. Saat keluar, daftar tugas pribadi dibersihkan dari layar.
- Beranda menampilkan jumlah tugas aktif, terlambat dan sudah dikumpulkan. Angka dihitung dari seluruh tugas pengguna. Tugas aktif mencakup semua tugas yang belum dikumpulkan, termasuk yang terlambat.
- Mahasiswa dapat menambah, melihat, mengubah dan menghapus tugas. Minta konfirmasi sebelum menghapus. Sediakan pencarian judul dan filter mata kuliah serta status yang bisa digabung.
- Urutkan tugas aktif berdasarkan tenggat terdekat, termasuk yang lewat tenggat, lalu tampilkan tugas yang sudah dikumpulkan. Untuk tenggat sama, urutkan menurut judul.
- Pilihan status adalah Belum mulai, Dikerjakan, dan Dikumpulkan. Mahasiswa dapat membuka kembali tugas dengan mengubah status. Tautan hasil praktikum bersifat opsional, termasuk saat menandai tugas sebagai Dikumpulkan.
- Tampilkan label Terlambat jika tenggat sebelum tanggal hari ini di Asia/Jakarta dan status belum Dikumpulkan. Tugas yang jatuh tempo hari ini diberi label Hari ini selama masih aktif. Bandingkan tanggal kalender.
- Bedakan keadaan memuat, daftar pertama yang kosong, pencarian tanpa hasil, dan kegagalan mengambil data.

## Model data

Gunakan tabel public.tasks. Semua kolom wajib kecuali yang bertanda opsional.

| Kolom | Tipe | Aturan |
|---|---|---|
| id | uuid | Primary key, dibuat otomatis |
| user_id | uuid | Referensi auth.users(id), default auth.uid(), on delete cascade |
| title | text | Setelah trim, 1–120 karakter |
| course | text | Nama mata kuliah, setelah trim 1–80 karakter |
| due_date | date | Tanggal tenggat wajib |
| status | text | Nilai belum_mulai, dikerjakan, dikumpulkan. Default belum_mulai |
| notes | text | Opsional, maksimal 1000 karakter |
| result_url | text | Opsional, URL absolut dengan skema https atau http |

Aktifkan Row Level Security. Batasi SELECT, INSERT, UPDATE dan DELETE pada peran authenticated. SELECT dan DELETE mensyaratkan auth.uid() = user_id melalui USING. INSERT memakai WITH CHECK dengan kondisi yang sama. UPDATE memakai kedua klausa agar pemilik tetap sama. Pengunjung yang belum masuk tidak memiliki akses ke tugas.

## Skenario penerimaan

1. Buat tugas “Konfigurasi VLAN” untuk Jaringan Komputer. Muat ulang, lalu pastikan judul dan tenggat tetap sama.
2. Ubah status ke Dikerjakan, tambahkan tautan laporan, lalu tandai Dikumpulkan. Jumlah aktif turun satu dan jumlah dikumpulkan naik satu.
3. Buat tugas aktif dengan tenggat kemarin dan satu dengan tenggat hari ini. Hanya yang kemarin masuk hitungan terlambat. Setelah dikumpulkan, label terlambat hilang.
4. Gabungkan filter mata kuliah, status dan kata kunci. Bersihkan filter untuk melihat semua tugas kembali.
5. Coba simpan judul berisi spasi atau tautan dengan skema yang tidak didukung. Form menandai kolom bermasalah dan data tidak tersimpan.
6. Batalkan penghapusan dan pastikan tugas tetap ada. Konfirmasi penghapusan lalu muat ulang untuk memastikan tugas terhapus.
7. Dengan dua akun uji milik sendiri, pastikan akun B hanya melihat tugasnya dan kebijakan database membatasi perubahan pada baris milik B. Uji daftar dan formulir pada lebar 360 piksel.
