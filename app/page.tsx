import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-12 text-slate-950">
      <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-cyan-700">
          Project management game
        </p>
        <h1 className="text-4xl font-bold">Project Pulse</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Ekip, zaman ve risk kararları vererek proje yönetimi reflekslerini
          geliştirdiğin kısa seçim tabanlı bir oyun.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/game"
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-700 px-6 font-semibold text-white transition-colors hover:bg-cyan-800"
          >
            Oyuna Başla
          </Link>
          <Link
            href="/profile"
            className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 px-6 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Profili Gör
          </Link>
        </div>
      </section>
    </main>
  );
}
