import { Game } from "server/models";

export interface Model {
  games?: Game[];
  game?: Game;
}

export const init: Model = {};

