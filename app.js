import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios/usuarios.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usuariosRouter);

export default app;
