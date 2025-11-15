"use client"

import { MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"

interface Movie {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
}

interface MovieGridProps {
  movies: Movie[]
  userId: string
  isLoading?: boolean
}

export function MovieGrid({ movies, userId, isLoading }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[2/3] w-full rounded-lg bg-zinc-800" />
            <Skeleton className="h-4 w-3/4 bg-zinc-800" />
            <Skeleton className="h-3 w-1/2 bg-zinc-800" />
          </div>
        ))}
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-muted-foreground">No se encontraron películas. Intenta una búsqueda diferente.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} userId={userId} />
      ))}
    </div>
  )
}
