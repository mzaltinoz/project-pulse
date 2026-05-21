"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CareerAvatar } from "@/components/CareerAvatar";
import {
  careerLevels,
  defaultProgress,
  getProgress,
  resetProgress,
  type ProgressData,
} from "@/progressStorage";

function getManagementStyle(earnedBadges?: string[]) {
  if (earnedBadges?.includes("Agile Mindset")) {
    return "Agile Facilitator";
  }

  if (earnedBadges?.includes("Waterfall Discipline")) {
    return "Structured Planner";
  }

  if (earnedBadges?.includes("Deadline Saver")) {
    return "Delivery-Focused Manager";
  }

  if (earnedBadges?.includes("Team Builder")) {
    return "Team-Oriented Leader";
  }

  return "Emerging Project Manager";
}

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

  const currentTitle =
    careerLevels[progress.careerLevelIndex] ?? careerLevels[0];
  const managementStyle = getManagementStyle(progress.earnedBadges);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
              Profile
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">Profil</h1>
            <p className="mt-2 text-slate-300">
              Project Pulse ilerlemen bu cihazda saklanır.
            </p>
          </div>
          <CareerAvatar careerLevelIndex={progress.careerLevelIndex} size="lg" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          <p className="text-sm font-medium text-slate-400">Total XP</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {progress.totalXp}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          <p className="text-sm font-medium text-slate-400">
            Completed Projects
          </p>
          <p className="mt-2 text-3xl font-bold text-white">
            {progress.completedProjects}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          <p className="text-sm font-medium text-slate-400">Earned Badges</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {progress.earnedBadges.length}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          <p className="text-sm font-medium text-slate-400">Current Title</p>
          <p className="mt-2 text-xl font-bold text-white">
            {currentTitle}
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
        <p className="text-sm font-medium text-slate-400">Management Style</p>
        <p className="mt-2 text-2xl font-bold text-cyan-200">
          {managementStyle}
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
        <p className="text-sm font-medium text-slate-400">Career Timeline</p>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {careerLevels.map((level, index) => {
            const isComplete = index < progress.careerLevelIndex;
            const isCurrent = index === progress.careerLevelIndex;

            return (
              <div
                key={level}
                className={`relative rounded-lg border p-4 ${
                  isCurrent
                    ? "border-cyan-300/50 bg-cyan-300/10 shadow-lg shadow-cyan-950/40"
                    : isComplete
                      ? "border-emerald-300/30 bg-emerald-300/10"
                      : "border-white/10 bg-slate-950/40 opacity-60"
                }`}
              >
                <div
                  className={`mb-3 h-2 rounded-full ${
                    isComplete || isCurrent ? "bg-cyan-400" : "bg-slate-700"
                  }`}
                />
                <p className="text-sm font-bold text-white">{level}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {isCurrent ? "Current level" : isComplete ? "Completed" : "Locked"}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-400">
              Kazanılan rozetler
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              {progress.earnedBadges.length} rozet
            </h2>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {progress.earnedBadges.length > 0 ? (
            progress.earnedBadges.map((badge) => (
              <div
                key={badge}
                className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-semibold text-cyan-100"
              >
                {badge}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              Henüz rozet kazanılmadı. Bir projeyi tamamlayarak başlayabilirsin.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/game"
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-500 px-6 font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            Oyuna Devam Et
          </Link>
          <button
            type="button"
            onClick={handleResetProgress}
            className="inline-flex h-12 items-center justify-center rounded-md border border-red-300/30 bg-red-500/10 px-6 font-semibold text-red-200 transition-colors hover:bg-red-500/20"
          >
            İlerlemeyi Sıfırla
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-6 font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            Ana Sayfa
          </Link>
        </div>
      </section>
    </div>
  );
}
