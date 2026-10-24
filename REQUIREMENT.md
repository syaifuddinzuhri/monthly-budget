### Requirement Monthly Budgeting Web Pribadi

## Dashboard
- Ringkasan total pemasukan bulan berjalan.
- Ringkasan total pengeluaran bulan berjalan.
- Total budget bulanan.
- Total budget terpakai dan sisa budget.
- Saldo keseluruhan dari semua akun.
- Ringkasan pengeluaran berdasarkan kategori.
- Daftar transaksi terbaru.
- Daftar pengeluaran rutin yang belum dibayar.
- Peringatan jika budget mendekati atau melewati batas.
- Tombol cepat untuk input pemasukan dan pengeluaran.
- Default tampilan menggunakan bulan dan tahun saat ini.
## Pengaturan Pengeluaran Rutin Bulanan
Halaman khusus di menu Pengaturan → Pengeluaran Rutin Bulanan.

Fitur:
- Tambah, edit, hapus, dan nonaktifkan pengeluaran rutin.
- Nama pengeluaran, nominal, kategori, dan akun pembayaran.
- Menentukan tanggal jatuh tempo setiap bulan.
- Menentukan tanggal mulai dan tanggal berakhir.
- Pengeluaran rutin otomatis masuk ke daftar transaksi setiap bulan.
- Status transaksi: Belum Dibayar dan Sudah Dibayar.
- Tombol untuk menandai pengeluaran sebagai sudah dibayar.
- Bisa mengubah nominal atau tanggal untuk bulan tertentu tanpa mengubah template utama.
- Bisa melewati satu bulan tanpa menghapus pengaturan rutin.
- Mencegah transaksi rutin tercatat ganda.
- Pengeluaran rutin yang belum dibayar tidak mengurangi saldo aktual.
- Template yang dinonaktifkan tidak membuat transaksi baru, tetapi riwayat lama tetap tersedia.
Contoh: pengeluaran internet Rp350.**000** setiap tanggal 10 otomatis muncul di daftar pengeluaran bulan Oktober, November, Desember, dan seterusnya selama template aktif.
## Halaman Reporting Bulanan / Tahunan
Fitur:
- Mode laporan bulanan dan tahunan.
- Filter bulan dan tahun.
- Default filter menggunakan periode saat ini.
- Total pemasukan.
- Total pengeluaran aktual.
- Selisih pemasukan dan pengeluaran.
- Rincian pengeluaran berdasarkan kategori.
- Perbandingan budget dengan realisasi.
- Daftar transaksi berdasarkan periode.
- Ringkasan pengeluaran rutin yang belum dibayar.
- Perbandingan performa keuangan antarb bulan.
- Ringkasan pemasukan dan pengeluaran Januari–Desember untuk laporan tahunan.
- Filter berdasarkan akun, kategori, dan jenis transaksi.
- Ekspor laporan ke **CSV**/Excel.
- Ekspor **PDF** sebagai fitur tambahan.
## Halaman Charts / Grafik
Fitur visualisasi keuangan:
- Income vs Expense: grafik pemasukan dibanding pengeluaran.
- Monthly Cash Flow: grafik selisih pemasukan dan pengeluaran.
- Expense by Category: grafik distribusi pengeluaran per kategori.
- Budget vs Actual: grafik anggaran dibanding realisasi.
- Expense Trend: tren pengeluaran dari waktu ke waktu.
- Annual Overview: grafik ringkasan keuangan tahunan.
- Filter periode bulanan dan tahunan.
- Filter kategori dan akun.
- Default periode mengikuti bulan atau tahun saat ini.
- Tooltip yang menampilkan nominal secara detail.
- Format nominal menggunakan Rupiah.
- Grafik otomatis diperbarui berdasarkan filter.
- Tampilan responsif untuk desktop dan mobile.
## Halaman Form Input Pemasukan / Pengeluaran
Fitur:
- Pilihan jenis transaksi: Pemasukan atau Pengeluaran.
- Input nominal.
- Input nama atau judul transaksi.
- Pilihan kategori.
- Pilihan akun.
- Input tanggal transaksi.
- Pilihan metode pembayaran.
- Input catatan atau deskripsi.
- Upload foto struk sebagai fitur opsional.
- Validasi nominal dan field wajib.
- Default tanggal menggunakan hari ini.
- Format nominal menggunakan Rupiah.
- Tombol Simpan, Batal, dan Reset.
- Form edit untuk transaksi yang sudah tersimpan.
- Notifikasi ketika transaksi berhasil disimpan.
- Setelah transaksi disimpan, Dashboard, Budget, Reporting, Charts, dan saldo akun diperbarui otomatis.
## Navigasi Menu Aplikasi
Struktur sidebar yang direkomendasikan:
Dashboard

Transaksi

Daftar transaksi dan form input

### Monthly Budget

Accounts

Charts

Reporting

Bulanan dan tahunan

### Savings Goals

Pengaturan

Kategori, pengeluaran rutin, preferensi

## Requirement Teknis Tambahan

- Responsive layout untuk desktop dan mobile.
- Autentikasi login dan logout.
- Database menyimpan transaksi dan pengaturan pengeluaran rutin.
- Otomatisasi pembentukan transaksi rutin bulanan di backend.
- Sistem anti-duplikasi untuk transaksi rutin.
- Validasi input di frontend dan backend.
- Filter data berdasarkan bulan, tahun, kategori, dan akun.
- Format mata uang **IDR**.
- Data transaksi historis tetap tersimpan.
- Proteksi akses agar pengguna hanya dapat mengakses data miliknya.
- Perhitungan saldo dan budget konsisten di semua halaman.
## Prioritas Pengembangan
Prioritas	Fitur
P0 — Wajib	Dashboard, form transaksi, daftar transaksi
P0 — Wajib	Pengaturan pengeluaran rutin bulanan dan otomatisasi
P0 — Wajib	Monthly Budget dan perhitungan realisasi
P1 — Berikutnya	Reporting bulanan/tahunan
P1 — Berikutnya	Charts dan visualisasi keuangan
P2 — Tambahan	Savings Goals, ekspor **PDF**, upload struk, notifikasi lanjutan

Catatan penting: pengeluaran rutin yang otomatis masuk daftar harus memiliki status Belum Dibayar agar tidak langsung dihitung sebagai pengeluaran aktual atau mengurangi saldo sebelum benar-benar dibayar.
