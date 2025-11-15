import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { MovieSearch } from "@/components/movie-search"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 light:from-background light:via-secondary light:to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse dark:block hidden"></div>
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse delay-1000 dark:block hidden"></div>
        <div className="absolute -bottom-40 right-1/4 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl animate-pulse delay-2000 dark:block hidden"></div>
      </div>

      <DashboardHeader user={user} />

      <main className="relative container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white dark:text-white light:text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Descubre tu próxima
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-sky-400 light:from-primary light:via-primary/80 light:to-primary">
              película favorita
            </span>
          </h1>
          <p className="text-xl text-white/70 dark:text-white/70 light:text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Explora miles de películas, filtra por género y guarda las que más te gusten
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 light:bg-card light:border-border p-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <MovieSearch userId={user.id} />
        </div>
      </main>
    </div>
  )
}
