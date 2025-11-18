import { Auth } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Game } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | [Model, Promise<Msg>] {
  switch (message[0]) {
    case "games/request": {
      return [
        { ...model, games: [] },
        requestGames(user)
          .then((games) => ["games/load", { games }] as Msg)
      ];
    }
    case "games/load": {
      const { games } = message[1];
      return { ...model, games };
    }
    case "game/request": {
      const { gameId } = message[1];
      return [
        { ...model, game: undefined },
        requestGame(gameId, user)
          .then((game) => ["game/load", { game }] as Msg)
      ];
    }
    case "game/load": {
      const { game } = message[1];
      return { ...model, game };
    }
    default: {
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
    }
  }
}

function requestGames(user: Auth.User): Promise<Game[]> {
  return fetch("/api/games", {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(`Failed to load games: ${response.status}`);
    })
    .then((json: unknown) => {
      if (json) {
        // API returns array directly, or object with games property
        if (Array.isArray(json)) {
          return json as Game[];
        } else {
          const data = json as { games: Game[] };
          return data.games || [];
        }
      }
      throw new Error("No JSON in response from server");
    });
}

function requestGame(gameId: string, user: Auth.User): Promise<Game> {
  return fetch(`/api/games/${gameId}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(`Failed to load game: ${response.status}`);
    })
    .then((json: unknown) => {
      if (json) return json as Game;
      throw new Error("No JSON in response from server");
    });
}

