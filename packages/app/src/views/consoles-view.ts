import { css, html, LitElement } from "lit";
import reset from "../styles/reset.css.js";

export class ConsolesViewElement extends LitElement {
  render() {
    return html`
      <main>
        <div class="page-header">
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#console"></use>
            </svg>
            <h1>Consoles</h1>
          </div>
          <p>Dedicated gaming hardware platforms that run games.</p>
        </div>

        <section class="content-section">
          <h2>Our Console Collection:</h2>
          <div class="card-grid">
            <a href="/app/consoles/nintendo-switch" class="card console-card">
              <div class="card-header">
                <h3 class="card-title">Nintendo Switch</h3>
                <span class="arrow">→</span>
              </div>
              <div class="card-content">
                <p>Hybrid console for home and portable gaming with innovative Joy-Con controllers</p>
                <div class="tags">
                  <span class="tag">Hybrid</span>
                  <span class="tag">Nintendo</span>
                </div>
              </div>
            </a>

            <a href="/app/consoles/ps5" class="card console-card">
              <div class="card-header">
                <h3 class="card-title">PlayStation 5</h3>
                <span class="arrow">→</span>
              </div>
              <div class="card-content">
                <p>Next-gen powerhouse with ultra-fast SSD, 4K gaming, and DualSense haptic feedback</p>
                <div class="tags">
                  <span class="tag">Home Console</span>
                  <span class="tag">Sony</span>
                </div>
              </div>
            </a>

            <a href="/app/consoles/xbox-series-x" class="card console-card">
              <div class="card-header">
                <h3 class="card-title">Xbox Series X</h3>
                <span class="arrow">→</span>
              </div>
              <div class="card-content">
                <p>Most powerful console with 12 teraflops, Game Pass integration, and backwards compatibility</p>
                <div class="tags">
                  <span class="tag">Home Console</span>
                  <span class="tag">Microsoft</span>
                </div>
              </div>
            </a>

            <a href="/app/consoles/steam-deck" class="card console-card">
              <div class="card-header">
                <h3 class="card-title">Steam Deck</h3>
                <span class="arrow">→</span>
              </div>
              <div class="card-content">
                <p>Portable PC gaming device with access to your entire Steam library on the go</p>
                <div class="tags">
                  <span class="tag">Handheld PC</span>
                  <span class="tag">Valve</span>
                </div>
              </div>
            </a>

            <a href="/app/consoles/nintendo-switch-lite" class="card console-card">
              <div class="card-header">
                <h3 class="card-title">Nintendo Switch Lite</h3>
                <span class="arrow">→</span>
              </div>
              <div class="card-content">
                <p>Compact, portable-only version of Nintendo Switch designed for handheld gaming</p>
                <div class="tags">
                  <span class="tag">Handheld</span>
                  <span class="tag">Nintendo</span>
                </div>
              </div>
            </a>
          </div>
        </section>

        <section class="relationships">
          <h2>🎮 Console Connections</h2>
          <ul>
            <li>
              <a href="/app/games">Games</a>
              <span class="relationship-type">run on</span>
              <span class="entity">Consoles</span>
            </li>
            <li>
              <a href="/app/players">Players</a>
              <span class="relationship-type">own</span>
              <span class="entity">Consoles</span>
            </li>
          </ul>
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
        padding: var(--space-xl) var(--space-lg);
        min-height: calc(100vh - 200px);
      }
      
      .next-to {
        display: flex;
        align-items: center;
        gap: var(--gap-md);
      }
      
      .page-header {
        text-align: center;
        margin-bottom: var(--space-xl);
        max-width: 800px;
      }
      
      .page-header .next-to {
        justify-content: center;
      }
      
      .page-header .next-to .icon {
        width: 4rem;
        height: 4rem;
        fill: var(--color-accent);
        filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4));
      }
      
      .page-header h1 {
        font-size: 3rem;
        margin: var(--space-md) 0;
        background: linear-gradient(135deg, #ffffff 0%, var(--color-accent-light) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 800;
        letter-spacing: -1px;
      }
      
      .page-header p {
        font-size: 1.2rem;
        color: var(--color-text-muted);
        font-weight: 300;
      }
      
      .content-section {
        width: 100%;
        max-width: 1200px;
        margin-bottom: var(--space-xl);
      }
      
      .content-section h2 {
        text-align: center;
        margin-bottom: var(--space-lg);
        font-size: 2rem;
        color: var(--color-text);
        font-weight: 700;
      }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: var(--gap-lg);
        width: 100%;
      }
      
      .card {
        background: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--space-lg);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        position: relative;
        overflow: hidden;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-color: var(--color-accent);
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-md);
        padding-bottom: var(--space-md);
        border-bottom: 1px solid var(--color-border);
      }
      
      .card-title {
        font-family: var(--font-family);
        font-size: 1.5rem;
        margin: 0;
        color: var(--color-text);
        font-weight: 700;
      }
      
      .arrow {
        color: var(--color-accent);
        font-size: 1.5rem;
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
      }
      
      .card:hover .arrow {
        opacity: 1;
        transform: translateX(0);
      }
      
      .card-content {
        color: var(--color-text);
        line-height: 1.6;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      
      .card-content p {
        margin-bottom: var(--space-md);
        color: var(--color-text-muted);
        font-size: 1.05rem;
      }

      .tags {
        display: flex;
        gap: var(--space-sm);
        flex-wrap: wrap;
        margin-top: auto;
      }

      .tag {
        background: rgba(59, 130, 246, 0.1);
        color: var(--color-accent-light);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        border: 1px solid rgba(59, 130, 246, 0.2);
      }
      
      .relationships {
        width: 100%;
        max-width: 1200px;
        background: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--space-xl);
        margin-top: var(--space-xl);
        position: relative;
        overflow: hidden;
      }
      
      .relationships::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
      }
      
      .relationships h2 {
        margin-top: 0;
        text-align: center;
        margin-bottom: var(--space-lg);
        font-size: 1.8rem;
        color: var(--color-text);
      }
      
      .relationships ul {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--gap-md);
      }
      
      .relationships li {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--gap-sm);
        padding: var(--space-lg);
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        transition: all 0.3s ease;
        text-align: center;
      }
      
      .relationships li:hover {
        transform: translateY(-4px);
        border-color: var(--color-accent);
        background: rgba(255, 255, 255, 0.06);
      }
      
      .relationships .entity {
        font-weight: 600;
        color: var(--color-text-muted);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .relationships .relationship-type {
        color: var(--color-accent);
        font-size: 0.8rem;
        padding: 2px 8px;
        background: rgba(59, 130, 246, 0.1);
        border-radius: 4px;
      }
      
      .relationships a {
        color: var(--color-text);
        text-decoration: none;
        font-weight: 700;
        font-size: 1.2rem;
        transition: color 0.3s ease;
      }
      
      .relationships a:hover {
        color: var(--color-accent);
      }
      
      @media (max-width: 768px) {
        .card-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}
