import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ movieId: string }> }) {
  const supabase = await createClient()
  const { movieId } = await params

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
      .eq("movie_id", Number.parseInt(movieId))
      .maybeSingle()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching user movie:", error)
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ movieId: string }> }) {
  const supabase = await createClient()
  const { movieId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { error } = await supabase
      .from("user_movies")
      .delete()
      .eq("user_id", user.id)
      .eq("movie_id", Number.parseInt(movieId))

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting movie:", error)
    return NextResponse.json({ error: "Failed to delete movie" }, { status: 500 })
  }
}
