import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";

interface ConsoleDetail {
  id: string;
  name: string;
  manufacturer: string;
  releaseDate: string;
  generation: string;
  bestSellingGame: string;
  type: string;
  features: string[];
  description: string[];
  imageUrl: string;
}

const CONSOLE_DATA: { [key: string]: ConsoleDetail } = {
  "nintendo-switch": {
    id: "nintendo-switch",
    name: "Nintendo Switch",
    manufacturer: "Nintendo",
    releaseDate: "March 3, 2017",
    generation: "Eighth / Ninth",
    bestSellingGame: "Mario Kart 8 Deluxe",
    type: "Hybrid Video Game Console",
    imageUrl: "https://assets.nintendo.com/image/upload/f_auto/q_auto/c_fill,w_800/ncom/en_US/switch/site-design-update/switch-family",
    features: [
      "Hybrid design: TV, Tabletop, and Handheld modes",
      "Joy-Con controllers with HD Rumble",
      "Local wireless multiplayer",
      "Nintendo Switch Online service",
      "Expandable storage via microSD",
      "Touchscreen display"
    ],
    description: [
      "The Nintendo Switch is a breakthrough home video game console. It not only connects to a TV at home, but it also instantly transforms into an on-the-go handheld using its 6.2-inch screen. For the first time, players can enjoy a full home-console experience anytime, anywhere.",
      "Battery life ranges from 4.5 to 9 hours depending on the game. The console supports multiplayer gaming options including local wireless for up to 8 consoles and online play."
    ]
  },
  "ps5": {
    id: "ps5",
    name: "PlayStation 5",
    manufacturer: "Sony Interactive Entertainment",
    releaseDate: "November 12, 2020",
    generation: "Ninth",
    bestSellingGame: "Marvel's Spider-Man 2",
    type: "Home Video Game Console",
    imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
    features: [
      "Ultra-high speed SSD for near-instant load times",
      "Ray tracing and 4K gaming support",
      "DualSense controller with haptic feedback",
      "Adaptive triggers",
      "3D Audio technology",
      "Backwards compatibility with PS4 games"
    ],
    description: [
      "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
      "The PS5 console unleashes new gaming possibilities that you never anticipated. Marvel at incredible graphics and experience new PS5 features."
    ]
  },
  "xbox-series-x": {
    id: "xbox-series-x",
    name: "Xbox Series X",
    manufacturer: "Microsoft",
    releaseDate: "November 10, 2020",
    generation: "Ninth",
    bestSellingGame: "Call of Duty: Modern Warfare II",
    type: "Home Video Game Console",
    imageUrl: "https://i.extremetech.com/imagery/content-types/017bzo4irDqcCFc33nVjdhN/hero-image.fit_lim.v1678673290.jpg",
    features: [
      "12 teraflops of processing power",
      "True 4K gaming and 8K HDR support",
      "Xbox Velocity Architecture",
      "Quick Resume for multiple games",
      "Smart Delivery",
      "Game Pass Ultimate integration"
    ],
    description: [
      "Xbox Series X is the fastest, most powerful Xbox ever. Explore rich new worlds with 12 teraflops of raw graphic processing power, DirectX ray tracing, a custom SSD, and 4K gaming.",
      "Make the most of every gaming minute with Quick Resume, lightning-fast load times, and gameplay of up to 120 FPS—all powered by Xbox Velocity Architecture."
    ]
  },
  "steam-deck": {
    id: "steam-deck",
    name: "Steam Deck",
    manufacturer: "Valve",
    releaseDate: "February 25, 2022",
    generation: "Ninth",
    bestSellingGame: "Elden Ring",
    type: "Handheld Gaming Computer",
    imageUrl: "https://cdn.fastly.steamstatic.com/steamdeck/images/video/overview_oled.jpg",
    features: [
      "Custom AMD APU (Zen 2 + RDNA 2)",
      "7-inch touchscreen display",
      "Full-sized controls with trackpads",
      "SteamOS 3.0 (Arch Linux based)",
      "Desktop mode capability",
      "microSD expansion slot"
    ],
    description: [
      "Steam Deck brings the Steam games and features you love to a powerful and convenient form factor that you can take wherever you go. It is a Zen 2 + RDNA 2 powerhouse, delivering more than enough performance to run the latest AAA games in a very efficient power envelope.",
      "Your Steam Library, anywhere. Just log in and your entire Steam library shows up, just like on any other PC. You'll see the compatibility rating of each game, indicating the kind of experience you can expect when playing."
    ]
  },
  "nintendo-switch-lite": {
    id: "nintendo-switch-lite",
    name: "Nintendo Switch Lite",
    manufacturer: "Nintendo",
    releaseDate: "September 20, 2019",
    generation: "Eighth / Ninth",
    bestSellingGame: "Animal Crossing: New Horizons",
    type: "Handheld Game Console",
    imageUrl: "https://m.media-amazon.com/images/I/61owpat34dL._AC_UF894,1000_QL80_.jpg",
    features: [
      "Dedicated handheld play",
      "Compact and lightweight design",
      "Integrated controls",
      "Compatible with all handheld-mode Switch games",
      "Longer battery life than original Switch",
      "Available in multiple colors"
    ],
    description: [
      "Nintendo Switch Lite is a compact, lightweight Nintendo Switch system dedicated to handheld play. With a built-in +Control Pad and a sleek, unibody design, it's great for on-the-go gaming.",
      "It supports all Nintendo Switch software that can be played in handheld mode. It's ideal for people who have lots of opportunities to play outside, and also for anyone who wants to play online or local wireless multiplayer with friends or family who already own a flagship Nintendo Switch console."
    ]
  }
};

export class ConsoleDetailViewElement extends LitElement {
  @property({ attribute: "console-id" })
  consoleId?: string;

  @state()
  consoleData?: ConsoleDetail;

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("consoleId")) {
      this.loadData();
    }
  }

  loadData() {
    if (this.consoleId && CONSOLE_DATA[this.consoleId]) {
      this.consoleData = CONSOLE_DATA[this.consoleId];
    }
  }

  render() {
    if (!this.consoleData) {
      return html`
        <main>
          <div class="page-header">
            <h1>Console Not Found</h1>
            <p>Sorry, we couldn't find information for this console.</p>
            <a href="/app/consoles" class="back-link">← Back to Consoles</a>
          </div>
        </main>
        <gaming-footer></gaming-footer>
      `;
    }

    return html`
      <main>
        <div class="page-header">
          <a href="/app/consoles" class="back-link">← Back to Consoles</a>
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#console"></use>
            </svg>
            <h1>${this.consoleData.name}</h1>
          </div>
          <p class="tagline">${this.consoleData.type}</p>
        </div>

        <div class="hero-image">
            <img src="${this.consoleData.imageUrl}" alt="${this.consoleData.name}" />
            <div class="overlay"></div>
        </div>

        <section class="content-section">
          <div class="card-grid two-col">
            <div class="card detail-card">
              <div class="card-header">
                <h3 class="card-title">📋 Specifications</h3>
              </div>
              <div class="card-content">
                <dl class="detail-list">
                  <dt>Manufacturer</dt>
                  <dd>${this.consoleData.manufacturer}</dd>
                  
                  <dt>Release Date</dt>
                  <dd>${this.consoleData.releaseDate}</dd>
                  
                  <dt>Generation</dt>
                  <dd>${this.consoleData.generation}</dd>
                  
                  <dt>Type</dt>
                  <dd>${this.consoleData.type}</dd>
                  
                  <dt>Best Selling Game</dt>
                  <dd>${this.consoleData.bestSellingGame}</dd>
                </dl>
              </div>
            </div>

            <div class="card detail-card">
              <div class="card-header">
                <h3 class="card-title">✨ Key Features</h3>
              </div>
              <div class="card-content">
                <ul class="features-list">
                  ${this.consoleData.features.map(feature => html`<li>${feature}</li>`)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="description-section">
            <h2>📖 About The System</h2>
            <div class="card">
              <div class="card-content description-content">
                ${this.consoleData.description.map(para => html`<p>${para}</p>`)}
              </div>
            </div>
          </div>
        </section>

        <section class="relationships">
          <h2>🔗 Related Content</h2>
          <ul>
            <li>
              <span class="entity">Library</span>
              <span class="relationship-type">games</span>
              <a href="/app/games">View Games</a>
            </li>
            <li>
              <span class="entity">Creator</span>
              <span class="relationship-type">company</span>
              <a href="/app/publishers">${this.consoleData.manufacturer}</a>
            </li>
            <li>
              <span class="entity">Category</span>
              <span class="relationship-type">type</span>
              <a href="/app/consoles">All Consoles</a>
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
        padding-bottom: var(--space-xl);
      }

      .hero-image {
        width: 100%;
        max-width: 1000px;
        height: 400px;
        margin-bottom: var(--space-xl);
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      }

      .hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .hero-image:hover img {
        transform: scale(1.05);
      }

      .hero-image .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
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
        margin-top: var(--space-lg);
        max-width: 900px;
        width: 100%;
      }
      
      .next-to {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--gap-md);
      }
      
      .page-header .icon {
        width: 3.5rem;
        height: 3.5rem;
        fill: var(--color-accent);
        filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
      }
      
      .page-header h1 {
        font-size: 3rem;
        margin: var(--space-md) 0;
        background: linear-gradient(135deg, #ffffff 0%, var(--color-accent-light) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -1px;
        font-weight: 800;
      }
      
      .tagline {
        font-size: 1.4rem;
        color: var(--color-text-muted);
        font-weight: 300;
      }
      
      .content-section {
        width: 100%;
        max-width: 1200px;
        margin-bottom: var(--space-xl);
        padding: 0 var(--space-md);
      }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: var(--gap-lg);
        width: 100%;
      }
      
      .detail-card .card-header {
        border-bottom: 2px solid var(--color-border);
      }
      
      .detail-list {
        display: grid;
        gap: var(--space-md);
      }
      
      .detail-list dt {
        font-weight: 600;
        color: var(--color-accent);
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 1.5px;
        margin-bottom: var(--space-xs);
      }
      
      .detail-list dd {
        color: var(--color-text);
        font-size: 1.1rem;
        margin: 0 0 var(--space-md) 0;
        padding-bottom: var(--space-md);
        border-bottom: 1px solid var(--color-border);
      }
      
      .detail-list dd:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }
      
      .features-list li {
        padding: var(--space-md);
        background: rgba(255, 255, 255, 0.03);
        border-left: 3px solid var(--color-accent);
        border-radius: 0 8px 8px 0;
        transition: all 0.3s ease;
      }
      
      .features-list li:hover {
        transform: translateX(8px);
        background: rgba(255, 255, 255, 0.06);
      }
      
      .description-section h2 {
        text-align: center;
        margin-bottom: var(--space-lg);
        font-size: 2rem;
        color: var(--color-text);
        border-bottom: 2px solid var(--color-border);
        padding-bottom: var(--space-sm);
        display: inline-block;
      }
      
      .description-section {
        text-align: center;
      }

      .description-content {
        font-size: 1.15rem;
        line-height: 1.8;
        color: var(--color-text-muted);
        text-align: left;
      }
      
      .description-content p {
        margin-bottom: var(--space-lg);
      }
      
      .card {
        background: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--space-lg);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
      }
      
      .card-header {
        display: flex;
        align-items: center;
        gap: var(--gap-sm);
        margin-bottom: var(--space-md);
        padding-bottom: var(--space-md);
      }
      
      .card-title {
        font-family: var(--font-family);
        font-size: 1.5rem;
        margin: 0;
        color: var(--color-text);
        font-weight: 700;
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
      }
      
      .relationships a:hover {
        color: var(--color-accent);
      }
      
      @media (max-width: 900px) {
        .card-grid {
          grid-template-columns: 1fr;
        }
        
        .hero-image {
            height: 250px;
        }
        
        .page-header h1 {
          font-size: 2rem;
        }
      }
    `
  ];
}

