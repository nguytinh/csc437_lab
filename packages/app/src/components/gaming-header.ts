import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Events } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import reset from "../styles/reset.css.js";

export class HeaderElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "gaming:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = (user as Auth.AuthenticatedUser).username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }
  
  handleDarkModeToggle(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.type === 'checkbox') {
      const isLightMode = target.checked;
      if (isLightMode) {
        document.body.classList.add('light-mode');
        localStorage.setItem('dark-mode-preference', 'light');
      } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('dark-mode-preference', 'dark');
      }
    }
  }
  
  override firstUpdated() {
    // Restore saved preference on first render
    const checkbox = this.shadowRoot?.querySelector('.dark-mode-switch input[type="checkbox"]') as HTMLInputElement;
    if (checkbox) {
      const savedMode = localStorage.getItem('dark-mode-preference');
      if (savedMode === 'light') {
        document.body.classList.add('light-mode');
        checkbox.checked = true;
      }
    }
  }

  override render() {
    return html`
      <header>
        <a href="/app" class="header-brand">
          <svg class="icon">
            <use href="/icons/gaming.svg#game"/>
          </svg>
          Gaming Hub
        </a>
        
        <nav>
          <a href="/app/games">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"/>
            </svg>
            <span>Games</span>
          </a>
          <a href="/app/games-list">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"/>
            </svg>
            <span>Edit Games</span>
          </a>
          <a href="/app/consoles">
            <svg class="icon"><use href="/icons/gaming.svg#console" /></svg>
            <span>Consoles</span>
          </a>
          <a href="/app/genres">
            <svg class="icon"><use href="/icons/gaming.svg#genre" /></svg>
            <span>Genres</span>
          </a>
          <a href="/app/publishers">
            <svg class="icon"><use href="/icons/gaming.svg#publisher" /></svg>
            <span>Publishers</span>
          </a>
          <a href="/app/series">
            <svg class="icon"><use href="/icons/gaming.svg#series" /></svg>
            <span>Series</span>
          </a>
          <a href="/app/players">
            <svg class="icon"><use href="/icons/gaming.svg#player" /></svg>
            <span>Players</span>
          </a>
        </nav>
        
        <label class="dark-mode-switch">
          <input type="checkbox" autocomplete="off" @change=${this.handleDarkModeToggle} />
          <span class="toggle-slider">
            <svg class="toggle-icon moon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"/>
            </svg>
            <svg class="toggle-icon sun" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="currentColor"/>
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
        </label>
        
        <div class="user-info">
          ${this.loggedIn ? html`
            <span class="user-name">Hello, ${this.userid || "gamer"}</span>
            <div class="user-avatar">${this.userid ? this.userid.charAt(0).toUpperCase() : "G"}</div>
            ${this.renderSignOutButton()}
          ` : html`
            ${this.renderSignInButton()}
          `}
        </div>
      </header>
    `;
  }

  renderSignOutButton() {
    return html`
      <button
        class="sign-out-btn"
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`
      <a href="/login.html" class="sign-in-link">
        Sign In…
      </a>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
      }
      
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--gap-lg);
        background-color: var(--color-background-header);
        padding: var(--space-lg) var(--space-xl);
        border-bottom: 2px solid var(--color-border);
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: 0 2px 8px var(--color-shadow);
      }
      
      .header-brand {
        display: flex;
        align-items: center;
        gap: var(--gap-sm);
        text-decoration: none;
        color: var(--color-text-header);
        font-family: var(--font-family-heading);
        font-size: 1.5rem;
        font-weight: bold;
        white-space: nowrap;
      }
      
      .header-brand .icon {
        width: 2.5rem;
        height: 2.5rem;
        fill: var(--color-accent);
        filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
      }
      
      nav {
        display: flex;
        gap: var(--gap-sm);
        flex: 1;
        justify-content: center;
        border: none;
        margin: 0;
        padding: 0;
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
      }
      
      nav::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
      }
      
      nav a {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 10px;
        border-radius: 4px;
        transition: background-color 0.2s;
        white-space: nowrap;
        font-size: 0.9rem;
        color: var(--color-link);
        text-decoration: none;
      }
      
      nav a:hover {
        background-color: rgba(255, 255, 255, 0.1);
        text-decoration: none;
        color: var(--color-link-hover);
      }
      
      nav .icon {
        width: 1rem;
        height: 1rem;
        fill: var(--color-text);
        stroke: var(--color-text);
      }
      
      .user-info {
        display: flex;
        align-items: center;
        gap: var(--gap-sm);
        white-space: nowrap;
      }
      
      .user-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: var(--color-accent);
        color: var(--color-background-page);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1rem;
      }
      
      .user-name {
        color: var(--color-text);
        font-size: 0.9rem;
      }
      
      .sign-out-btn {
        padding: var(--space-xs) var(--space-sm);
        background-color: transparent;
        border: 1px solid var(--color-border);
        border-radius: 4px;
        color: var(--color-text);
        cursor: pointer;
        font-size: 0.9rem;
      }
      
      .sign-out-btn:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .sign-in-link {
        color: var(--color-link);
        text-decoration: none;
        font-size: 0.9rem;
      }
      
      .sign-in-link:hover {
        text-decoration: underline;
      }
      
      .dark-mode-switch {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        user-select: none;
      }
      .dark-mode-switch input[type="checkbox"] {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
      }
      .toggle-slider {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60px;
        height: 30px;
        background-color: var(--color-background-content);
        border: 2px solid var(--color-border);
        border-radius: 30px;
        padding: 0 6px;
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }
      .toggle-slider::before {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        background-color: var(--color-accent);
        border-radius: 50%;
        left: 3px;
        transition: transform 0.3s ease, background-color 0.3s ease;
        z-index: 2;
      }
      .dark-mode-switch input[type="checkbox"]:checked + .toggle-slider::before {
        transform: translateX(30px);
        background-color: #f59e0b;
      }
      .dark-mode-switch input[type="checkbox"]:checked + .toggle-slider {
        background-color: #dbeafe;
        border-color: #3b82f6;
      }
      .toggle-icon {
        position: relative;
        z-index: 1;
        transition: color 0.3s ease, opacity 0.3s ease;
        flex-shrink: 0;
      }
      .toggle-icon.moon {
        color: #fbbf24;
      }
      .toggle-icon.sun {
        color: #64748b;
      }
      .dark-mode-switch input[type="checkbox"]:checked ~ .toggle-slider .moon {
        color: #94a3b8;
      }
      .dark-mode-switch input[type="checkbox"]:checked ~ .toggle-slider .sun {
        color: #f59e0b;
      }
      
      @media (max-width: 768px) {
        header {
          flex-wrap: wrap;
          padding: var(--space-md) var(--space-lg);
        }
        
        .header-brand {
          font-size: 1.25rem;
        }
        
        nav {
          order: 3;
          flex-basis: 100%;
          justify-content: flex-start;
        }
        
        nav a span {
          display: none;
        }
        
        .user-name {
          display: none;
        }
      }
    `
  ];
}

