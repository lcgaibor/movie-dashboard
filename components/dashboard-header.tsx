"use client"

import { Film, LogOut, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardHeaderProps {
  user: SupabaseUser
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 dark:border-white/10 light:border-border bg-black/20 dark:bg-black/20 light:bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-white dark:text-white light:text-foreground hover:text-blue-400 dark:hover:text-blue-400 light:hover:text-primary transition-colors">
          <Film className="h-8 w-8" />
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 dark:from-white dark:via-blue-100 dark:to-cyan-100 light:from-primary light:via-primary/80 light:to-primary bg-clip-text text-transparent">
            MovieLess
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost" className="text-white dark:text-white light:text-foreground hover:text-blue-400 dark:hover:text-blue-400 light:hover:text-primary hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-accent transition-all">
            <Link href="/dashboard">Descubrir</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white dark:text-white light:text-foreground hover:text-blue-400 dark:hover:text-blue-400 light:hover:text-primary hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-accent transition-all">
            <Link href="/dashboard/my-movies">Mi Colección</Link>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-white dark:text-white light:text-foreground hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-accent">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <DropdownMenuLabel className="text-foreground">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Mi Cuenta</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
