import React, { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase, supabaseConfig } from "./lib/supabase.js";

const requiredSettings = [
  {
    name: "VITE_SUPABASE_URL",
    description: "URL HTTPS proyek Supabase yang berakhiran .supabase.co",
    configured: supabaseConfig.urlIsValid,
  },
  {
    name: "VITE_SUPABASE_PUBLISHABLE_KEY",
    description:
      "Publishable key dari proyek Supabase, diawali sb_publishable_",
    configured: supabaseConfig.publishableKeyIsValid,
  },
];

function App() {
  const [session, setSession] = useState(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [authMode, setAuthMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setIsRestoringSession(false);
      return undefined;
    }

    let isMounted = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
        setIsRestoringSession(false);
      }
    });

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!isMounted) {
          return;
        }

        if (error) {
          setFeedback({
            type: "error",
            text: `Sesi gagal dipulihkan: ${getErrorMessage(error, "Silakan coba lagi.")}`,
          });
        }

        setSession(data.session);
        setIsRestoringSession(false);
      })
      .catch((error) => {
        if (isMounted) {
          setFeedback({
            type: "error",
            text: `Sesi gagal dipulihkan: ${getErrorMessage(error, "Silakan coba lagi.")}`,
          });
          setIsRestoringSession(false);
        }
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleAuthSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setFeedback(null);
    if (!supabase) {
      setFeedback({
        type: "error",
        text: "Konfigurasi Supabase belum valid. Periksa URL proyek dan Publishable key di .env.local, lalu mulai ulang Vite.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const request =
        authMode === "sign-in"
          ? await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            })
          : await supabase.auth.signUp({
              email: email.trim(),
              password,
            });

      if (request.error) {
        setFeedback({
          type: "error",
          text: `${authMode === "sign-in" ? "Gagal masuk" : "Pendaftaran gagal"}: ${getErrorMessage(request.error, "Silakan coba lagi.")}`,
        });
        return;
      }

      if (authMode === "sign-up" && !request.data.session) {
        setPassword("");
        setFeedback({
          type: "success",
          text: "Jika pendaftaran berhasil, periksa email untuk tautan konfirmasi sebelum masuk.",
        });
        return;
      }

      if (!request.data.session) {
        setFeedback({
          type: "error",
          text: "Sesi masuk belum tersedia. Silakan coba lagi.",
        });
        return;
      }

      setSession(request.data.session);
      setPassword("");
      setFeedback({
        type: "success",
        text: authMode === "sign-in" ? "Anda berhasil masuk." : "Akun berhasil dibuat.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        text: `${authMode === "sign-in" ? "Gagal masuk" : "Pendaftaran gagal"}: ${getErrorMessage(error, "Silakan coba lagi.")}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    if (!supabase || isSigningOut) {
      return;
    }

    setFeedback(null);
    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setFeedback({
          type: "error",
          text: `Gagal keluar: ${getErrorMessage(error, "Silakan coba lagi.")}`,
        });
        return;
      }

      setSession(null);
      setPassword("");
      setAuthMode("sign-in");
    } catch (error) {
      setFeedback({
        type: "error",
        text: `Gagal keluar: ${getErrorMessage(error, "Silakan coba lagi.")}`,
      });
    } finally {
      setIsSigningOut(false);
    }
  }

  const invalidSettings = requiredSettings.filter(
    (setting) => !setting.configured,
  );

  return (
    <div className="page-shell" id="atas">
      <a className="skip-link" href="#konten-utama">
        Lewati ke konten utama
      </a>

      <header className="site-header">
        <a className="wordmark" href="#atas" aria-label="PraktikLog, awal halaman">
          PraktikLog
        </a>
        {!isRestoringSession && (
          <nav aria-label="Navigasi halaman">
            <a className="nav-link" href={session ? "#beranda" : "#akun"}>
              {session ? "Beranda" : "Akun"}
            </a>
          </nav>
        )}
      </header>

      <main className="main-content" id="konten-utama">
        {isRestoringSession ? (
          <section className="session-loading" aria-live="polite">
            <h1>Memulihkan sesi akun</h1>
            <p role="status">Memeriksa sesi PraktikLog yang tersimpan.</p>
          </section>
        ) : session ? (
          <section className="account-home" id="beranda" aria-labelledby="page-title">
            <p className="eyebrow">Ruang praktikum</p>
            <h1 id="page-title">Akun PraktikLog</h1>
            <p className="intro-copy">
              Anda masuk sebagai <strong>{session.user.email}</strong>.
            </p>
            {feedback && (
              <p
                className={`feedback feedback-${feedback.type}`}
                role={feedback.type === "error" ? "alert" : "status"}
              >
                {feedback.text}
              </p>
            )}
            <button
              className="secondary-button"
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? "Sedang keluar..." : "Keluar"}
            </button>
            <p className="account-note">
              Daftar tugas praktikum akan tersedia pada tahap berikutnya.
            </p>
          </section>
        ) : (
          <div className="auth-layout">
            <section className="auth-intro" aria-labelledby="page-title">
              <p className="eyebrow">Catatan tugas praktikum</p>
              <h1 id="page-title">Akun untuk catatan praktikum.</h1>
              <p className="intro-copy">
                Masuk untuk mengakses akun, atau daftar dengan email dan kata
                sandi.
              </p>
            </section>

            <section className="auth-panel" id="akun" aria-labelledby="auth-title">
              <div className="auth-switcher" role="group" aria-label="Pilih tindakan akun">
                <button
                  type="button"
                  aria-pressed={authMode === "sign-in"}
                  onClick={() => {
                    setAuthMode("sign-in");
                    setFeedback(null);
                  }}
                  disabled={isSubmitting}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  aria-pressed={authMode === "sign-up"}
                  onClick={() => {
                    setAuthMode("sign-up");
                    setFeedback(null);
                  }}
                  disabled={isSubmitting}
                >
                  Daftar
                </button>
              </div>

              <h2 id="auth-title">
                {authMode === "sign-in" ? "Masuk ke akun" : "Buat akun"}
              </h2>

              {!isSupabaseConfigured && (
                <div className="notice notice-pending" role="alert">
                  <p className="notice-title">
                    Konfigurasi Supabase belum lengkap atau masih memakai nilai
                    contoh.
                  </p>
                  <p>
                    Periksa <code>.env.local</code>, ganti nilai contoh dengan
                    URL proyek dan Publishable key dari Supabase, lalu mulai
                    ulang server Vite. Jangan gunakan Secret key.
                  </p>
                  <ul className="settings-list">
                    {invalidSettings.map((setting) => (
                      <li key={setting.name}>
                        <code>{setting.name}</code>
                        <span>{setting.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <form className="auth-form" onSubmit={handleAuthSubmit}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isSubmitting}
                />

                <label htmlFor="password">Kata sandi</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    authMode === "sign-in" ? "current-password" : "new-password"
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isSubmitting}
                />

                <button className="submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Mengirim..."
                    : authMode === "sign-in"
                      ? "Masuk"
                      : "Buat akun"}
                </button>
              </form>

              {feedback && (
                <p
                  className={`feedback feedback-${feedback.type}`}
                  role={feedback.type === "error" ? "alert" : "status"}
                >
                  {feedback.text}
                </p>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>PraktikLog</p>
        <p>Pencatatan tugas praktikum akan ditambahkan pada tahap berikutnya.</p>
      </footer>
    </div>
  );
}

function getErrorMessage(error, fallback) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
}

export default App;
