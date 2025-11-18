import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Game } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.js";

export class GameEditViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "game-id" })
  gameid?: string;

  @state()
  get game(): Game | undefined {
    return this.model.game;
  }

  constructor() {
    super("gaming:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "game-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      // Decode the URL-encoded game title
      const decodedGameId = decodeURIComponent(newValue);
      this.dispatchMessage([
        "game/request",
        { gameId: decodedGameId }
      ]);
    }
  }

  render() {
    if (!this.game) {
      return html`
        <main>
          <div class="page-header">
            <h1>Loading...</h1>
            <p>Please wait while we load the game data.</p>
          </div>
        </main>
        <gaming-footer></gaming-footer>
      `;
    }

    return html`
      <main>
        <div class="page-header">
          <a href="/app/games-list" class="back-link">← Back to List</a>
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"></use>
            </svg>
            <h1>Edit Game</h1>
          </div>
          <p class="tagline">Update game information from the database</p>
        </div>

        <section class="content-section">
          <div class="form-container">
            <mu-form
              .init=${this.game}
              @mu-form:submit=${this.handleSubmit}>
              <label>
                <span>Title</span>
                <input name="title" value="${this.game.title}" required />
              </label>
              <label>
                <span>Description</span>
                <textarea 
                  name="description" 
                  rows="4" 
                  required
                >${this.game.description}</textarea>
              </label>
              <label>
                <span>URL Slug</span>
                <input name="href" value="${this.game.href}" required />
              </label>
              <label>
                <span>Image URL</span>
                <input name="imageUrl" value="${this.game.imageUrl || ''}" placeholder="https://example.com/image.jpg" />
              </label>
              <div class="button-group">
                <button type="submit" class="submit-button">
                  💾 Save Changes
                </button>
                <a href="/app/games-list" class="cancel-button">
                  Cancel
                </a>
              </div>
            </mu-form>
          </div>
        </section>
      </main>
      <gaming-footer></gaming-footer>
    `;
  }

  handleSubmit(event: Form.SubmitEvent<Game>) {
    event.preventDefault();
    if (!this.gameid) return;

    // Decode the game ID for API call
    const decodedGameId = decodeURIComponent(this.gameid);

    this.dispatchMessage([
      "game/save",
      {
        gameId: decodedGameId,
        game: event.detail
      },
      {
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/games-list`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
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
      
      .back-link {
        display: inline-flex;
        align-items: center;
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        margin-bottom: var(--space-md);
        transition: all 0.3s ease;
        padding: var(--space-sm) var(--space-md);
        border-radius: 6px;
        background: rgba(59, 130, 246, 0.1);
      }
      
      .back-link:hover {
        background: rgba(59, 130, 246, 0.2);
        transform: translateX(-4px);
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
        max-width: 800px;
      }
      
      .form-container {
        background: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: var(--space-xl);
        box-shadow: 0 4px 6px -1px var(--color-shadow);
      }
      
      mu-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
      }
      
      label {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }
      
      label span {
        font-weight: 600;
        color: var(--color-accent);
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
      }
      
      input,
      textarea {
        padding: var(--space-md);
        border: 2px solid var(--color-border);
        border-radius: 8px;
        background: var(--color-background);
        color: var(--color-text);
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.3s ease;
      }
      
      input:focus,
      textarea:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      textarea {
        resize: vertical;
        min-height: 100px;
      }
      
      .button-group {
        display: flex;
        gap: var(--gap-md);
        margin-top: var(--space-md);
      }
      
      .submit-button {
        flex: 1;
        padding: var(--space-md) var(--space-xl);
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);
      }
      
      .submit-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px -1px rgba(59, 130, 246, 0.6);
      }
      
      .submit-button:active {
        transform: translateY(0);
      }
      
      .cancel-button {
        flex: 1;
        padding: var(--space-md) var(--space-xl);
        background: var(--color-card-background);
        color: var(--color-text);
        border: 2px solid var(--color-border);
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .cancel-button:hover {
        border-color: var(--color-accent);
        background: rgba(59, 130, 246, 0.1);
      }
      
      @media (max-width: 768px) {
        .page-header h1 {
          font-size: 2rem;
        }
        
        .button-group {
          flex-direction: column;
        }
      }
    `
  ];
}

