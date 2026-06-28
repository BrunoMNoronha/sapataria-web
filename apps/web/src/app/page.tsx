export default function Home() {
  return (
    <main className="home">
      <div className="home__card">
        <span className="home__badge">Bootstrap técnico</span>
        <h1 className="home__title">Sistema Web da Sapataria</h1>
        <p className="home__subtitle">
          A aplicação está sendo configurada. Os módulos de negócio serão
          implementados nas próximas fases do projeto.
        </p>
        <div className="home__links">
          <a
            className="home__link"
            href={`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'}/health`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🏥 Verificar API Health Check →
          </a>
        </div>
      </div>
    </main>
  );
}
