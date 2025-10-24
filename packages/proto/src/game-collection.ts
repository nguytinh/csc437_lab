import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.js";

interface Game {
  title: string;
  description: string;
  href: string;
}

type GameData = {
  games: Array<Game>;
};

export class GameCollectionElement extends LitElement {
  @property()
  src?: string;

  @state()
  games: Array<Game> = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  hydrate(src: string) {
    fetch(src)
      .then(res => res.json())
      .then((json: object) => {
        if (json) {
          const gameData = json as GameData;
          this.games = gameData.games;
        }
      })
      .catch(error => {
        console.error('Failed to load game data:', error);
      });
  }

  renderGame(game: Game) {
    return html`
      <game-card href="${game.href}">
        <span slot="title">${game.title}</span>
        <span slot="description">${game.description}</span>
      </game-card>
    `;
  }

  override render() {
    return html`
      <section class="content-section">
        <h2>Our Game Collection:</h2>
        <div class="card-grid three-col">
          ${this.games.map(game => this.renderGame(game))}
        </div>
      </section>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
      }
      
      .content-section {
        margin: var(--space-lg) 0;
      }
      
      .content-section h2 {
        font-family: var(--font-family-heading);
        font-size: var(--font-size-subheading);
        color: var(--color-text);
        margin: var(--space-lg) 0 var(--space-md) 0;
      }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--gap-md);
        grid-column: 1 / -1;
      }
      
      .card-grid.three-col {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
      
      @media (max-width: 768px) {
        .card-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}
