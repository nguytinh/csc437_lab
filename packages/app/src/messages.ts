import { Game } from "server/models";

export type Msg =
  | ["games/request", {}]
  | ["game/request", { gameId: string }]
  | Cmd;

type Cmd =
  | ["games/load", { games: Game[] }]
  | ["game/load", { game: Game }];

