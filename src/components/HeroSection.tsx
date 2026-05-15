export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6"
    >
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Building Digital <br />
          <span className="text-gradient">Experiences</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Desenvolvedor apaixonado por criar aplicações web modernas, responsivas e
          escaláveis. Explore meus projetos recentes e assine minha newsletter.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transform hover:-translate-y-1"
          >
            Ver Projetos
          </a>
          <a
            href="#newsletter"
            className="px-8 py-3 rounded-full glass hover:bg-white/10 text-white font-semibold transition-all transform hover:-translate-y-1"
          >
            Assinar Newsletter
          </a>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}
