import express from "express";
import { IncomingMessage, ServerResponse } from "http";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { create } from "domain";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.shhhh_secret = "doggy";
  next();
});

app.get("/", (req: IncomingMessage, res) => {
  res.send("Hello World");
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Not authorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Bad input" });
  } else {
    res.status(500).json({ message: "Oops! that's on us" });
  }
});

export default app;
