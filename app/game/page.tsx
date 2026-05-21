"use client";

import Link from "next/link";
import { useState } from "react";

type Option = {
  label: string;
  feedback: string;
  xp: number;
};

type Scenario = {
  text: string;
  options: Option[];
};

const storageKey = "project-pulse-profile";

const scenarios: Scenario[] = [
  {
    text: "Sprint ortasında kritik bir entegrasyon beklenenden zor çıktı. Ekip baskı altında ve teslim tarihi yaklaşıyor.",
    options: [
      {
        label: "Kapsamı küçült ve en değerli özelliği teslim et.",
        feedback: "İyi karar. Kapsamı yönetmek teslim riskini düşürdü.",
        xp: 30,
      },
      {
        label: "Herkesten fazla mesai iste.",
        feedback: "Kısa vadede hızlanırsın ama ekip sürdürülebilirliği zarar görür.",
        xp: 10,
      },
      {
        label: "Problemi görmezden gelip plana devam et.",
        feedback: "Risk büyüdü. Erken görünürlük proje sağlığı için kritiktir.",
        xp: 0,
      },
      {
        label: "Paydaşlarla konuşup tarihi yeniden değerlendir.",
        feedback: "Şeffaf iletişim güveni artırdı ve beklentiyi netleştirdi.",
        xp: 25,
      },
    ],
  },
  {
    text: "Müşteri yeni bir özellik istedi. Ekip bunun mevcut teslimata eklenirse kaliteyi düşüreceğini söylüyor.",
    options: [
      {
        label: "İsteği backlog'a al ve etki analizi yap.",
        feedback: "Harika. Değişiklik isteğini kontrol altına aldın.",
        xp: 30,
      },
      {
        label: "Hemen ekibe ek işi ver.",
        feedback: "Hızlı göründü ama plan ve kapasite dengesi bozuldu.",
        xp: 5,
      },
      {
        label: "Müşteriye doğrudan hayır de.",
        feedback: "Sınır koydun ama kararın gerekçesini birlikte kurmak daha iyi olurdu.",
        xp: 15,
      },
      {
        label: "Mevcut işlerden birini çıkarıp yenisini takas et.",
        feedback: "İyi yaklaşım. Kapsam takası kontrolü korudu.",
        xp: 25,
      },
    ],
  },
  {
    text: "Testlerde önemli bir hata bulundu. Lansmana iki gün kaldı ve pazarlama kampanyası hazır.",
    options: [
      {
        label: "Hatayı önceliklendirip lansman kararını veriye göre al.",
        feedback: "Güçlü karar. Kalite riskini görünür ve yönetilebilir yaptın.",
        xp: 30,
      },
      {
        label: "Hatayı bilinen sorun olarak yayınla.",
        feedback: "Bazı durumlarda olur ama önem derecesi netleşmeden riskli.",
        xp: 10,
      },
      {
        label: "Lansmanı sessizce ertele.",
        feedback: "Kaliteyi korudun ama iletişim eksikliği güven kaybettirebilir.",
        xp: 15,
      },
      {
        label: "Paydaşlarla hızlı karar toplantısı yap.",
        feedback: "İyi. Kararı ortak bilgiyle almak sürprizleri azalttı.",
        xp: 25,
      },
    ],
  },
];

function saveProgress(xp: number, completedProject: boolean) {
  const current = JSON.parse(
    window.localStorage.getItem(storageKey) ??
      '{"totalXp":0,"completedProjects":0}',
  ) as { totalXp: number; completedProjects: number };

  window.localStorage.setItem(
    storageKey,
    JSON.stringify({
      totalXp: current.totalXp + xp,
      completedProjects:
        current.completedProjects + (completedProject ? 1 : 0),
    }),
  );
}

export default function GamePage() {
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedXp, setSelectedXp] = useState(0);
  const [roundLocked, setRoundLocked] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const scenario = scenarios[round];
  const roundNumber = round + 1;

  function chooseOption(option: Option) {
    if (roundLocked) {
      return;
    }

    const isLastRound = round === scenarios.length - 1;
    setFeedback(`${option.feedback} +${option.xp} XP`);
    setSelectedXp(option.xp);
    setRoundLocked(true);
    saveProgress(option.xp, isLastRound);

    if (isLastRound) {
      setGameComplete(true);
    }
  }

  function goToNextRound() {
    if (gameComplete) {
      setRound(0);
      setGameComplete(false);
    } else {
      setRound((currentRound) => currentRound + 1);
    }

    setFeedback("");
    setSelectedXp(0);
    setRoundLocked(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <Link href="/" className="text-sm font-medium text-cyan-700">
            Ana sayfa
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Project Pulse</h1>
          <p className="mt-2 text-slate-600">
            Raund {roundNumber} / {scenarios.length}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold">Senaryo</h2>
          <p className="mt-3 leading-7 text-slate-700">{scenario.text}</p>
        </div>

        <div className="grid gap-3">
          {scenario.options.map((option) => (
            <button
              key={option.label}
              type="button"
              disabled={roundLocked}
              onClick={() => chooseOption(option)}
              className="rounded-md border border-slate-300 bg-white px-4 py-3 text-left font-medium text-slate-800 transition-colors hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="min-h-24 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold">Feedback</h2>
          <p className="mt-2 text-slate-700">
            {feedback || "Bir seçim yaptığında geri bildirim burada görünecek."}
          </p>
          {roundLocked ? (
            <p className="mt-2 text-sm font-medium text-cyan-700">
              Bu raund kazanılan XP: {selectedXp}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={!roundLocked}
            onClick={goToNextRound}
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-700 px-6 font-semibold text-white transition-colors hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {gameComplete ? "Yeni Projeye Başla" : "Sonraki Raund"}
          </button>
          <Link
            href="/profile"
            className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-6 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Profil Sayfası
          </Link>
        </div>
      </section>
    </main>
  );
}
