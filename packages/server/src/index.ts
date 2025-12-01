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
// Resolve the static directory path relative to the server source directory
const resolvedStaticDir = path.resolve(__dirname, "..", staticDir);

// Middleware:
app.use(express.json());

app.use("/auth", auth);

app.use("/api/games", authenticateUser, games);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// Root path redirects to login/signup - MUST be before static middleware
app.get("/", (req: Request, res: Response) => {
  res.redirect("/login.html");
});

// Static files - comes after specific routes
app.use(express.static(resolvedStaticDir));

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(resolvedStaticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});