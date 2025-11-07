import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import games from "./routes/games";
import auth, { authenticateUser } from "./routes/auth";

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});