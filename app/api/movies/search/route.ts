import { type NextRequest, NextResponse } from "next/server"

const TMDB_API_KEY = "8265bd1679663a7ea12ac168da84d2e8"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")
  const page = searchParams.get("page") || "1"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-ES&page=${page}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("TMDB API error:", error)
    return NextResponse.json({ error: "Failed to search movies" }, { status: 500 })
  }
}
