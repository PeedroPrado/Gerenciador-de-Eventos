import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import eventRoutes from "./routes/eventRoutes"; // ainda relativo ao src

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// serve frontend que está fora: subir duas pastas
app.use(express.static(path.join(__dirname, "..", "..", "frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "index.html"));
});

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

mongoose
  .connect("mongodb://127.0.0.1:27017/evento")
  .then(() => console.log("MongoDB Conectado"))
  .catch(err => console.log("Erro no MongoDB", err));

app.use("/eventos", eventRoutes);

export default app;
