"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("light")
    } else {
      // If system, set to light
      setTheme("light")
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-blue-400 hover:bg-white/10 transition-all">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full text-white hover:text-blue-400 hover:bg-white/10 transition-all">
      <Sun className={`h-5 w-5 transition-all ${theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
      <Moon className={`absolute h-5 w-5 transition-all ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
