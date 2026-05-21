"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const isSupabaseConfigured = hasSupabaseConfig();

  function updateField(field: keyof LoginForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email ve password alanlarını doldur.");
      return;
    }

    const supabase = createClient();

    if (!supabase) {
      setError("Supabase configuration missing");
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    });

    if (loginError) {
      setError("Giriş başarısız. Email veya şifreyi kontrol edin.");
      return;
    }

    setError("");
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
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">Giriş Yap</h1>
        <p className="mt-2 text-slate-300">
          Email ve password ile giriş yap veya demo olarak devam et.
        </p>

        <form onSubmit={handleLogin} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-base text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-base text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
              placeholder="••••••••"
            />
          </label>

          {error ? (
            <p className="text-sm font-medium text-red-300">{error}</p>
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
            Supabase configuration missing
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
