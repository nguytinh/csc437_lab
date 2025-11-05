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

export default { index, get };

