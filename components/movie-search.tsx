"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MovieGrid } from "@/components/movie-grid"
import { GenreFilter } from "@/components/genre-filter"
import useSWR from "swr"

interface MovieSearchProps {
  userId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function MovieSearch({ userId }: MovieSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [activeSearch, setActiveSearch] = useState("")
  const [page, setPage] = useState(1)

  const { data: moviesData, isLoading } = useSWR(
    activeSearch ? `/api/movies/search?query=${activeSearch}&page=${page}` : null,
    fetcher,
  )

  const { data: genreMoviesData, isLoading: isLoadingGenre } = useSWR(
    selectedGenre ? `/api/movies/genre?genreId=${selectedGenre}&page=${page}` : null,
    fetcher,
  )

  const { data: popularData, isLoading: isLoadingPopular } = useSWR(
    !activeSearch && !selectedGenre ? `/api/movies/popular?page=${page}` : null,
    fetcher,
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setActiveSearch(searchQuery)
      setSelectedGenre(null)
      setPage(1)
    }
  }

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId)
    setActiveSearch("")
    setSearchQuery("")
    setPage(1)
  }

  const movies = moviesData?.results || genreMoviesData?.results || popularData?.results || []
  const totalPages = moviesData?.total_pages || genreMoviesData?.total_pages || popularData?.total_pages || 1
  const loading = isLoading || isLoadingGenre || isLoadingPopular

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Descubrir Películas</h1>
          <p className="text-white/70">Explora miles de películas y encuentra tu próxima favorita</p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
            <Input
              type="text"
              placeholder="Buscar películas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 pl-12 h-14 text-lg text-white placeholder:text-white/60 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
          <Button type="submit" size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 px-8 h-14">
            Buscar
          </Button>
        </form>
      </div>

      <GenreFilter selectedGenre={selectedGenre} onGenreSelect={handleGenreSelect} />

      <div>
        {activeSearch && (
          <h2 className="mb-6 text-2xl font-semibold text-white text-center">Resultados para "{activeSearch}"</h2>
        )}
        {selectedGenre && <h2 className="mb-6 text-2xl font-semibold text-white text-center">Películas por Género</h2>}
        {!activeSearch && !selectedGenre && (
          <h2 className="mb-6 text-2xl font-semibold text-white text-center">Películas Populares</h2>
        )}

        <MovieGrid movies={movies} userId={userId} isLoading={loading} />

        {!loading && movies.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-blue-400 transition-all duration-300"
            >
              Anterior
            </Button>
            <span className="text-white/70 font-medium px-4">
              Página {page} de {Math.min(totalPages, 500)}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.min(totalPages, 500)}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-blue-400 transition-all duration-300"
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
