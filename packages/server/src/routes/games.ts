import express, { Request, Response } from "express";
import { Game } from "../models/game";
import Games from "../services/game-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Games.index()
    .then((list: Game[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:title", (req: Request, res: Response) => {
  const { title } = req.params;

  Games.get(title)
    .then((game: Game) => res.json(game))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newGame = req.body;

  Games.create(newGame)
    .then((game: Game) =>
      res.status(201).json(game)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:title", (req: Request, res: Response) => {
  const { title } = req.params;
  const newGame = req.body;

  Games.update(title, newGame)
    .then((game: Game) => res.json(game))
    .catch((err) => res.status(404).end());
});

router.delete("/:title", (req: Request, res: Response) => {
  const { title } = req.params;

  Games.remove(title)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;

