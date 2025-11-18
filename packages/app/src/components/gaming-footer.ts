import { html, css, LitElement } from "lit";
import reset from "../styles/reset.css.js";

export class FooterElement extends LitElement {
  override render() {
    return html`
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h3>Gaming Hub</h3>
            <p>Your ultimate destination for exploring video games, consoles, and gaming culture.</p>
          </div>
          
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/app/games">Games</a></li>
              <li><a href="/app/consoles">Consoles</a></li>
              <li><a href="/app/genres">Genres</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>More</h4>
            <ul>
              <li><a href="/app/publishers">Publishers</a></li>
              <li><a href="/app/series">Series</a></li>
              <li><a href="/app/players">Players</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Connect</h4>
            <p class="social-text">Stay updated with the latest gaming news</p>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Gaming Hub. Built with ❤️ for gamers everywhere.</p>
        </div>
      </footer>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
        margin-top: auto;
      }
      
      footer {
        background: var(--color-background-header);
        border-top: 2px solid var(--color-border);
        margin-top: var(--space-xl);
        padding: var(--space-xl) var(--space-lg) var(--space-md);
        box-shadow: 0 -4px 6px -1px var(--color-shadow);
      }
      
      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.5fr;
        gap: var(--gap-xl);
        padding-bottom: var(--space-lg);
        border-bottom: 1px solid var(--color-border);
      }
      
      .footer-section h3 {
        color: var(--color-accent);
        font-family: var(--font-family-heading);
        font-size: 1.5rem;
        margin-bottom: var(--space-sm);
      }
      
      .footer-section h4 {
        color: var(--color-text);
        font-family: var(--font-family-heading);
        font-size: 1.1rem;
        margin-bottom: var(--space-sm);
      }
      
      .footer-section p {
        color: var(--color-text-muted);
        line-height: 1.6;
        margin: 0;
      }
      
      .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .footer-section li {
        margin-bottom: var(--space-xs);
      }
      
      .footer-section a {
        color: var(--color-text-muted);
        text-decoration: none;
        transition: color 0.3s ease;
        display: inline-flex;
        align-items: center;
      }
      
      .footer-section a:hover {
        color: var(--color-accent);
        transform: translateX(4px);
      }
      
      .footer-section a::before {
        content: '▸';
        margin-right: 0.5rem;
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
      }
      
      .footer-section a:hover::before {
        opacity: 1;
        transform: translateX(0);
      }
      
      .social-text {
        font-size: 0.95rem;
      }
      
      .footer-bottom {
        max-width: 1200px;
        margin: 0 auto;
        padding-top: var(--space-md);
        text-align: center;
      }
      
      .footer-bottom p {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        margin: 0;
      }
      
      @media (max-width: 1024px) {
        .footer-content {
          grid-template-columns: 1fr 1fr;
          gap: var(--gap-lg);
        }
      }
      
      @media (max-width: 640px) {
        .footer-content {
          grid-template-columns: 1fr;
          gap: var(--gap-md);
        }
        
        footer {
          padding: var(--space-lg) var(--space-md) var(--space-md);
        }
      }
    `
  ];
}

