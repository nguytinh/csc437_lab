import { css, html, LitElement } from "lit";
import reset from "../styles/reset.css.js";

export class PublishersViewElement extends LitElement {
  render() {
    return html`
      <main>
        <div class="page-header">
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#publisher"></use>
            </svg>
            <h1>Publishers</h1>
          </div>
          <p>Companies that fund, market, and distribute games to the public.</p>
        </div>

        <section class="content-section">
          <h2>Major Game Publishers:</h2>
          <div class="card-grid">
            <div class="card publisher-card">
              <div class="card-header">
                <h3 class="card-title">🎮 Nintendo</h3>
              </div>
              <div class="card-content">
                <p>Japanese gaming giant known for iconic franchises and innovative hardware</p>
                <div class="games-list">
                  <strong>Published Games:</strong> 
                  <a href="/app/games/zelda-botw">Zelda: BOTW</a>, 
                  <a href="/app/games/mario-odyssey">Super Mario Odyssey</a>, 
                  <a href="/app/games/animal-crossing">Animal Crossing</a>
                </div>
              </div>
            </div>

            <div class="card publisher-card">
              <div class="card-header">
                <h3 class="card-title">🎮 Xbox Game Studios</h3>
              </div>
              <div class="card-content">
                <p>Microsoft's gaming division publishing AAA titles and offering Game Pass subscription</p>
                <div class="games-list">
                  <strong>Published Games:</strong> 
                  <a href="/app/games/halo-infinite">Halo Infinite</a>, 
                  Forza Horizon 5, 
                  Starfield
                </div>
              </div>
            </div>

            <div class="card publisher-card">
              <div class="card-header">
                <h3 class="card-title">⚽ EA Sports</h3>
              </div>
              <div class="card-content">
                <p>Leader in sports simulation games with annual franchises and live service models</p>
                <div class="games-list">
                  <strong>Published Games:</strong> 
                  <a href="/app/games/fifa-24">FIFA 24</a>, 
                  Madden NFL 24, 
                  NHL 24
                </div>
              </div>
            </div>

            <div class="card publisher-card">
              <div class="card-header">
                <h3 class="card-title">🎮 Sony Interactive Entertainment</h3>
              </div>
              <div class="card-content">
                <p>PlayStation's first-party studio delivering exclusive cinematic gaming experiences</p>
                <div class="games-list">
                  <strong>Published Games:</strong> 
                  God of War Ragnarök, 
                  Spider-Man 2, 
                  The Last of Us Part II
                </div>
              </div>
            </div>

            <div class="card publisher-card">
              <div class="card-header">
                <h3 class="card-title">⚔️ Activision Blizzard</h3>
              </div>
              <div class="card-content">
                <p>Publisher of massive franchises including Call of Duty, World of Warcraft, and Overwatch</p>
                <div class="games-list">
                  <strong>Published Games:</strong> 
                  Call of Duty: Modern Warfare III, 
                  Diablo IV, 
                  Overwatch 2
                </div>
              </div>
            </div>

            <div class="card publisher-card">
              <div class="card-header">
                <h3 class="card-title">🗺️ Ubisoft</h3>
              </div>
              <div class="card-content">
                <p>French publisher known for open-world games and long-running franchises</p>
                <div class="games-list">
                  <strong>Published Games:</strong> 
                  Assassin's Creed Mirage, 
                  Far Cry 6, 
                  Rainbow Six Siege
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="relationships">
          <h2>🏢 Publisher Connections</h2>
          <ul>
            <li>
              <a href="/app/games">Games</a>
              <span class="relationship-type">published by</span>
              <span class="entity">Publishers</span>
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
      main { width: 100%; display: flex; flex-direction: column; align-items: center; padding: var(--space-xl) var(--space-lg); min-height: calc(100vh - 200px); }
      .next-to { display: flex; align-items: center; gap: var(--gap-md); }
      .page-header { text-align: center; margin-bottom: var(--space-xl); }
      .page-header .next-to { justify-content: center; }
      .page-header .next-to .icon { width: 4rem; height: 4rem; fill: var(--color-accent); filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4)); }
      .page-header h1 { font-size: 2.5rem; margin: var(--space-md) 0; }
      .page-header p { font-size: 1.1rem; color: var(--color-text-muted); }
      .content-section { width: 100%; max-width: 1200px; margin-bottom: var(--space-xl); }
      .content-section h2 { text-align: center; margin-bottom: var(--space-lg); font-size: 2rem; color: var(--color-accent); }
      .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--gap-lg); width: 100%; }
      .card { background: var(--color-card-background); border: 1px solid var(--color-border); border-radius: 12px; padding: var(--space-lg); transition: all 0.3s ease; box-shadow: 0 2px 4px var(--color-shadow); position: relative; overflow: hidden; }
      .card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 100%); transform: scaleX(0); transition: transform 0.3s ease; }
      .card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 12px 24px var(--color-shadow); background: var(--color-card-background-hover); border-color: var(--color-accent); }
      .card:hover::before { transform: scaleX(1); }
      .card-header { display: flex; align-items: center; gap: var(--gap-sm); margin-bottom: var(--space-md); padding-bottom: var(--space-md); border-bottom: 2px solid var(--color-border); }
      .card-title { font-family: var(--font-family-heading); font-size: 1.5rem; margin: 0; color: var(--color-text); }
      .card-content { color: var(--color-text); line-height: 1.6; }
      .card-content p { margin-bottom: var(--space-md); color: var(--color-text-muted); }
      .games-list { margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--color-border); font-size: 0.95rem; }
      .games-list strong { color: var(--color-accent); display: block; margin-bottom: var(--space-xs); }
      .games-list a { color: var(--color-link); text-decoration: none; transition: color 0.3s ease; }
      .games-list a:hover { color: var(--color-accent-hover); text-decoration: underline; }
      .relationships { width: 100%; max-width: 1200px; background: var(--color-card-background); border: 1px solid var(--color-border); border-radius: 12px; padding: var(--space-xl); margin-top: var(--space-xl); box-shadow: 0 4px 6px -1px var(--color-shadow); position: relative; overflow: hidden; }
      .relationships::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 100%); }
      .relationships h2 { margin-top: 0; text-align: center; margin-bottom: var(--space-lg); font-size: 2rem; color: var(--color-accent); }
      .relationships ul { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--gap-md); }
      .relationships li { display: flex; flex-direction: column; align-items: center; gap: var(--gap-sm); padding: var(--space-lg); background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.05) 100%); border: 1px solid var(--color-border); border-radius: 8px; transition: all 0.3s ease; text-align: center; }
      .relationships li:hover { transform: translateY(-4px); box-shadow: 0 8px 16px var(--color-shadow); border-color: var(--color-accent); background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.1) 100%); }
      .relationships .entity { font-weight: bold; color: var(--color-accent-light); font-size: 1.1rem; }
      .relationships .relationship-type { color: var(--color-accent); font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; padding: var(--space-xs) var(--space-sm); background: rgba(59, 130, 246, 0.2); border-radius: 4px; }
      .relationships a { color: var(--color-link); text-decoration: none; font-weight: 600; transition: color 0.3s ease; font-size: 1.1rem; }
      .relationships a:hover { color: var(--color-accent-hover); text-decoration: underline; }
      @media (max-width: 768px) { .card-grid { grid-template-columns: 1fr; } }
    `
  ];
}
