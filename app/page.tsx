
import IntroScene from "@/components/IntroScene";

export default function Home() {
  return (
    <main className="game-shell">
      <IntroScene />

      <div className="noise-overlay" aria-hidden="true" />

      <div className="game-ui">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">A</div>

            <div>
              <div className="brand-name">ASTROTERRAX</div>
              <div className="brand-subtitle">Beyond the unknown</div>
            </div>
          </div>

          <div className="system-status">
            <span className="status-dot" />
            SYSTEM ONLINE
          </div>
        </header>

        <section className="hero-content">
          <div className="eyebrow">Uma nova fronteira começa</div>

          <h1 className="hero-title">
            O
            <span>DESPERTAR</span>
          </h1>

          <p className="hero-description">
            Você acordou em um mundo que não reconhece.
            Sua nave está destruída. Sua jornada está apenas começando.
          </p>

          <button
            className="start-button"
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("astroterrax:start"));
            }}
          >
            INICIAR EXPEDIÇÃO
            <span className="button-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </section>

        <footer className="bottom-bar">
          <div className="coordinates">
            <span>LOCALIZAÇÃO DESCONHECIDA</span>
            <strong>PLANETA // SETOR 001</strong>
          </div>

          <div className="scene-label">
            ASTROTERRAX © 2026
            <br />
            EXPEDIÇÃO ZERO
          </div>
        </footer>
      </div>
    </main>
  );
}
