import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Film } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-primary">
            <Film className="h-10 w-10" />
            <h1 className="text-3xl font-bold text-foreground">MovieLess</h1>
          </div>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Revisa tu correo</CardTitle>
            <CardDescription>Te hemos enviado un enlace de confirmación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Por favor revisa tu correo electrónico y haz clic en el enlace de confirmación para activar tu cuenta. Una
              vez confirmada, podrás iniciar sesión y comenzar a construir tu colección de películas.
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/auth/login">Volver a iniciar sesión</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
