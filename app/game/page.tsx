"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, type ProjectOption } from "@/data/projects";

const project = projects[0];

const careerLevels = [
  "Junior Project Coordinator",
  "Assistant Project Manager",
  "Project Manager",
  "Senior Project Manager",
];

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
  const [careerLevel, setCareerLevel] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const round = project.rounds[roundIndex];
  const isLastRound = roundIndex === project.rounds.length - 1;

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
      <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
        <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <Link href="/" className="text-sm font-medium text-cyan-700">
              Ana sayfa
            </Link>
            <h1 className="mt-4 text-3xl font-bold">Sonuclar</h1>
            <p className="mt-2 text-slate-600">{project.title}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Yildiz</p>
              <p className="mt-2 text-3xl font-bold text-cyan-700">
                {"★".repeat(gameResult.stars)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Kazanilan XP
              </p>
              <p className="mt-2 text-3xl font-bold">{gameResult.earnedXp}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Kariyer sonucu
              </p>
              <p className="mt-2 text-2xl font-bold">
                {gameResult.careerResult}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Yeni unvan</p>
              <p className="mt-2 text-2xl font-bold">{gameResult.newTitle}</p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">Toplam skor</p>
            <p className="mt-2 text-3xl font-bold">{totalScore}</p>
            <p className="mt-4 leading-7 text-slate-700">
              {gameResult.feedback}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-6 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Ana Sayfaya Don
            </Link>
            <button
              type="button"
              onClick={restartGame}
              className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-700 px-6 font-semibold text-white transition-colors hover:bg-cyan-800"
            >
              Tekrar Oyna
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <Link href="/" className="text-sm font-medium text-cyan-700">
            Ana sayfa
          </Link>
          <h1 className="mt-4 text-3xl font-bold">{project.title}</h1>
          <p className="mt-2 text-slate-600">
            {project.methodology} | Raund {round.roundNumber} /{" "}
            {project.rounds.length}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Toplam skor: {totalScore}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-medium text-cyan-700">{round.phase}</p>
          <h2 className="mt-2 text-lg font-semibold">Senaryo</h2>
          <p className="mt-3 leading-7 text-slate-700">{round.scenario}</p>
        </div>

        <div className="grid gap-3">
          {round.options.map((option) => (
            <button
              key={option.text}
              type="button"
              disabled={Boolean(selectedOption)}
              onClick={() => chooseOption(option)}
              className="rounded-md border border-slate-300 bg-white px-4 py-3 text-left font-medium text-slate-800 transition-colors hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {option.text}
            </button>
          ))}
        </div>

        {selectedOption ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold">Feedback</h2>
            <p className="mt-2 text-slate-700">{selectedOption.feedback}</p>
            <p className="mt-2 text-sm font-medium text-cyan-700">
              Bu secimden gelen skor: {selectedOption.score}
            </p>
          </div>
        ) : null}

        {selectedOption ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={isLastRound ? showResultScreen : goToNextRound}
              className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-700 px-6 font-semibold text-white transition-colors hover:bg-cyan-800"
            >
              {isLastRound ? "Sonuclari Gor" : "Sonraki Raund"}
            </button>
            <Link
              href="/profile"
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-6 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Profil Sayfasi
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
