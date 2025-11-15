"use client"

import { Button } from "@/components/ui/button"
import useSWR from "swr"

interface GenreFilterProps {
  selectedGenre: number | null
  onGenreSelect: (genreId: number | null) => void
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function GenreFilter({ selectedGenre, onGenreSelect }: GenreFilterProps) {
  const { data: genresData } = useSWR("/api/movies/genres", fetcher)

  const genres = genresData?.genres || []

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white text-center">Filtrar por género</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={selectedGenre === null ? "default" : "outline"}
          size="sm"
          onClick={() => onGenreSelect(null)}
          className={
            selectedGenre === null
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-blue-400 transition-all duration-300"
          }
        >
          Todos
        </Button>
        {genres.map((genre: { id: number; name: string }) => (
          <Button
            key={genre.id}
            variant={selectedGenre === genre.id ? "default" : "outline"}
            size="sm"
            onClick={() => onGenreSelect(genre.id)}
            className={
              selectedGenre === genre.id
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-blue-400 transition-all duration-300"
            }
          >
            {genre.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
