Una aplicación web de dashboard de películas construida con Next.js, Supabase y Tailwind CSS. Permite a los usuarios descubrir, guardar y organizar sus películas favoritas.

## ⚠️ Estado del Proyecto

**IMPORTANTE:** La integración con Supabase está actualmente en pausa. Para probar las funcionalidades, puedes usar las credenciales de usuario de prueba que se proporcionan más abajo.

## ✨ Características

- 🔐 **Autenticación completa** con Supabase Auth (en pausa)
- 🎭 **Descubrimiento de películas** usando la API de TMDB
- ⭐ **Sistema de favoritos** para marcar películas favoritas
- 📱 **Diseño responsive** que funciona en todos los dispositivos
- 🎨 **UI moderna** con componentes de Radix UI y Tailwind CSS
- 🚀 **Next.js 15** con App Router para un rendimiento óptimo
- 💾 **Base de datos PostgreSQL** con Supabase (en pausa)

## 🛠️ Tecnologías

- **Frontend:** Next.js 15, React 19, TypeScript
- **Backend:** Supabase (Auth + Database) - EN PAUSA
- **Styling:** Tailwind CSS, Radix UI
- **APIs:** TMDB (The Movie Database)
- **Deployment:** Vercel (recomendado)

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- Una cuenta en [TMDB](https://www.themoviedb.org) (opcional, para datos reales)

### 1. Clona el repositorio

```bash
git clone https://github.com/lcgaibor/movie-dashboard.git
cd movie-dashboard
```
2. Instala dependencias
```bash
pnpm install
```
# o
```bash
npm install
```
3. Configura TMDB (Opcional)
Si quieres datos reales de películas, obtén una API key de TMDB:
```bash
TMDB_API_KEY=tu_tmdb_api_key
```
4. Ejecuta el proyecto
```bash
pnpm dev
```
# o
```bash
npm run dev
```
La aplicación estará disponible en http://localhost:3000

👤 Usuario de Prueba
Para probar las funcionalidades sin Supabase, puedes usar estas credenciales de prueba:
```bash
Email: test@example.com
Contraseña: test123456
Nota: Este usuario es solo para demostración y no se conecta a una base de datos real.
```
📁 Estructura del Proyecto
movie-dashboard/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticación
│   ├── dashboard/         # Dashboard principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI reutilizables
│   └── ...               # Componentes específicos
├── lib/                  # Utilidades y configuraciones
│   └── supabase/         # Cliente de Supabase (en pausa)
├── scripts/              # Scripts de base de datos
└── public/               # Archivos estáticos
🎯 Funcionalidades
Para Usuarios No Registrados
Ver la página de inicio con información de la app
Navegar por películas populares
Ver detalles de películas
Para Usuarios Registrados
Todo lo anterior, más:
Guardar películas en su colección personal
Marcar/desmarcar películas como favoritas
Filtrar películas por género
Buscar películas por título
Gestionar su perfil
🔧 Scripts Disponibles
# Desarrollo
```bash
pnpm dev          # Inicia servidor de desarrollo
pnpm build        # Construye para producción
pnpm start        # Inicia servidor de producción
pnpm lint         # Ejecuta ESLint

```
🚀 Despliegue
Vercel (Recomendado)
Conecta tu repositorio de GitHub a Vercel
Agrega las variables de entorno en Vercel
Despliega automáticamente
Otros Proveedores
Asegúrate de configurar las variables de entorno y ejecutar pnpm build antes del despliegue.


Hecho con ❤️ por lcgaibor" 

