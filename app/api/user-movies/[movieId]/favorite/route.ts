import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: Promise<{ movieId: string }> }) {
  const supabase = await createClient()
  const { movieId } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { is_favorite } = body

    const { data, error } = await supabase
      .from("user_movies")
      .update({ is_favorite })
      .eq("user_id", user.id)
      .eq("movie_id", Number.parseInt(movieId))
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating favorite:", error)
    return NextResponse.json({ error: "Failed to update favorite" }, { status: 500 })
  }
}
