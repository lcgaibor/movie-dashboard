import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data, error } = await supabase
      .from("user_movies")
      .select("*")
      .eq("user_id", user.id)
      .order("added_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching user movies:", error)
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { movie_id, movie_title, movie_poster, movie_overview, movie_release_date, movie_vote_average } = body

    const { data, error } = await supabase
      .from("user_movies")
      .insert({
        user_id: user.id,
        movie_id,
        movie_title,
        movie_poster,
        movie_overview,
        movie_release_date,
        movie_vote_average,
        is_favorite: false,
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "Movie already in your list" }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error adding movie:", error)
    return NextResponse.json({ error: "Failed to add movie" }, { status: 500 })
  }
}
