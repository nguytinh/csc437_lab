import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import games from "./routes/games";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

connect("csc437lab");

const app = express();
const port = process.env.PORT || 3000;
// Default to serving built proto files, or use STATIC env var if provided
const staticDir = process.env.STATIC || "../proto/dist";

app.use(express.static(staticDir));

// Middleware:
app.use(express.json());

app.use("/auth", auth);

app.use("/api/games", authenticateUser, games);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// Root path redirects to login/signup
app.get("/", (req: Request, res: Response) => {
  res.redirect("/login.html");
});

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});