"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CareerAvatar } from "@/components/CareerAvatar";
import { MetricsPanel } from "@/components/MetricsPanel";
import { initialMetrics } from "@/metrics";
import {
  careerLevels,
  defaultProgress,
  getProgress,
  resetProgress,
  type ProgressData,
} from "@/progressStorage";

export default function Home() {
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
          Project management game
        </p>
        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Project Pulse</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Ekip, zaman ve risk kararları vererek proje yönetimi
              reflekslerini geliştirdiğin kısa seçim tabanlı bir oyun.
            </p>
          </div>
          <CareerAvatar careerLevelIndex={progress.careerLevelIndex} size="lg" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          <p className="text-sm font-medium text-slate-400">Mevcut ilerleme</p>
          <p className="mt-3 text-2xl font-bold text-white">
            {careerLevels[progress.careerLevelIndex]}
          </p>
          <p className="mt-2 text-slate-300">
            {progress.totalXp} XP · {progress.completedProjects} tamamlanan
            proje
          </p>
          <p className="mt-1 text-sm text-cyan-300">
            {progress.earnedBadges.length} rozet kazanıldı
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          <p className="text-sm font-medium text-slate-400">Hızlı işlemler</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/game"
              className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-500 px-6 font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
            >
              Oyuna Başla
            </Link>
            <Link
              href="/profile"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-6 font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              Profili Gör
            </Link>
            <button
              type="button"
              onClick={handleResetProgress}
              className="inline-flex h-12 items-center justify-center rounded-md border border-red-300/30 bg-red-500/10 px-6 font-semibold text-red-200 transition-colors hover:bg-red-500/20"
            >
              İlerlemeyi Sıfırla
            </button>
          </div>
        </div>
      </section>

      <MetricsPanel metrics={initialMetrics} />
    </div>
  );
}
