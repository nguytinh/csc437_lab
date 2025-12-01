import { Game } from "server/models";

export type Msg =
  | ["games/request", {}]
  | ["game/request", { gameId: string }]
  | [
      "game/save",
      {
        gameId: string;
        game: Game;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | Cmd;

type Cmd =
  | ["games/load", { games: Game[] }]
  | ["game/load", { game: Game }];

