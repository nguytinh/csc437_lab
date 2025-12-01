import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Game } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  const [command, payload] = message;
  switch (command) {
    case "games/request": {
      apply((model) => ({ ...model, games: [] }));
      requestGames(user)
        .then((games) => ["games/load", { games }] as Msg)
        .then((msg) => apply(() => ({}), msg));
      break;
    }
    case "games/load": {
      const { games } = payload;
      apply((model) => ({ ...model, games }));
      break;
    }
    case "game/request": {
      const { gameId } = payload;
      apply((model) => ({ ...model, game: undefined }));
      requestGame(gameId, user)
        .then((game) => ["game/load", { game }] as Msg)
        .then((msg) => apply(() => ({}), msg));
      break;
    }
    case "game/load": {
      const { game } = payload;
      apply((model) => ({ ...model, game }));
      break;
    }
    case "game/save": {
      const { gameId, game, onSuccess, onFailure } = payload;
      saveGame({ gameId, game }, user)
        .then((game) => {
          if (onSuccess) onSuccess();
          return ["game/load", { game }] as Msg;
        })
        .then((msg) => apply(() => ({}), msg))
        .catch((error: Error) => {
          if (onFailure) onFailure(error);
        });
      break;
    }
    default: {
      const unhandled: never = command;
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

function saveGame(
  msg: {
    gameId: string;
    game: Game;
  },
  user: Auth.User
): Promise<Game> {
  return fetch(`/api/games/${msg.gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.game)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(`Failed to save game for ${msg.gameId}`);
    })
    .then((json: unknown) => {
      if (json) return json as Game;
      throw new Error("No JSON in API response");
    });
}

