import CastingVitrine from "./components/CastingVitrine";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent animate-in fade-in-0 slide-in-from-top-4 duration-700">
              Vitrine de Talentos
            </h1>
            <p
              className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-slate-600 px-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "200ms" }}
            >
              Descubra talentos incríveis para seu próximo projeto
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
        style={{ animationDelay: "300ms" }}
      >
        <CastingVitrine />
      </main>

      {/* Footer */}
      <footer
        className="bg-white/80 backdrop-blur-sm border-t border-slate-200 mt-12 sm:mt-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "400ms" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-slate-500">
            <p className="text-sm sm:text-base">
              © 2025 Vitrine de Talentos. Protótipo funcional para demonstração.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
