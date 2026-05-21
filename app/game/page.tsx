"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CareerAvatar } from "@/components/CareerAvatar";
import { projects, type ProjectOption } from "@/data/projects";
import {
  careerLevels,
  defaultProgress,
  getProgress,
  saveGameProgress,
} from "@/progressStorage";

const project = projects[0];

type CareerResult = "Terfi" | "Stabil" | "Görevin Azalması";

type GameResult = {
  stars: number;
  earnedXp: number;
  careerResult: CareerResult;
  newTitle: string;
  feedback: string;
};

function getResultForScore(
  score: number,
  currentCareerLevel: number,
): GameResult {
  if (score >= 60) {
    const newCareerLevel = Math.min(
      currentCareerLevel + 1,
      careerLevels.length - 1,
    );

    return {
      stars: 3,
      earnedXp: 250,
      careerResult: "Terfi",
      newTitle: careerLevels[newCareerLevel],
      feedback:
        "Güçlü kararlar verdin. Kapsam, ekip yükü ve kriz yönetimini dengeli tuttun.",
    };
  }

  if (score >= 30) {
    return {
      stars: 2,
      earnedXp: 100,
      careerResult: "Stabil",
      newTitle: careerLevels[currentCareerLevel],
      feedback:
        "Proje kontrol altında kaldı. Birkaç karar daha net olsaydı terfi çok yakındı.",
    };
  }

  const newCareerLevel = Math.max(currentCareerLevel - 1, 0);

  return {
    stars: 1,
    earnedXp: 25,
    careerResult: "Görevin Azalması",
    newTitle: careerLevels[newCareerLevel],
    feedback:
      "Riskler yeterince erken yönetilemedi. Daha küçük kapsam ve daha açık iletişim gerekli.",
  };
}

export default function GamePage() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<ProjectOption | null>(
    null,
  );
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [careerLevel, setCareerLevel] = useState(
    defaultProgress.careerLevelIndex,
  );
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const round = project.rounds[roundIndex];
  const isLastRound = roundIndex === project.rounds.length - 1;

  useEffect(() => {
    const loadProgress = window.setTimeout(() => {
      setCareerLevel(getProgress().careerLevelIndex);
    }, 0);

    return () => {
      window.clearTimeout(loadProgress);
    };
  }, []);

  function chooseOption(option: ProjectOption) {
    if (selectedOption) {
      return;
    }

    setSelectedOption(option);
    setTotalScore((currentScore) => currentScore + option.score);
  }

  function goToNextRound() {
    setRoundIndex((currentRound) => currentRound + 1);
    setSelectedOption(null);
  }

  function showResultScreen() {
    const result = getResultForScore(totalScore, careerLevel);
    const nextCareerLevel = careerLevels.indexOf(result.newTitle);

    saveGameProgress(result.earnedXp, nextCareerLevel);
    setCareerLevel(nextCareerLevel);
    setGameResult(result);
    setShowResults(true);
  }

  function restartGame() {
    setRoundIndex(0);
    setSelectedOption(null);
    setTotalScore(0);
    setShowResults(false);
    setGameResult(null);
  }

  if (showResults && gameResult) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
                {project.title}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">Sonuçlar</h1>
              <p className="mt-2 text-slate-300">
                Yeni unvan: {gameResult.newTitle}
              </p>
            </div>
            <CareerAvatar title={gameResult.newTitle} size="lg" />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
            <p className="text-sm font-medium text-slate-400">Yıldız</p>
            <p className="mt-2 text-3xl font-bold text-cyan-300">
              {"★".repeat(gameResult.stars)}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
            <p className="text-sm font-medium text-slate-400">Kazanılan XP</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {gameResult.earnedXp}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
            <p className="text-sm font-medium text-slate-400">
              Kariyer sonucu
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {gameResult.careerResult}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
            <p className="text-sm font-medium text-slate-400">Toplam skor</p>
            <p className="mt-2 text-3xl font-bold text-white">{totalScore}</p>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          <p className="leading-7 text-slate-300">{gameResult.feedback}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-6 font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              Ana Sayfaya Dön
            </Link>
            <button
              type="button"
              onClick={restartGame}
              className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-500 px-6 font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
            >
              Tekrar Oyna
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
              {project.methodology} · Raund {round.roundNumber} /{" "}
              {project.rounds.length}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              {project.title}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-400">
              Toplam skor: {totalScore}
            </p>
          </div>
          <CareerAvatar careerLevelIndex={careerLevel} size="lg" />
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
        <p className="text-sm font-semibold text-cyan-300">{round.phase}</p>
        <h2 className="mt-2 text-xl font-semibold text-white">Senaryo</h2>
        <p className="mt-3 leading-7 text-slate-300">{round.scenario}</p>
      </section>

      <section className="grid gap-3">
        {round.options.map((option) => (
          <button
            key={option.text}
            type="button"
            disabled={Boolean(selectedOption)}
            onClick={() => chooseOption(option)}
            className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-4 text-left font-medium text-slate-100 shadow-lg shadow-cyan-950/10 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {option.text}
          </button>
        ))}
      </section>

      {selectedOption ? (
        <section className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5 shadow-xl shadow-cyan-950/20">
          <h2 className="text-lg font-semibold text-white">Feedback</h2>
          <p className="mt-2 text-slate-300">{selectedOption.feedback}</p>
          <p className="mt-2 text-sm font-medium text-cyan-200">
            Bu seçimden gelen skor: {selectedOption.score}
          </p>
        </section>
      ) : null}

      {selectedOption ? (
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={isLastRound ? showResultScreen : goToNextRound}
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-500 px-6 font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            {isLastRound ? "Sonuçları Gör" : "Sonraki Raund"}
          </button>
          <Link
            href="/profile"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-6 font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            Profil Sayfası
          </Link>
        </section>
      ) : null}
    </div>
  );
}
