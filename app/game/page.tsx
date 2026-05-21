"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CareerAvatar } from "@/components/CareerAvatar";
import { MetricsPanel } from "@/components/MetricsPanel";
import {
  projects,
  type Project,
  type ProjectMethodology,
  type ProjectOption,
} from "@/data/projects";
import { createClient } from "@/lib/supabase/client";
import {
  getOrCreateProfile,
  updateProfileProgress,
} from "@/lib/supabase/profileService";
import { insertUserProgress } from "@/lib/supabase/progressService";
import { clampMetric, initialMetrics, type MetricScores } from "@/metrics";
import {
  type BadgeName,
  careerLevels,
  defaultProgress,
  getProgress,
  saveGameProgress,
} from "@/progressStorage";

type CareerResult = "Terfi" | "Stabil" | "Görevin Azalması";

type BaseGameResult = {
  stars: number;
  earnedXp: number;
  careerResult: CareerResult;
  newTitle: string;
  feedback: string;
};

type GameResult = BaseGameResult & {
  newBadges: BadgeName[];
};

function MethodologyBadge({ methodology }: { methodology: ProjectMethodology }) {
  const className =
    methodology === "Agile"
      ? "border-cyan-800 bg-cyan-950 text-cyan-300"
      : "border-amber-800 bg-amber-950 text-amber-300";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${className}`}>
      {methodology}
    </span>
  );
}

const methodologyCards = [
  {
    methodology: "Agile" as const,
    concepts: ["Sprint", "Backlog", "MVP", "Velocity", "Continuous Feedback"],
    description:
      "Agile, belirsizliğin yüksek olduğu projelerde küçük iterasyonlarla ilerlemeyi, geri bildirim almayı ve öncelikleri düzenli güncellemeyi sağlar.",
    className: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  },
  {
    methodology: "Waterfall" as const,
    concepts: [
      "Requirements",
      "Documentation",
      "Phase-Gate",
      "Acceptance Criteria",
      "Change Request",
    ],
    description:
      "Waterfall, gereksinimleri baştan daha net olan projelerde planlı, sıralı ve dokümantasyon odaklı ilerlemeyi sağlar.",
    className: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  },
];

function getResultForScore(
  score: number,
  currentCareerLevel: number,
): BaseGameResult {
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

function applyMetricEffects(
  metrics: MetricScores,
  option: ProjectOption,
): MetricScores {
  return {
    projectHealth: clampMetric(
      metrics.projectHealth + option.metricEffects.projectHealth,
    ),
    teamMorale: clampMetric(metrics.teamMorale + option.metricEffects.teamMorale),
    stakeholderSatisfaction: clampMetric(
      metrics.stakeholderSatisfaction +
        option.metricEffects.stakeholderSatisfaction,
    ),
    deliveryFocus: clampMetric(
      metrics.deliveryFocus + option.metricEffects.deliveryFocus,
    ),
  };
}

function getEarnedBadges(
  methodology: ProjectMethodology,
  stars: number,
  score: number,
  metrics: MetricScores,
): BadgeName[] {
  const badges: BadgeName[] = [];

  if (methodology === "Agile" && stars === 3) {
    badges.push("Agile Mindset");
  }

  if (methodology === "Waterfall" && stars === 3) {
    badges.push("Waterfall Discipline");
  }

  if (score > 60) {
    badges.push("Deadline Saver");
  }

  if (metrics.teamMorale > 70) {
    badges.push("Team Builder");
  }

  if (metrics.projectHealth > 70) {
    badges.push("Scope Guardian");
  }

  return badges;
}

export default function GamePage() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [gameStarted, setGameStarted] = useState(false);
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
  const [metrics, setMetrics] = useState<MetricScores>(initialMetrics);
  const [user, setUser] = useState<User | null>(null);
  const [cloudError, setCloudError] = useState("");

  const currentProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const round = currentProject.rounds[roundIndex];
  const isLastRound = roundIndex === currentProject.rounds.length - 1;

  useEffect(() => {
    const loadProgress = window.setTimeout(() => {
      setCareerLevel(getProgress().careerLevelIndex);
    }, 0);

    return () => {
      window.clearTimeout(loadProgress);
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      return;
    }

    const supabaseClient = supabase;
    let isMounted = true;

    supabaseClient.auth.getUser().then(async ({ data }) => {
      if (!isMounted) {
        return;
      }

      setUser(data.user);

      if (data.user) {
        try {
          const profile = await getOrCreateProfile(supabaseClient, data.user);
          if (isMounted) {
            setCareerLevel(profile.career_level_index);
          }
        } catch {
          if (isMounted) {
            setCloudError("Could not load cloud profile.");
          }
        }
      }
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  function resetGameState(project: Project) {
    setSelectedProjectId(project.id);
    setRoundIndex(0);
    setSelectedOption(null);
    setTotalScore(0);
    setShowResults(false);
    setGameResult(null);
    setMetrics(initialMetrics);
    setCloudError("");
  }

  function startProject(project: Project) {
    resetGameState(project);
    setGameStarted(true);
  }

  function chooseOption(option: ProjectOption) {
    if (selectedOption) {
      return;
    }

    setSelectedOption(option);
    setTotalScore((currentScore) => currentScore + option.score);
    setMetrics((currentMetrics) => applyMetricEffects(currentMetrics, option));
  }

  function goToNextRound() {
    setRoundIndex((currentRound) => currentRound + 1);
    setSelectedOption(null);
  }

  async function showResultScreen() {
    const baseResult = getResultForScore(totalScore, careerLevel);
    const nextCareerLevel = careerLevels.indexOf(baseResult.newTitle);
    const earnedBadges = getEarnedBadges(
      currentProject.methodology,
      baseResult.stars,
      totalScore,
      metrics,
    );
    let newBadges: BadgeName[] = [];

    if (user) {
      const supabase = createClient();

      if (supabase) {
        try {
          await getOrCreateProfile(supabase, user);
          const savedProgress = await updateProfileProgress(supabase, user.id, {
            earnedXp: baseResult.earnedXp,
            careerLevelIndex: nextCareerLevel,
            earnedBadges,
          });

          await insertUserProgress(supabase, {
            user_id: user.id,
            project_id: currentProject.id,
            project_title: currentProject.title,
            methodology: currentProject.methodology,
            stars: baseResult.stars,
            xp_earned: baseResult.earnedXp,
            result: baseResult.careerResult,
            final_score: totalScore,
          });

          newBadges = savedProgress.newBadges;
        } catch {
          setCloudError("Could not save cloud progress.");
        }
      }
    } else {
      const savedProgress = saveGameProgress(
        baseResult.earnedXp,
        nextCareerLevel,
        earnedBadges,
      );
      newBadges = savedProgress.newBadges;
    }

    const result = {
      ...baseResult,
      newBadges,
    };

    setCareerLevel(nextCareerLevel);
    setGameResult(result);
    setShowResults(true);
  }

  function restartGame() {
    resetGameState(currentProject);
    setGameStarted(true);
  }

  if (!gameStarted) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10">
          <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
            Case selection
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Agile ve Waterfall case seçimi
          </h1>
          <p className="mt-2 max-w-3xl text-slate-300">
            Agile iteration ve Waterfall phase disiplinini karşılaştıran bir
            case seç. Oyuna Başla dediğinde raund, skor ve metrikler sıfırlanır.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {methodologyCards.map((card) => (
            <article
              key={card.methodology}
              className={`rounded-lg border p-5 shadow-xl shadow-cyan-950/20 ${card.className}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{card.methodology}</h2>
                <MethodologyBadge methodology={card.methodology} />
              </div>
              <p className="mt-3 leading-7 text-slate-200">
                {card.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-md border border-white/10 bg-slate-950/40 px-3 py-2 text-xs font-semibold text-slate-100"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {projects.map((project) => {
            const isSelected = project.id === selectedProjectId;

            return (
              <article
                key={project.id}
                className={`flex flex-col rounded-lg border bg-slate-900/70 p-5 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10 transition-all hover:-translate-y-0.5 hover:border-cyan-300/40 ${
                  isSelected ? "border-cyan-300/50" : "border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-white">
                    {project.title}
                  </h2>
                  <MethodologyBadge methodology={project.methodology} />
                </div>
                <p className="mt-3 flex-1 leading-7 text-slate-300">
                  {project.description}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-4 font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  {isSelected ? "Seçili Case" : "Case Seç"}
                </button>
              </article>
            );
          })}
        </section>

        <section className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => startProject(currentProject)}
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-500 px-6 font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            Oyuna Başla
          </button>
          <Link
            href="/profile"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-6 font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            Profil Sayfası
          </Link>
        </section>
      </div>
    );
  }

  if (showResults && gameResult) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-300/10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
                  {currentProject.title}
                </p>
                <MethodologyBadge methodology={currentProject.methodology} />
              </div>
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

        <MetricsPanel metrics={metrics} />

        {gameResult.newBadges.length > 0 ? (
          <section className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-5 shadow-xl shadow-cyan-950/20">
            <p className="text-sm font-medium uppercase tracking-wide text-cyan-200">
              New Badge Unlocked
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {gameResult.newBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-cyan-300/30 bg-slate-950/40 px-3 py-2 text-sm font-semibold text-cyan-100"
                >
                  {badge}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-lg border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-300/10">
          {cloudError ? (
            <p className="mb-4 rounded-md border border-red-300/30 bg-red-500/10 p-3 text-sm font-medium text-red-200">
              {cloudError}
            </p>
          ) : null}
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
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium uppercase tracking-wide text-cyan-300">
                Raund {round.roundNumber} / {currentProject.rounds.length}
              </p>
              <MethodologyBadge methodology={currentProject.methodology} />
            </div>
            <h1 className="mt-2 text-3xl font-bold text-white">
              {currentProject.title}
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

      <MetricsPanel metrics={metrics} />

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
          <div className="mt-4 rounded-md border border-white/10 bg-slate-950/40 p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
              Why this matters
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {selectedOption.learningNote}
            </p>
          </div>
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
