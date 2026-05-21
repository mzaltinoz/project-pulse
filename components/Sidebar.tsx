"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/game", label: "Game" },
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (isMounted) {
        setUser(data.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-full border-b border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/20 backdrop-blur md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col gap-5 p-4">
        <Link href="/" className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4 shadow-lg shadow-cyan-950/20">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
            Project Pulse
          </p>
          <p className="mt-1 text-lg font-bold text-white">PM Simulator</p>
        </Link>

        <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-md border px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100 shadow-lg shadow-cyan-950/30"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {hasSupabaseConfig() && user ? (
          <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-lg">
                👤
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-200">
                  {user.email}
                </p>
                <p className="text-xs text-cyan-300">Connected</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md border border-white/10 bg-slate-950/50 px-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
