"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function updateField(field: keyof RegisterForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleFakeRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Kullanıcı adı, email ve password alanlarını doldur.");
      return;
    }

    setError("");
    router.push("/profile");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md items-center">
      <section className="w-full rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10">
        <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
          Create account
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">Kayıt Ol</h1>
        <p className="mt-2 text-slate-300">
          Hesap ekranı taslak durumda. Backend daha sonra eklenebilir.
        </p>

        <form onSubmit={handleFakeRegister} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-300">
            Kullanıcı adı
            <input
              type="text"
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-base text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/60"
              placeholder="projectlead"
            />
          </label>

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

          {error ? <p className="text-sm font-medium text-red-300">{error}</p> : null}

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-500 px-6 font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            Kayıt Ol
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-300">
          Zaten hesabın var mı?{" "}
          <Link href="/login" className="font-semibold text-cyan-300">
            Giriş yap
          </Link>
        </p>
      </section>
    </div>
  );
}
