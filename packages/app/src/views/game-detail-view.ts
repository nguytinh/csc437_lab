import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.js";

interface GameDetail {
  id: string;
  title: string;
  fullTitle: string;
  description: string;
  longDescription: string[];
  releaseDate: string;
  platform: string;
  genre: string;
  developer: string;
  publisher: string;
  series: string;
  features: string[];
}

const GAME_DATA: { [key: string]: GameDetail } = {
  "zelda-botw": {
    id: "zelda-botw",
    title: "Zelda: BOTW",
    fullTitle: "The Legend of Zelda: Breath of the Wild",
    description: "An open-world action-adventure game that redefines the Zelda series with unprecedented freedom and exploration.",
    releaseDate: "March 3, 2017",
    platform: "Nintendo Switch, Wii U",
    genre: "Action-Adventure",
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    series: "The Legend of Zelda",
    features: [
      "Open-world exploration with no set path",
      "Physics-based puzzle solving",
      "Dynamic weather and day/night cycles",
      "Weapon durability system",
      "Cooking and crafting mechanics",
      "Shrines and divine beasts to discover"
    ],
    longDescription: [
      "Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across vast fields, through forests, and to mountain peaks as you discover what has become of the kingdom of Hyrule in this stunning Open-Air Adventure.",
      "Explore the wilds of Hyrule any way you like—climb up towers and mountain peaks in search of new destinations, then set your own path to get there and plunge into the wilderness. Along the way, you'll battle towering enemies, hunt wild beasts and gather ingredients for the food and elixirs you'll need to sustain you on your journey.",
      "More than 100 Shrines of Trials to discover and explore. Shrines dot the landscape, waiting to be discovered in any order you want. Search for them in various ways, and solve a variety of puzzles inside."
    ]
  },
  "halo-infinite": {
    id: "halo-infinite",
    title: "Halo Infinite",
    fullTitle: "Halo Infinite",
    description: "A first-person shooter that continues the legendary saga of Master Chief.",
    releaseDate: "December 8, 2021",
    platform: "Xbox Series X/S, Xbox One, PC",
    genre: "First-Person Shooter",
    developer: "343 Industries",
    publisher: "Xbox Game Studios",
    series: "Halo",
    features: [
      "Free-to-play multiplayer",
      "Open-world campaign on Zeta Halo",
      "Grappleshot and new equipment",
      "Classic arena-style combat",
      "Forge mode for custom content",
      "Cross-platform play and progression"
    ],
    longDescription: [
      "When all hope is lost and humanity's fate hangs in the balance, Master Chief is ready to confront the most ruthless foe he's ever faced. Step inside the armor of humanity's greatest hero to experience an epic adventure and explore the massive scale of the Halo ring.",
      "Halo Infinite offers a groundbreaking free-to-play multiplayer experience where players can enjoy the next generation of Halo combat. The game features a spiritual reboot of the campaign while retaining the core elements that have defined the franchise for two decades.",
      "Explore the expansive Zeta Halo ring, uncover the mysteries it contains, and experience the most wide-open and adventure-filled Halo campaign to date."
    ]
  },
  "fifa-24": {
    id: "fifa-24",
    title: "FIFA 24",
    fullTitle: "EA Sports FC 24",
    description: "The world's most authentic football experience with HyperMotion technology.",
    releaseDate: "September 29, 2023",
    platform: "PlayStation 5, Xbox Series X/S, PC",
    genre: "Sports Simulation",
    developer: "EA Vancouver",
    publisher: "EA Sports",
    series: "FIFA/FC",
    features: [
      "HyperMotionV technology with volumetric data",
      "PlayStyles and PlayStyles+ for authentic player identity",
      "Frostbite Engine for stunning visuals",
      "Ultimate Team with enhanced chemistry",
      "Career Mode with player personality",
      "Women's football fully integrated"
    ],
    longDescription: [
      "EA SPORTS FC 24 welcomes you to a new era of The World's Game. Feel closer to the game with three cutting-edge technologies powering unparalleled realism in every match: HyperMotionV, PlayStyles optimized by Opta, and a revolutionized Frostbite Engine.",
      "Experience the most authentic football gameplay ever with over 19,000 fully licensed players, 700+ teams, and 100+ stadiums. Every player has unique attributes and playing styles that mirror their real-world counterparts.",
      "Build your dream team in Ultimate Team, manage your favorite club in Career Mode, or compete against friends in Clubs and VOLTA FOOTBALL. The beautiful game has never looked or felt better."
    ]
  },
  "mario-odyssey": {
    id: "mario-odyssey",
    title: "Super Mario Odyssey",
    fullTitle: "Super Mario Odyssey",
    description: "A 3D platformer adventure where Mario explores incredible worlds.",
    releaseDate: "October 27, 2017",
    platform: "Nintendo Switch",
    genre: "Platformer",
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    series: "Super Mario",
    features: [
      "Unique cap-throwing mechanic with Cappy",
      "Capture ability to control enemies and objects",
      "Sandbox-style kingdom exploration",
      "Over 800 Power Moons to collect",
      "2-player co-op mode",
      "Stunning HD visuals and diverse worlds"
    ],
    longDescription: [
      "Embark on a globe-trotting 3D adventure with Mario as he journeys across mysterious worlds aboard the Odyssey airship. His mission: to rescue Princess Peach from Bowser's nefarious wedding plans and save the day in true Mario fashion.",
      "Use Mario's new abilities to collect Power Moons and fuel the Odyssey airship to travel to new kingdoms. Experience sandbox-style gameplay that rewards exploration and discovery with tons of fun and surprising challenges.",
      "From the bustling streets of New Donk City to the mysterious and colorful landscapes of other kingdoms, each world is packed with hidden secrets, creative puzzles, and unique inhabitants waiting to meet Mario."
    ]
  },
  "animal-crossing": {
    id: "animal-crossing",
    title: "Animal Crossing: New Horizons",
    fullTitle: "Animal Crossing: New Horizons",
    description: "Create your own island paradise and live a peaceful life surrounded by nature.",
    releaseDate: "March 20, 2020",
    platform: "Nintendo Switch",
    genre: "Life Simulation",
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    series: "Animal Crossing",
    features: [
      "Fully customizable island with terraforming",
      "Seasonal events and updates",
      "Multiplayer with friends online",
      "Thousands of furniture and clothing items",
      "Real-time clock and calendar",
      "Collect fossils, fish, and bugs"
    ],
    longDescription: [
      "Escape to a deserted island and create your own paradise as you explore, create, and customize in Animal Crossing: New Horizons. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts.",
      "Blaze trails, build bridges, and explore waterways as you make the island your own. As you explore your island, you'll find materials to craft items such as axes, bug nets, and more. Use these tools to create furniture, structures, and customize your island however you like.",
      "Watch the seasons change and participate in special events throughout the year. Visit friends' islands online and share your best designs with the world. The possibilities are endless in this laid-back, charming life simulation."
    ]
  }
};

export class GameDetailViewElement extends LitElement {
  @property({ attribute: "game-id" })
  gameid?: string;

  @state()
  gameData?: GameDetail;

  connectedCallback() {
    super.connectedCallback();
    this.loadGameData();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("gameid")) {
      this.loadGameData();
    }
  }

  loadGameData() {
    if (this.gameid) {
      this.gameData = GAME_DATA[this.gameid];
    }
  }

  render() {
    if (!this.gameData) {
      return html`
        <main>
          <div class="page-header">
            <h1>Game Not Found</h1>
            <p>Sorry, we couldn't find information for this game.</p>
            <a href="/app/games" class="back-link">← Back to Games</a>
          </div>
        </main>
        <gaming-footer></gaming-footer>
      `;
    }

    return html`
      <main>
        <div class="page-header">
          <a href="/app/games" class="back-link">← Back to Games</a>
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#game"></use>
            </svg>
            <h1>${this.gameData.fullTitle}</h1>
          </div>
          <p class="tagline">${this.gameData.description}</p>
          <p class="info-note">
            💡 These detail pages use static data. To edit API-connected games, 
            visit <a href="/app/games-list">Edit Games</a>.
          </p>
        </div>

        <section class="content-section">
          <div class="card-grid two-col">
            <div class="card detail-card">
              <div class="card-header">
                <h3 class="card-title">📋 Game Details</h3>
              </div>
              <div class="card-content">
                <dl class="detail-list">
                  <dt>Release Date</dt>
                  <dd>${this.gameData.releaseDate}</dd>
                  
                  <dt>Platform</dt>
                  <dd>${this.gameData.platform}</dd>
                  
                  <dt>Genre</dt>
                  <dd><a href="/app/genres">${this.gameData.genre}</a></dd>
                  
                  <dt>Developer</dt>
                  <dd>${this.gameData.developer}</dd>
                  
                  <dt>Publisher</dt>
                  <dd><a href="/app/publishers">${this.gameData.publisher}</a></dd>
                  
                  <dt>Series</dt>
                  <dd><a href="/app/series">${this.gameData.series}</a></dd>
                </dl>
              </div>
            </div>

            <div class="card detail-card">
              <div class="card-header">
                <h3 class="card-title">✨ Gameplay Features</h3>
              </div>
              <div class="card-content">
                <ul class="features-list">
                  ${this.gameData.features.map(feature => html`<li>${feature}</li>`)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="description-section">
            <h2>📖 About This Game</h2>
            <div class="card">
              <div class="card-content description-content">
                ${this.gameData.longDescription.map(para => html`<p>${para}</p>`)}
              </div>
            </div>
          </div>
        </section>

        <section class="relationships">
          <h2>🔗 Related Content</h2>
          <ul>
            <li>
              <span class="entity">Part of</span>
              <span class="relationship-type">series</span>
              <a href="/app/series">${this.gameData.series}</a>
            </li>
            <li>
              <span class="entity">Runs on</span>
              <span class="relationship-type">platform</span>
              <a href="/app/consoles">${this.gameData.platform.split(',')[0]}</a>
            </li>
            <li>
              <span class="entity">Published by</span>
              <span class="relationship-type">publisher</span>
              <a href="/app/publishers">${this.gameData.publisher}</a>
            </li>
            <li>
              <span class="entity">Genre</span>
              <span class="relationship-type">category</span>
              <a href="/app/genres">${this.gameData.genre}</a>
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
      
      .info-note {
        text-align: center;
        color: var(--color-text-muted);
        font-size: 0.95rem;
        margin-top: var(--space-md);
        padding: var(--space-sm) var(--space-md);
        background: rgba(59, 130, 246, 0.05);
        border-radius: 6px;
        border: 1px solid rgba(59, 130, 246, 0.2);
      }
      
      .info-note a {
        color: var(--color-accent);
        font-weight: 600;
        text-decoration: none;
      }
      
      .info-note a:hover {
        text-decoration: underline;
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
      }
      
      .page-header .next-to {
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
        font-size: 0.85rem;
        letter-spacing: 1px;
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
      
      .detail-list a {
        color: var(--color-link);
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
      }
      
      .detail-list a:hover {
        color: var(--color-accent-hover);
        text-decoration: underline;
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
        padding: var(--space-sm) var(--space-md);
        background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
        border-left: 3px solid var(--color-accent);
        border-radius: 4px;
        transition: all 0.3s ease;
      }
      
      .features-list li:hover {
        transform: translateX(8px);
        background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, transparent 100%);
        border-left-width: 4px;
      }
      
      .features-list li::before {
        content: '▸';
        color: var(--color-accent);
        margin-right: var(--space-sm);
        font-weight: bold;
      }
      
      .description-section h2 {
        text-align: center;
        margin-bottom: var(--space-lg);
        font-size: 2rem;
        color: var(--color-accent);
      }
      
      .description-content {
        font-size: 1.1rem;
        line-height: 1.8;
      }
      
      .description-content p {
        margin-bottom: var(--space-lg);
      }
      
      .description-content p:last-child {
        margin-bottom: 0;
      }
      
      .card {
        background: var(--color-card-background);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: var(--space-lg);
        box-shadow: 0 2px 4px var(--color-shadow);
        transition: all 0.3s ease;
      }
      
      .card-header {
        display: flex;
        align-items: center;
        gap: var(--gap-sm);
        margin-bottom: var(--space-md);
        padding-bottom: var(--space-md);
      }
      
      .card-title {
        font-family: var(--font-family-heading);
        font-size: 1.5rem;
        margin: 0;
        color: var(--color-text);
      }
      
      .card-content {
        color: var(--color-text);
        line-height: 1.6;
      }
      
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
        position: relative;
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
      
      @media (max-width: 900px) {
        .card-grid {
          grid-template-columns: 1fr;
        }
        
        .page-header h1 {
          font-size: 2rem;
        }
      }
    `
  ];
}

