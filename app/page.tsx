import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Film, Search, Heart, List, Play, Star, TrendingUp, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Film className="h-8 w-8 text-blue-400 animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-cyan-400 animate-spin" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              MovieLess
            </span>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm">
              <Link href="/auth/login">Iniciar sesión</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              <Link href="/auth/signup" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Comenzar
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-32 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-white/80">Descubre miles de películas</span>
            </div>

            <h1 className="mb-8 text-6xl md:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Tu colección
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                personal de películas
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-3xl text-xl text-white/70 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              Sumérgete en un universo cinematográfico ilimitado. Descubre joyas ocultas, guarda tus favoritas
              y crea listas personalizadas que reflejen tu pasión por el cine.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600"
              >
                <Link href="/auth/signup" className="flex items-center gap-3 px-8 py-4 text-lg">
                  <Star className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Comenzar a coleccionar
                  <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-800"
              >
                <Link href="/auth/login" className="flex items-center gap-2 px-8 py-4 text-lg">
                  <Play className="h-5 w-5" />
                  Iniciar sesión
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10M+</div>
                <div className="text-white/60">Películas disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/60">Usuarios activos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.9★</div>
                <div className="text-white/60">Calificación promedio</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              ¿Por qué elegir <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">MovieLess</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Una experiencia cinematográfica única diseñada para verdaderos amantes del cine
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Búsqueda Inteligente</h3>
                <p className="text-white/70 leading-relaxed">
                  Nuestro motor de búsqueda avanzado encuentra exactamente lo que buscas entre millones de películas,
                  series y documentales con recomendaciones personalizadas.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Colección Personal</h3>
                <p className="text-white/70 leading-relaxed">
                  Crea tu biblioteca perfecta. Marca favoritos, organiza en listas temáticas y
                  accede a tu colección desde cualquier dispositivo, en cualquier momento.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <List className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Listas Inteligentes</h3>
                <p className="text-white/70 leading-relaxed">
                  Organiza tu cine con listas dinámicas. Filtra por género, año, director o
                  crea colecciones personalizadas que se actualizan automáticamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative container mx-auto px-4 py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-sky-500/20 backdrop-blur-sm border border-white/10 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 animate-pulse"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                ¿Listo para tu próxima aventura cinematográfica?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                Únete a miles de cinéfilos que ya han transformado su experiencia con las películas
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400"
              >
                <Link href="/auth/signup" className="flex items-center gap-3 px-8 py-4 text-lg">
                  <Sparkles className="h-5 w-5" />
                  Comenzar gratis
                  <Play className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Film className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                MovieLess
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/60 text-sm">
                © 2025 MovieLess. Construido con ❤️ usando Next.js y Supabase.
              </p>
              <p className="text-white/40 text-xs mt-1">
                Tu compañero cinematográfico definitivo
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
