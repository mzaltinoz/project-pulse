"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/supabase/authErrors";
import { syncLocalAndCloudProgress } from "@/lib/supabase/syncProgress";

type LoginForm = {
  email: string;
  password: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const isSupabaseConfigured = hasSupabaseConfig();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let noticeTimer: number | undefined;

    if (params.get("registered") === "1") {
      noticeTimer = window.setTimeout(() => {
        setNotice(
          "Kayıt oluşturuldu. Lütfen e-posta doğrulamasını tamamladıktan sonra giriş yapın.",
        );
      }, 0);
    }

    return () => {
      if (noticeTimer) {
        window.clearTimeout(noticeTimer);
      }
    };
  }, []);

  function updateField(field: keyof LoginForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password.trim()) {
      setError("E-posta ve şifre alanlarını doldur.");
      setNotice("");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Lütfen geçerli bir e-posta adresi giriniz.");
      setNotice("");
      return;
    }

    if (password.length < 6) {
      setError("Şifreniz en az 6 karakter olmalıdır.");
      setNotice("");
      return;
    }

    const supabase = createClient();

    if (!supabase) {
      setError("Supabase ortam değişkenleri eksik.");
      setNotice("");
      return;
    }

    const { data, error: loginError } = await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .catch((requestError: unknown) => {
        console.error("Supabase login request failed", requestError);
        return {
          data: { session: null, user: null },
          error: new Error("Unexpected Supabase login request failure"),
        };
      });

    if (loginError) {
      setError(getAuthErrorMessage(loginError));
      setNotice("");
      return;
    }

    if (!data.session || !data.user) {
      setError("Giriş başarılı görünse de Supabase oturumu oluşmadı.");
      setNotice("");
      return;
    }

    try {
      await syncLocalAndCloudProgress(supabase, data.user);
    } catch (syncError) {
      console.error("Progress sync failed after login", syncError);
    }

    console.log("Supabase login user", {
      id: data.user.id,
      email: data.user.email,
    });

    setError("");
    setNotice("");
    router.push("/profile");
    router.refresh();
  }

  function continueAsDemo() {
    router.push("/game");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md items-center">
      <section className="w-full rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10">
        <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
          Tekrar hoş geldin
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">Giriş Yap</h1>
        <p className="mt-2 text-slate-300">
          E-posta ve şifre ile giriş yap veya demo olarak devam et.
        </p>

        <form onSubmit={handleLogin} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-300">
            E-posta
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-base text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
              placeholder="ornek@eposta.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Şifre
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-base text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
              placeholder="Şifren"
            />
          </label>

          {error ? (
            <p className="text-sm font-medium text-red-300">{error}</p>
          ) : null}
          {notice ? (
            <p className="rounded-md border border-emerald-300/30 bg-emerald-300/10 p-3 text-sm font-medium text-emerald-100">
              {notice}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-500 px-6 font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            Giriş Yap
          </button>
        </form>

        {!isSupabaseConfigured ? (
          <p className="mt-4 rounded-md border border-amber-300/30 bg-amber-300/10 p-3 text-sm font-medium text-amber-100">
            Supabase ortam değişkenleri eksik.
          </p>
        ) : null}

        <button
          type="button"
          onClick={continueAsDemo}
          className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-6 font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
        >
          Demo olarak devam et
        </button>

        <p className="mt-6 text-sm text-slate-300">
          Hesabın yok mu?{" "}
          <Link href="/register" className="font-semibold text-cyan-300">
            Kayıt ol
          </Link>
        </p>
      </section>
    </div>
  );
}
