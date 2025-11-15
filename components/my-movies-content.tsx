"use client"

import { useState } from "react"
import useSWR, { mutate } from "swr"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Trash2, Film } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface UserMovie {
  id: string
  movie_id: number
  movie_title: string
  movie_poster: string | null
  movie_overview: string
  movie_release_date: string
  movie_vote_average: number
  is_favorite: boolean
  added_at: string
}

interface MyMoviesContentProps {
  userId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function MyMoviesContent({ userId }: MyMoviesContentProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { data: movies, isLoading } = useSWR<UserMovie[]>("/api/user-movies", fetcher)

  const allMovies = movies || []
  const favoriteMovies = allMovies.filter((movie) => movie.is_favorite)
  const savedMovies = allMovies.filter((movie) => !movie.is_favorite)

  const handleDelete = async (movieId: number, userMovieId: string) => {
    setDeletingId(userMovieId)
    try {
      const response = await fetch(`/api/user-movies/${movieId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate("/api/user-movies")
      }
    } catch (error) {
      console.error("[v0] Error deleting movie:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleFavorite = async (movieId: number, currentFavorite: boolean) => {
    try {
      const response = await fetch(`/api/user-movies/${movieId}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_favorite: !currentFavorite }),
      })

      if (response.ok) {
        mutate("/api/user-movies")
      }
    } catch (error) {
      console.error("[v0] Error toggling favorite:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 bg-muted" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Mis Películas</h1>
        <p className="text-white/70">Administra tu colección personal de películas</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/10 border border-white/20 backdrop-blur-sm">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-white/70">
            Todas ({allMovies.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-white/70">
            Favoritas ({favoriteMovies.length})
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-white/70">
            Guardadas ({savedMovies.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <MovieList
            movies={allMovies}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            deletingId={deletingId}
          />
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <MovieList
            movies={favoriteMovies}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            deletingId={deletingId}
          />
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <MovieList
            movies={savedMovies}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            deletingId={deletingId}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MovieListProps {
  movies: UserMovie[]
  onDelete: (movieId: number, userMovieId: string) => void
  onToggleFavorite: (movieId: number, currentFavorite: boolean) => void
  deletingId: string | null
}

function MovieList({ movies, onDelete, onToggleFavorite, deletingId }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-12">
        <Film className="h-20 w-20 text-white/60" />
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-2">Aún no hay películas</h3>
          <p className="text-white/70">Comienza agregando películas a tu colección desde la página de descubrimiento</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => {
        const posterUrl = movie.movie_poster
          ? `https://image.tmdb.org/t/p/w500${movie.movie_poster}`
          : "/abstract-movie-poster.png"

        return (
          <Card
            key={movie.id}
            className="group relative overflow-hidden border-border bg-card/50 transition-all hover:scale-105 hover:border-primary"
          >
            <div className="aspect-[2/3] overflow-hidden">
              <img
                src={posterUrl || "/placeholder.svg"}
                alt={movie.movie_title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                <h3 className="font-semibold text-foreground line-clamp-2 text-balance">{movie.movie_title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{movie.movie_release_date?.split("-")[0] || "N/A"}</span>
                  <span>•</span>
                  <span>⭐ {movie.movie_vote_average?.toFixed(1) || "N/A"}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onToggleFavorite(movie.movie_id, movie.is_favorite)}
                    className={cn(
                      "flex-1 border-border",
                      movie.is_favorite
                        ? "bg-primary hover:bg-primary/90 border-primary"
                        : "bg-transparent hover:bg-accent",
                    )}
                  >
                    <Heart className={cn("mr-1 h-4 w-4", movie.is_favorite && "fill-current")} />
                    {movie.is_favorite ? "Favorita" : "Agregar a favoritas"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(movie.movie_id, movie.id)}
                    disabled={deletingId === movie.id}
                    className="border-border bg-transparent hover:bg-destructive/20 hover:border-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
