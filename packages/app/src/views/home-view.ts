import { css, html, LitElement } from "lit";
import reset from "../styles/reset.css.js";

export class HomeViewElement extends LitElement {
  render() {
    return html`
      <main>
        <div class="page-header">
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"></use>
            </svg>
            <h1>Welcome to Gaming Hub</h1>
          </div>
          <p>Your ultimate destination for exploring video games, consoles, genres, and more!</p>
        </div>

        <section class="content-section hero">
          <h2>Explore Our Collections</h2>
          <div class="card-grid">
            <a href="/app/games" class="feature-card">
              <svg class="icon">
                <use href="/icons/gaming.svg#game"></use>
              </svg>
              <h3>Games</h3>
              <p>Browse our extensive collection of video games</p>
            </a>
            <a href="/app/consoles" class="feature-card">
              <svg class="icon">
                <use href="/icons/gaming.svg#console"></use>
              </svg>
              <h3>Consoles</h3>
              <p>Discover gaming platforms and hardware</p>
            </a>
            <a href="/app/genres" class="feature-card">
              <svg class="icon">
                <use href="/icons/gaming.svg#genre"></use>
              </svg>
              <h3>Genres</h3>
              <p>Explore different game categories</p>
            </a>
            <a href="/app/publishers" class="feature-card">
              <svg class="icon">
                <use href="/icons/gaming.svg#publisher"></use>
              </svg>
              <h3>Publishers</h3>
              <p>Learn about game publishers</p>
            </a>
            <a href="/app/series" class="feature-card">
              <svg class="icon">
                <use href="/icons/gaming.svg#series"></use>
              </svg>
              <h3>Series</h3>
              <p>View game franchises and series</p>
            </a>
            <a href="/app/players" class="feature-card">
              <svg class="icon">
                <use href="/icons/gaming.svg#player"></use>
              </svg>
              <h3>Players</h3>
              <p>Meet the gaming community</p>
            </a>
          </div>
        </section>
      </main>
      <gaming-footer></gaming-footer>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      
      main {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .page-header {
        text-align: center;
        margin-bottom: var(--space-xl);
      }
      
      .page-header .next-to {
        justify-content: center;
      }
      
      .page-header .next-to .icon {
        width: 5rem;
        height: 5rem;
        fill: var(--color-accent);
        animation: float 3s ease-in-out infinite;
        filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4));
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      .page-header h1 {
        font-size: 2.5rem;
        margin: var(--space-md) 0;
      }
      
      .page-header p {
        font-size: 1.1rem;
        color: var(--color-text-muted);
      }
      
      .hero {
        text-align: center;
        width: 100%;
        max-width: 1200px;
      }
      
      .hero h2 {
        margin-bottom: var(--space-lg);
        font-size: 1.8rem;
      }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--gap-md);
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .feature-card {
        background: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: var(--space-lg);
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--gap-sm);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px -1px var(--color-shadow);
        position: relative;
        overflow: hidden;
      }
      
      .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }
      
      .feature-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 25px -5px var(--color-shadow);
        background: var(--color-card-background-hover);
      }
      
      .feature-card:hover::before {
        transform: scaleX(1);
      }
      
      .feature-card .icon {
        width: 3.5rem;
        height: 3.5rem;
        fill: var(--color-accent);
        stroke: var(--color-accent);
        transition: transform 0.3s ease;
        filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
      }
      
      .feature-card:hover .icon {
        transform: scale(1.1) rotate(5deg);
      }
      
      .feature-card h3 {
        font-family: var(--font-family-heading);
        font-size: var(--font-size-subheading);
        color: var(--color-text);
        margin: 0;
      }
      
      .feature-card p {
        color: var(--color-text-muted);
        margin: 0;
      }
      
      @media (max-width: 768px) {
        .card-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}

