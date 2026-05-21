"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  careerLevels,
  defaultProgress,
  getProgress,
  resetProgress,
  type ProgressData,
} from "@/progressStorage";

export default function ProfilePage() {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  useEffect(() => {
    const loadProgress = window.setTimeout(() => {
      setProgress(getProgress());
    }, 0);

    return () => {
      window.clearTimeout(loadProgress);
    };
  }, []);

  function handleResetProgress() {
    setProgress(resetProgress());
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10 text-slate-950">
      <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm font-medium text-cyan-700">
          Ana sayfa
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Profil</h1>
        <p className="mt-2 text-slate-600">
          Project Pulse ilerlemen bu cihazda saklanir.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Mevcut unvan</p>
            <p className="mt-2 text-xl font-bold">
              {careerLevels[progress.careerLevelIndex]}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Toplam XP</p>
            <p className="mt-2 text-3xl font-bold">{progress.totalXp}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">
              Tamamlanan proje
            </p>
            <p className="mt-2 text-3xl font-bold">
              {progress.completedProjects}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/game"
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-700 px-6 font-semibold text-white transition-colors hover:bg-cyan-800"
          >
            Oyuna Devam Et
          </Link>
          <button
            type="button"
            onClick={handleResetProgress}
            className="inline-flex h-12 items-center justify-center rounded-md border border-red-200 px-6 font-semibold text-red-700 transition-colors hover:bg-red-50"
          >
            İlerlemeyi Sıfırla
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-6 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Ana Sayfa
          </Link>
        </div>
      </section>
    </main>
  );
}
