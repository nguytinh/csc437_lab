import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
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

  _authObserver = new Observer<Auth.Model>(this, "gaming:auth");
  _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.src) this.hydrate(this.src);
    });
  }

  get authorization() {
    if (this._user?.authenticated) {
      return {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    }
    return undefined;
  }

  hydrate(src: string) {
    fetch(src, { headers: this.authorization })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json: object) => {
        if (json) {
          // API returns array directly, or object with games property
          if (Array.isArray(json)) {
            this.games = json as Game[];
          } else {
            const gameData = json as GameData;
            this.games = gameData.games || [];
          }
        }
      })
      .catch(error => {
        console.error('Failed to load game data:', error);
      });
  }

  renderGame(game: Game) {
    // Ensure href is set - use title to generate href if missing or empty
    const href = (game.href && game.href.trim()) ? game.href : this.generateHref(game.title);
    return html`
      <game-card href="${href}">
        <span slot="title">${game.title}</span>
        <span slot="description">${game.description}</span>
      </game-card>
    `;
  }

  generateHref(title: string): string {
    // Map known game titles to their corresponding HTML files
    // Handle various title formats that might appear
    const normalizedTitle = title.toLowerCase().trim();
    
    // Check for Zelda variations
    if (normalizedTitle.includes('zelda') && (normalizedTitle.includes('botw') || normalizedTitle.includes('breath'))) {
      return 'zelda-botw.html';
    }
    
    // Check for Halo Infinite
    if (normalizedTitle.includes('halo infinite')) {
      return 'halo-infinite.html';
    }
    
    // Check for FIFA 24
    if (normalizedTitle.includes('fifa') && normalizedTitle.includes('24')) {
      return 'fifa-24.html';
    }
    
    // Check for Super Mario Odyssey
    if (normalizedTitle.includes('mario odyssey') || normalizedTitle.includes('super mario odyssey')) {
      return 'mario-odyssey.html';
    }
    
    // Check for Animal Crossing
    if (normalizedTitle.includes('animal crossing')) {
      return 'animal-crossing.html';
    }

    // Fallback: Convert title to kebab-case for href
    // Handle special cases by removing common prefixes
    let href = title
      .toLowerCase()
      .replace(/^the legend of /gi, '')
      .replace(/^super /gi, '')
      .replace(/breath of the wild/gi, 'botw')
      .replace(/new horizons/gi, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '.html';

    return href;
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
        width: 100%;
        grid-column: 1 / -1;
        max-width: 100%;
      }
      
      .content-section {
        margin: var(--space-lg) 0;
        width: 100%;
        max-width: 100%;
      }
      
      .content-section h2 {
        font-family: var(--font-family-heading);
        font-size: var(--font-size-subheading);
        color: var(--color-text);
        margin: var(--space-lg) 0 var(--space-md) 0;
      }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--gap-md);
        width: 100%;
        grid-auto-flow: row;
      }
      
      .card-grid.three-col {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
      
      @media (min-width: 1000px) {
        .card-grid.three-col {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (min-width: 700px) and (max-width: 999px) {
        .card-grid.three-col {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 699px) {
        .card-grid,
        .card-grid.three-col {
          grid-template-columns: 1fr;
        }
      }
    `
  ];
}

