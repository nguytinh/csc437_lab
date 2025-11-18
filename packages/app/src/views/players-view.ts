import { css, html, LitElement } from "lit";
import reset from "../styles/reset.css.js";

export class PlayersViewElement extends LitElement {
  render() {
    return html`
      <main>
        <div class="page-header">
          <div class="next-to">
            <svg class="icon">
              <use href="/icons/gaming.svg#player"></use>
            </svg>
            <h1>Players</h1>
          </div>
          <p>Individuals who engage with games, ranging from casual to professional gamers.</p>
        </div>

        <section class="content-section">
          <h2>Types of Players:</h2>
          <div class="card-grid">
            <div class="card player-card">
              <div class="card-header">
                <h3 class="card-title">🎮 Casual Gamers</h3>
              </div>
              <div class="card-content">
                <p>Play for relaxation and fun, enjoying accessible titles with friends and family</p>
                <div class="games-list">
                  <strong>Favorite Games:</strong> 
                  <a href="/app/games/animal-crossing">Animal Crossing</a>, 
                  <a href="/app/games/fifa-24">FIFA 24</a>, 
                  Mario Kart 8
                </div>
              </div>
            </div>

            <div class="card player-card">
              <div class="card-header">
                <h3 class="card-title">💪 Hardcore Gamers</h3>
              </div>
              <div class="card-content">
                <p>Dedicated players who invest significant time mastering challenging titles</p>
                <div class="games-list">
                  <strong>Favorite Games:</strong> 
                  <a href="/app/games/halo-infinite">Halo Infinite</a>, 
                  Elden Ring, 
                  Dark Souls III
                </div>
              </div>
            </div>

            <div class="card player-card">
              <div class="card-header">
                <h3 class="card-title">🏆 Professional Esports</h3>
              </div>
              <div class="card-content">
                <p>Compete at the highest level in organized tournaments for prize money</p>
                <div class="games-list">
                  <strong>Favorite Games:</strong> 
                  League of Legends, 
                  Counter-Strike 2, 
                  Valorant
                </div>
              </div>
            </div>

            <div class="card player-card">
              <div class="card-header">
                <h3 class="card-title">⏱️ Speedrunners</h3>
              </div>
              <div class="card-content">
                <p>Master game mechanics to complete titles as quickly as possible</p>
                <div class="games-list">
                  <strong>Favorite Games:</strong> 
                  <a href="/app/games/mario-odyssey">Super Mario Odyssey</a>, 
                  Celeste, 
                  Hollow Knight
                </div>
              </div>
            </div>

            <div class="card player-card">
              <div class="card-header">
                <h3 class="card-title">🎬 Content Creators</h3>
              </div>
              <div class="card-content">
                <p>Share gameplay, tutorials, and entertainment on streaming platforms</p>
                <div class="games-list">
                  <strong>Favorite Games:</strong> 
                  Minecraft, 
                  Among Us, 
                  Fortnite
                </div>
              </div>
            </div>

            <div class="card player-card">
              <div class="card-header">
                <h3 class="card-title">🗺️ Adventure Seekers</h3>
              </div>
              <div class="card-content">
                <p>Explore vast worlds, solve puzzles, and experience epic stories</p>
                <div class="games-list">
                  <strong>Favorite Games:</strong> 
                  <a href="/app/games/zelda-botw">Zelda: BOTW</a>, 
                  Red Dead Redemption 2, 
                  The Witcher 3
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="relationships">
          <h2>👥 Player Connections</h2>
          <ul>
            <li>
              <span class="entity">Players</span>
              <span class="relationship-type">play</span>
              <a href="/app/games">Games</a>
            </li>
            <li>
              <span class="entity">Players</span>
              <span class="relationship-type">own</span>
              <a href="/app/consoles">Consoles</a>
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
