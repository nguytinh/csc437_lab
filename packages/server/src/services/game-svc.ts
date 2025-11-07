import { Schema, model } from "mongoose";
import { Game } from "../models/game";

const GameSchema = new Schema<Game>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true }
  },
  { collection: "games" }
);

const GameModel = model<Game>("Game", GameSchema);

function index(): Promise<Game[]> {
  return GameModel.find();
}

function get(title: String): Promise<Game> {
  return GameModel.find({ title })
    .then((list) => list[0])
    .catch((err) => {
      throw `${title} Not Found`;
    });
}

function create(json: Game): Promise<Game> {
  const g = new GameModel(json);
  return g.save();
}

function update(title: String, game: Game): Promise<Game> {
  return GameModel.findOneAndUpdate({ title }, game, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${title} not updated`;
    else return updated as Game;
  });
}

function remove(title: String): Promise<void> {
  return GameModel.findOneAndDelete({ title }).then(
    (deleted) => {
      if (!deleted) throw `${title} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };

