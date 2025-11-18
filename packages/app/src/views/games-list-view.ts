import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { Game } from "server/models";
import reset from "../styles/reset.css.js";
import { Msg } from "../messages";
import { Model } from "../model";

/**
 * This view shows a simple editable list of games from the API.
 * This is different from the main games-view.ts which shows a slideshow
 * and links to static detail pages.
 */
export class GamesListViewElement extends View<Model, Msg> {
  @state()
  get games(): Array<Game> {
    return this.model.games || [];
  }

  constructor() {
    super("gaming:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["games/request", {}]);
  }

  // Generate URL-safe slug from title for use in URLs
  generateSlug(title: string): string {
    return encodeURIComponent(title);
  }

  render() {
    return html`
      <main>
        <div class="page-header">
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"></use>
            </svg>
            <h1>Games Collection</h1>
          </div>
          <p class="tagline">✏️ Editable games from the database</p>
        </div>

        <section class="content-section">
          <h2>📝 API-Connected Games (Editable)</h2>
          <p class="info-text">
            These games are loaded from the MongoDB database via the API.
            Click "Edit" to modify their title, description, or href.
          </p>
          
          ${this.games.length > 0 ? html`
            <div class="games-grid">
              ${this.games.map((game) => {
                const gameSlug = this.generateSlug(game.title);
                return html`
                  <div class="game-card">
                    <div class="card-header">
                      <h3>${game.title}</h3>
                      <a 
                        href="/app/games-list/${gameSlug}/edit" 
                        class="edit-button"
                        title="Edit ${game.title}"
                      >
                        ✏️ Edit
                      </a>
                    </div>
                    <p class="description">${game.description}</p>
                    <div class="meta">
                      <span class="label">URL:</span>
                      <code>${game.href}</code>
                    </div>
                    ${game.imageUrl ? html`
                      <div class="meta">
                        <span class="label">Image:</span>
                        <code class="image-url">${game.imageUrl}</code>
                      </div>
                    ` : ''}
                  </div>
                `;
              })}
            </div>
          ` : html`
            <div class="loading">Loading games from API...</div>
          `}
        </section>

        <section class="info-section">
          <h2>ℹ️ About This View</h2>
          <div class="info-card">
            <h3>What's the difference?</h3>
            <ul>
              <li>
                <strong>Main Games Page:</strong> Shows a slideshow with links to 
                <em>static detail pages</em> (hardcoded data, not editable)
              </li>
              <li>
                <strong>This Page:</strong> Shows a simple list of 
                <em>API-connected games</em> (database data, fully editable via MVU)
              </li>
            </ul>
            <h3>What data is editable?</h3>
            <p>Each game in the API has these fields:</p>
            <ul>
              <li><code>title</code> - The game's name</li>
              <li><code>description</code> - A short description</li>
              <li><code>href</code> - A URL slug or link</li>
            </ul>
            <p>
              The detailed game pages (Zelda, Halo, etc.) use separate hardcoded data
              with features, platforms, release dates, etc. That data is not in the 
              database and cannot be edited via the MVU system yet.
            </p>
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
        padding: var(--space-lg);
      }
      
      .page-header {
        text-align: center;
        margin-bottom: var(--space-xl);
        max-width: 900px;
      }
      
      .next-to {
        display: flex;
        align-items: center;
        gap: var(--gap-md);
        justify-content: center;
        margin-bottom: var(--space-md);
      }
      
      .page-header .next-to .icon {
        width: 4rem;
        height: 4rem;
        fill: var(--color-accent);
        animation: pulse 2s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4));
        }
        50% {
          transform: scale(1.05);
          filter: drop-shadow(0 6px 12px rgba(59, 130, 246, 0.6));
        }
      }
      
      .page-header h1 {
        font-size: 2.5rem;
        margin: var(--space-md) 0;
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .tagline {
        font-size: 1.2rem;
        color: var(--color-text-muted);
        line-height: 1.6;
      }
      
      .content-section {
        width: 100%;
        max-width: 1200px;
        margin-bottom: var(--space-xl);
      }
      
      .content-section h2 {
        text-align: center;
        margin-bottom: var(--space-md);
        font-size: 2rem;
        color: var(--color-accent);
      }
      
      .info-text {
        text-align: center;
        color: var(--color-text-muted);
        margin-bottom: var(--space-xl);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: var(--gap-lg);
      }
      
      .game-card {
        background: var(--color-card-background);
        border: 2px solid var(--color-border);
        border-radius: 12px;
        padding: var(--space-lg);
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px var(--color-shadow);
      }
      
      .game-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px var(--color-shadow);
        border-color: var(--color-accent);
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-md);
        padding-bottom: var(--space-md);
        border-bottom: 2px solid var(--color-border);
      }
      
      .card-header h3 {
        margin: 0;
        color: var(--color-accent);
        font-size: 1.4rem;
      }
      
      .edit-button {
        padding: var(--space-sm) var(--space-md);
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
        border: 2px solid rgba(16, 185, 129, 0.3);
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        white-space: nowrap;
      }
      
      .edit-button:hover {
        background: rgba(16, 185, 129, 0.2);
        border-color: #10b981;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
      }
      
      .description {
        color: var(--color-text);
        line-height: 1.6;
        margin-bottom: var(--space-md);
      }
      
      .meta {
        display: flex;
        align-items: center;
        gap: var(--gap-sm);
        color: var(--color-text-muted);
        font-size: 0.9rem;
      }
      
      .meta .label {
        font-weight: 600;
        color: var(--color-accent);
      }
      
      .meta code {
        background: rgba(59, 130, 246, 0.1);
        padding: var(--space-xs) var(--space-sm);
        border-radius: 4px;
        font-family: 'Courier New', monospace;
      }
      
      .loading {
        text-align: center;
        padding: var(--space-xl);
        color: var(--color-text-muted);
        font-size: 1.2rem;
      }
      
      .info-section {
        width: 100%;
        max-width: 900px;
        margin-top: var(--space-xxl);
      }
      
      .info-section h2 {
        text-align: center;
        margin-bottom: var(--space-lg);
        font-size: 2rem;
        color: var(--color-accent);
      }
      
      .info-card {
        background: var(--color-card-background);
        border: 2px solid var(--color-border);
        border-radius: 12px;
        padding: var(--space-xl);
        box-shadow: 0 4px 6px var(--color-shadow);
      }
      
      .info-card h3 {
        color: var(--color-accent);
        margin-top: var(--space-lg);
        margin-bottom: var(--space-md);
        font-size: 1.3rem;
      }
      
      .info-card h3:first-child {
        margin-top: 0;
      }
      
      .info-card ul {
        margin: var(--space-md) 0;
        padding-left: var(--space-lg);
      }
      
      .info-card li {
        margin: var(--space-sm) 0;
        line-height: 1.6;
        color: var(--color-text);
      }
      
      .info-card p {
        line-height: 1.6;
        color: var(--color-text);
        margin: var(--space-md) 0;
      }
      
      .info-card code {
        background: rgba(59, 130, 246, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.95em;
      }
      
      @media (max-width: 768px) {
        .games-grid {
          grid-template-columns: 1fr;
        }
        
        .page-header h1 {
          font-size: 2rem;
        }
        
        .card-header {
          flex-direction: column;
          align-items: flex-start;
          gap: var(--gap-sm);
        }
      }
    `
  ];
}

