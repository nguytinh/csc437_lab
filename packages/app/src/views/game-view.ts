import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "../styles/reset.css.js";

export class GameViewElement extends LitElement {
  @property({ attribute: "game-id" })
  gameid?: string;

  render() {
    return html`
      <main>
        <div class="page-header">
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"></use>
            </svg>
            <h1>Game Details</h1>
          </div>
          <p>Viewing game: ${this.gameid}</p>
        </div>

        <section class="content-section">
          <h2>Game Information</h2>
          <p>Detailed game view for game ID: ${this.gameid}</p>
          <p>This is a placeholder. Individual game details will be implemented later.</p>
        </section>
      </main>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
    `
  ];
}

