import React from "react";
import { isSupabaseConfigured, supabaseConfig } from "./lib/supabase.js";

const requiredSettings = [
  {
    name: "VITE_SUPABASE_URL",
    description: "URL proyek Supabase",
    configured: Boolean(supabaseConfig.url),
  },
  {
    name: "VITE_SUPABASE_PUBLISHABLE_KEY",
    description: "Publishable key dari proyek Supabase",
    configured: Boolean(supabaseConfig.publishableKey),
  },
];

function App() {
  return (
    <div className="page-shell" id="atas">
      <a className="skip-link" href="#konten-utama">
        Lewati ke konten utama
      </a>

      <header className="site-header">
        <a className="wordmark" href="#atas" aria-label="PraktikLog, awal halaman">
          PraktikLog
        </a>
        <nav aria-label="Navigasi halaman">
          <a className="nav-link" href="#konfigurasi">
            Konfigurasi
          </a>
        </nav>
      </header>

      <main className="main-content" id="konten-utama">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Catatan tugas praktikum</p>
          <h1 id="page-title">Fondasi pencatatan tugas praktikum.</h1>
          <p className="intro-copy">
            Kerangka PraktikLog disiapkan di sini. Daftar tugas akan hadir pada
            tahap berikutnya.
          </p>
        </section>

        <section
          className="configuration"
          id="konfigurasi"
          aria-labelledby="configuration-title"
        >
          <div className="configuration-heading">
            <p className="section-index">Pengaturan awal</p>
            <h2 id="configuration-title">Koneksi Supabase</h2>
          </div>

          {isSupabaseConfigured ? (
            <div className="notice notice-ready" role="status">
              <p className="notice-title">Variabel konfigurasi ditemukan.</p>
              <p>
                Koneksi database belum diuji. Integrasi Supabase akan dibuat
                pada tahap berikutnya.
              </p>
            </div>
          ) : (
            <div className="notice notice-pending" role="status">
              <p className="notice-title">Supabase belum dikonfigurasi.</p>
              <p>
                Salin <code>.env.example</code> menjadi <code>.env.local</code>,
                lalu isi nilai berikut:
              </p>
              <ul className="settings-list">
                {requiredSettings
                  .filter((setting) => !setting.configured)
                  .map((setting) => (
                    <li key={setting.name}>
                      <code>{setting.name}</code>
                      <span>{setting.description}</span>
                    </li>
                  ))}
              </ul>
              <p className="notice-footnote">
                Simpan file dan mulai ulang server Vite setelah mengisi
                konfigurasi.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>PraktikLog</p>
        <p>Pencatatan tugas praktikum dimulai pada tahap berikutnya.</p>
      </footer>
    </div>
  );
}

export default App;
