"use client"

import { useState } from "react"
import { Heart, Plus, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import useSWR, { mutate } from "swr"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Movie {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
}

interface MovieCardProps {
  movie: Movie
  userId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function MovieCard({ movie, userId }: MovieCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const { data: userMovie } = useSWR(`/api/user-movies/${movie.id}`, fetcher)

  const isSaved = !!userMovie
  const isFavorite = userMovie?.is_favorite || false

  const handleAddToList = async () => {
    setIsAdding(true)
    try {
      const response = await fetch("/api/user-movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_id: movie.id,
          movie_title: movie.title,
          movie_poster: movie.poster_path,
          movie_overview: movie.overview,
          movie_release_date: movie.release_date,
          movie_vote_average: movie.vote_average,
        }),
      })

      if (response.ok) {
        mutate(`/api/user-movies/${movie.id}`)
        mutate("/api/user-movies")
      }
    } catch (error) {
      console.error("Error adding movie:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleToggleFavorite = async () => {
    setIsTogglingFavorite(true)
    try {
      const response = await fetch(`/api/user-movies/${movie.id}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_favorite: !isFavorite }),
      })

      if (response.ok) {
        mutate(`/api/user-movies/${movie.id}`)
        mutate("/api/user-movies")
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsTogglingFavorite(false)
    }
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=450&width=300"

  return (
    <>
      <Card className="group relative overflow-hidden border-border bg-card/50 transition-all hover:scale-105 hover:border-primary">
        <div className="aspect-[2/3] overflow-hidden">
          <img src={posterUrl || "/placeholder.svg"} alt={movie.title} className="h-full w-full object-cover" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            <h3 className="font-semibold text-foreground line-clamp-2 text-balance">{movie.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
              <span>•</span>
              <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDetails(true)}
                className="border-border bg-transparent hover:bg-accent"
              >
                <Info className="h-4 w-4" />
              </Button>

              {!isSaved ? (
                <Button
                  size="sm"
                  onClick={handleAddToList}
                  disabled={isAdding}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  {isAdding ? "Agregando..." : "Agregar"}
                </Button>
              ) : (
                <Button size="sm" disabled className="flex-1 bg-muted">
                  <Check className="mr-1 h-4 w-4" />
                  Guardada
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={handleToggleFavorite}
                disabled={!isSaved || isTogglingFavorite}
                className={cn(
                  "border-border",
                  isFavorite ? "bg-primary hover:bg-primary/90 border-primary" : "bg-transparent hover:bg-accent",
                )}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] bg-card/95 backdrop-blur-md border-border/50 shadow-2xl overflow-hidden">
          <div className="flex flex-col h-full max-h-[85vh]">
            <DialogHeader className="pb-4 flex-shrink-0">
              <DialogTitle className="text-xl font-bold text-foreground leading-tight">
                {movie.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{movie.release_date?.split("-")[0] || "N/A"}</span>
                <span className="text-muted-foreground/60">•</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{movie.vote_average?.toFixed(1) || "N/A"}</span>
                  <span className="text-muted-foreground/60">/10</span>
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/50">
              {movie.poster_path && (
                <div className="flex justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    className="w-48 h-auto rounded-xl object-cover shadow-lg border border-border/20"
                  />
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-lg">Sinopsis</h4>
                <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                  {movie.overview || "No hay sinopsis disponible para esta película."}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border/20 flex-shrink-0">
              {!isSaved ? (
                <Button
                  onClick={handleAddToList}
                  disabled={isAdding}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isAdding ? "Agregando..." : "Agregar a mi lista"}
                </Button>
              ) : (
                <Button disabled className="flex-1 bg-muted">
                  <Check className="mr-2 h-4 w-4" />
                  En mi lista
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleToggleFavorite}
                disabled={!isSaved || isTogglingFavorite}
                className={cn(
                  "border-border",
                  isFavorite ? "bg-primary hover:bg-primary/90 border-primary" : "hover:bg-accent",
                )}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                {isFavorite ? "Favorita" : "Marcar como favorita"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
