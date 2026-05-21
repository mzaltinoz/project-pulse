"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  function updateField(field: keyof LoginForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleFakeLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email ve password alanlarini doldur.");
      return;
    }

    setError("");
    router.push("/profile");
  }

  function continueAsDemo() {
    router.push("/game");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm font-medium text-cyan-700">
          Ana sayfa
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Giris Yap</h1>
        <p className="mt-2 text-slate-600">
          Simdilik fake login akisi. Gercek auth daha sonra baglanabilir.
        </p>

        <form onSubmit={handleFakeLogin} className="mt-6 grid gap-4">
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
            Giris Yap
          </button>
        </form>

        <button
          type="button"
          onClick={continueAsDemo}
          className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-md border border-slate-300 px-6 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Demo olarak devam et
        </button>

        <p className="mt-6 text-sm text-slate-600">
          Hesabin yok mu?{" "}
          <Link href="/register" className="font-semibold text-cyan-700">
            Kayit ol
          </Link>
        </p>
      </section>
    </main>
  );
}
