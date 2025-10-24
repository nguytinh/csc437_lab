import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.js";

export class GameCardElement extends LitElement {
  @property({ attribute: "href" })
  href?: string;

  override render() {
    return html`
      <a href="${this.href}" class="card game-card">
        <div class="card-header">
          <svg class="icon">
            <use href="/icons/gaming.svg#game"/>
          </svg>
          <h3 class="card-title">
            <slot name="title">Default Title</slot>
          </h3>
        </div>
        <div class="card-content">
          <p>
            <slot name="description">Default description</slot>
          </p>
        </div>
      </a>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      
      .card {
        background-color: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: var(--padding-card);
        transition: transform 0.2s, box-shadow 0.2s;
        text-decoration: none;
        color: inherit;
        display: block;
      }
      
      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      
      .card-header {
        display: flex;
        align-items: center;
        gap: var(--gap-sm);
        margin-bottom: var(--space-sm);
        padding-bottom: var(--space-sm);
        border-bottom: 1px solid var(--color-border);
      }
      
      .card-header .icon {
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
        fill: currentColor;
        stroke: currentColor;
      }
      
      .card-title {
        font-family: var(--font-family-heading);
        font-size: var(--font-size-subheading);
        margin: 0;
        color: var(--color-text);
      }
      
      .card-content {
        color: var(--color-text-muted);
        line-height: 1.6;
      }
      
      .card-content p {
        margin: var(--space-sm) 0;
      }
    `
  ];
}
