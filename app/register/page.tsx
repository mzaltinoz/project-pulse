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
      setError("Kullanici adi, email ve password alanlarini doldur.");
      return;
    }

    setError("");
    router.push("/profile");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm font-medium text-cyan-700">
          Ana sayfa
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Kayit Ol</h1>
        <p className="mt-2 text-slate-600">
          Hesap ekrani taslak durumda. Backend daha sonra eklenebilir.
        </p>

        <form onSubmit={handleFakeRegister} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Kullanici adi
            <input
              type="text"
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              className="h-11 rounded-md border border-slate-300 px-3 text-base outline-none transition-colors focus:border-cyan-700"
              placeholder="projectlead"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="h-11 rounded-md border border-slate-300 px-3 text-base outline-none transition-colors focus:border-cyan-700"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              className="h-11 rounded-md border border-slate-300 px-3 text-base outline-none transition-colors focus:border-cyan-700"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-700 px-6 font-semibold text-white transition-colors hover:bg-cyan-800"
          >
            Kayit Ol
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Zaten hesabin var mi?{" "}
          <Link href="/login" className="font-semibold text-cyan-700">
            Giris yap
          </Link>
        </p>
      </section>
    </main>
  );
}
