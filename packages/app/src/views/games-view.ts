import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import reset from "../styles/reset.css.js";

interface Game {
  title: string;
  description: string;
  href?: string;
  _id?: string;
}

type GameData = {
  games: Array<Game>;
};

export class GamesViewElement extends LitElement {
  @state()
  games: Array<Game> = [];

  @state()
  currentSlide: number = 0;

  private slideInterval?: number;

  _authObserver = new Observer<Auth.Model>(this, "gaming:auth");
  _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      this.hydrate("/api/games");
    });
    this.startSlideshow();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopSlideshow();
  }

  startSlideshow() {
    this.slideInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    if (this.games.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.games.length;
    }
  }

  previousSlide() {
    if (this.games.length > 0) {
      this.currentSlide = this.currentSlide === 0 ? this.games.length - 1 : this.currentSlide - 1;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Restart the slideshow timer
    this.stopSlideshow();
    this.startSlideshow();
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

  getGameImage(title: string): string {
    const imageMap: { [key: string]: string } = {
      "Zelda: BOTW": "https://northernmysticmedia.com/wp-content/uploads/2024/08/LoZ-BotW-Link-Zelda-v3-Thumbnail.jpg",
      "Halo Infinite": "https://wpassets.halowaypoint.com/wp-content/2021/12/HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg",
      "FIFA 24": "https://img-eshop.cdn.nintendo.net/i/bd653d83bdcc1613cfacae62845933633ce97fffc52e7e4070014eb41f9e75f7.jpg",
      "Super Mario Odyssey": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5",
      "Animal Crossing": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a"
    };
    return imageMap[title] || "";
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  render() {
    const gameIdMap: { [key: string]: string } = {
      "Zelda: BOTW": "zelda-botw",
      "Halo Infinite": "halo-infinite",
      "FIFA 24": "fifa-24",
      "Super Mario Odyssey": "mario-odyssey",
      "Animal Crossing": "animal-crossing"
    };

    return html`
      <main>
        <div class="page-header">
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"></use>
            </svg>
            <h1>Games</h1>
          </div>
          <p>Individual software titles designed for entertainment, featuring interactive gameplay, graphics, and stories.</p>
        </div>

        <section class="content-section">
          <h2>🎮 Featured Game Collection</h2>
          
          ${this.games.length > 0 ? html`
            <div class="slideshow-container">
              <div class="slideshow-wrapper">
                ${this.games.map((game, index) => {
                  const gameId = gameIdMap[game.title] || this.generateSlug(game.title);
                  const href = `/app/games/${gameId}`;
                  const imageUrl = this.getGameImage(game.title);
                  return html`
                    <a 
                      href="${href}" 
                      class="slide ${index === this.currentSlide ? 'active' : ''}"
                      style="background-image: url('${imageUrl}')"
                    >
                      <div class="slide-overlay"></div>
                      <div class="slide-content">
                        <h3 class="slide-title">${game.title}</h3>
                        <p class="slide-description">${game.description}</p>
                        <span class="slide-cta">View Details →</span>
                      </div>
                    </a>
                  `;
                })}
              </div>

              <!-- Navigation Arrows -->
              <button 
                class="slide-nav prev" 
                @click=${() => { this.previousSlide(); }}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button 
                class="slide-nav next" 
                @click=${() => { this.nextSlide(); }}
                aria-label="Next slide"
              >
                ›
              </button>

              <!-- Dots -->
              <div class="slide-dots">
                ${this.games.map((_, index) => html`
                  <button 
                    class="dot ${index === this.currentSlide ? 'active' : ''}"
                    @click=${() => { this.goToSlide(index); }}
                    aria-label="Go to slide ${index + 1}"
                  ></button>
                `)}
              </div>
            </div>
          ` : html`
            <div class="loading">Loading games...</div>
          `}
        </section>

        <section class="relationships">
          <h2>🎮 How Games Connect</h2>
          <ul>
            <li>
              <span class="entity">Games</span>
              <span class="relationship-type">run on</span>
              <a href="/app/consoles">Consoles</a>
            </li>
            <li>
              <span class="entity">Games</span>
              <span class="relationship-type">belong to</span>
              <a href="/app/genres">Genres</a>
            </li>
            <li>
              <span class="entity">Games</span>
              <span class="relationship-type">published by</span>
              <a href="/app/publishers">Publishers</a>
            </li>
            <li>
              <span class="entity">Games</span>
              <span class="relationship-type">part of</span>
              <a href="/app/series">Series</a>
            </li>
            <li>
              <a href="/app/players">Players</a>
              <span class="relationship-type">play</span>
              <span class="entity">Games</span>
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
      :host { display: contents; }
      
      main { 
        width: 100%; 
        display: flex; 
        flex-direction: column; 
        align-items: center;
        padding: var(--space-xl) var(--space-lg);
        min-height: calc(100vh - 200px);
      }
      
      .next-to { display: flex; align-items: center; gap: var(--gap-md); }
      
      .page-header { 
        text-align: center; 
        margin-bottom: var(--space-xl); 
      }
      
      .page-header .next-to { justify-content: center; }
      
      .page-header .next-to .icon { 
        width: 4rem; 
        height: 4rem; 
        fill: var(--color-accent);
        filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4));
      }
      
      .page-header h1 { 
        font-size: 2.5rem; 
        margin: var(--space-md) 0; 
      }
      
      .page-header p { 
        font-size: 1.1rem; 
        color: var(--color-text-muted); 
      }
      
      .content-section { 
        width: 100%; 
        max-width: 1200px; 
        margin-bottom: var(--space-xl);
      }
      
      .content-section h2 { 
        text-align: center; 
        margin-bottom: var(--space-xl); 
        font-size: 2rem;
        color: var(--color-accent);
      }
      
      /* Slideshow Styles */
      .slideshow-container {
        position: relative;
        max-width: 900px;
        margin: 0 auto;
        background: var(--color-card-background);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 32px var(--color-shadow);
        border: 1px solid var(--color-border);
      }
      
      .slideshow-wrapper {
        position: relative;
        width: 100%;
        height: 450px;
        overflow: hidden;
      }
      
      .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: inherit;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      
      .slide.active {
        opacity: 1;
        z-index: 1;
      }
      
      .slide-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(15, 23, 42, 0.7) 0%,
          rgba(15, 23, 42, 0.85) 50%,
          rgba(15, 23, 42, 0.95) 100%
        );
        z-index: 1;
      }
      
      .slide-content {
        position: relative;
        z-index: 2;
        text-align: center;
        padding: var(--space-xl);
        max-width: 700px;
        transition: transform 0.3s ease;
      }
      
      .slide:hover .slide-content {
        transform: scale(1.05);
      }
      
      .slide:hover .slide-overlay {
        background: linear-gradient(
          to bottom,
          rgba(15, 23, 42, 0.6) 0%,
          rgba(15, 23, 42, 0.75) 50%,
          rgba(15, 23, 42, 0.9) 100%
        );
      }
      
      .slide-title {
        font-size: 3rem;
        margin: 0 0 var(--space-md);
        color: white;
        font-family: var(--font-family-heading);
        font-weight: 800;
        text-shadow: 
          0 2px 10px rgba(0, 0, 0, 0.8),
          0 4px 20px rgba(0, 0, 0, 0.5),
          0 0 40px rgba(59, 130, 246, 0.3);
        letter-spacing: 1px;
      }
      
      .slide-description {
        font-size: 1.3rem;
        color: #e2e8f0;
        line-height: 1.8;
        margin-bottom: var(--space-xl);
        text-shadow: 
          0 2px 8px rgba(0, 0, 0, 0.9),
          0 1px 4px rgba(0, 0, 0, 0.8);
        font-weight: 500;
      }
      
      .slide-cta {
        display: inline-block;
        padding: var(--space-md) var(--space-xl);
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
        color: white;
        border-radius: 8px;
        font-weight: 700;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow: 
          0 4px 12px rgba(59, 130, 246, 0.5),
          0 8px 24px rgba(0, 0, 0, 0.4);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
      
      .slide:hover .slide-cta {
        background: linear-gradient(135deg, var(--color-accent-hover) 0%, var(--color-accent) 100%);
        transform: translateY(-4px) scale(1.05);
        box-shadow: 
          0 8px 20px rgba(59, 130, 246, 0.6),
          0 12px 32px rgba(0, 0, 0, 0.5);
      }
      
      /* Navigation Arrows */
      .slide-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(59, 130, 246, 0.8);
        color: white;
        border: none;
        font-size: 3rem;
        padding: var(--space-md) var(--space-lg);
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
        border-radius: 8px;
        line-height: 1;
      }
      
      .slide-nav:hover {
        background: var(--color-accent);
        transform: translateY(-50%) scale(1.1);
      }
      
      .slide-nav.prev { left: var(--space-md); }
      .slide-nav.next { right: var(--space-md); }
      
      /* Dots */
      .slide-dots {
        position: absolute;
        bottom: var(--space-lg);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: var(--gap-sm);
        z-index: 10;
      }
      
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: 2px solid var(--color-accent);
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0;
      }
      
      .dot:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: scale(1.2);
      }
      
      .dot.active {
        background: var(--color-accent);
        transform: scale(1.3);
      }
      
      .loading {
        text-align: center;
        padding: var(--space-xl);
        color: var(--color-text-muted);
        font-size: 1.2rem;
      }
      
      /* Relationships Section */
      .relationships {
        width: 100%;
        max-width: 1200px;
        background: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: var(--space-xl);
        margin-top: var(--space-xl);
        box-shadow: 0 4px 6px -1px var(--color-shadow);
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
        font-size: 2rem;
        color: var(--color-accent);
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
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        transition: all 0.3s ease;
        text-align: center;
      }
      
      .relationships li:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px var(--color-shadow);
        border-color: var(--color-accent);
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.1) 100%);
      }
      
      .relationships .entity {
        font-weight: bold;
        color: var(--color-accent-light);
        font-size: 1.1rem;
      }
      
      .relationships .relationship-type {
        color: var(--color-accent);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 1px;
        padding: var(--space-xs) var(--space-sm);
        background: rgba(59, 130, 246, 0.2);
        border-radius: 4px;
      }
      
      .relationships a {
        color: var(--color-link);
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
        font-size: 1.1rem;
      }
      
      .relationships a:hover {
        color: var(--color-accent-hover);
        text-decoration: underline;
      }
      
      @media (max-width: 768px) {
        .slideshow-wrapper { height: 500px; }
        .slide-title { font-size: 2rem; }
        .slide-description { font-size: 1rem; }
        .slide-nav { 
          font-size: 2rem; 
          padding: var(--space-sm) var(--space-md); 
        }
        .slide-nav.prev { left: var(--space-xs); }
        .slide-nav.next { right: var(--space-xs); }
      }
    `
  ];
}

