import {
  Auth,
  define,
  History,
  Switch,
  Store
} from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { HeaderElement } from "./components/gaming-header";
import { FooterElement } from "./components/gaming-footer";
import { HomeViewElement } from "./views/home-view";
import { GamesViewElement } from "./views/games-view";
import { GameViewElement } from "./views/game-view";
import { GameDetailViewElement } from "./views/game-detail-view";
import { ConsolesViewElement } from "./views/consoles-view";
import { GenresViewElement } from "./views/genres-view";
import { PublishersViewElement } from "./views/publishers-view";
import { SeriesViewElement } from "./views/series-view";
import { PlayersViewElement } from "./views/players-view";

const routes = [
  {
    path: "/app/games/:id",
    view: (params: Switch.Params) => html`
      <game-detail-view game-id=${params.id}></game-detail-view>
    `
  },
  {
    path: "/app/games",
    view: () => html`
      <games-view></games-view>
    `
  },
  {
    path: "/app/consoles",
    view: () => html`
      <consoles-view></consoles-view>
    `
  },
  {
    path: "/app/genres",
    view: () => html`
      <genres-view></genres-view>
    `
  },
  {
    path: "/app/publishers",
    view: () => html`
      <publishers-view></publishers-view>
    `
  },
  {
    path: "/app/series",
    view: () => html`
      <series-view></series-view>
    `
  },
  {
    path: "/app/players",
    view: () => html`
      <players-view></players-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "gaming:auth");
    }
  },
  "gaming-header": HeaderElement,
  "gaming-footer": FooterElement,
  "home-view": HomeViewElement,
  "games-view": GamesViewElement,
  "game-view": GameViewElement,
  "game-detail-view": GameDetailViewElement,
  "consoles-view": ConsolesViewElement,
  "genres-view": GenresViewElement,
  "publishers-view": PublishersViewElement,
  "series-view": SeriesViewElement,
  "players-view": PlayersViewElement,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "gaming:history", "gaming:auth");
    }
  }
});

