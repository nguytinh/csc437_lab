import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Games from "./services/game-svc";

connect("csc437lab");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/games", (req: Request, res: Response) => {
  Games.index().then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ games: data }));
    else res
      .status(404).send();
  });
});

app.get("/games/:title", (req: Request, res: Response) => {
  const { title } = req.params;

  Games.get(title).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});