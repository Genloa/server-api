import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios/usuarios.js";
import monedasRouter from "./routes/monedas/monedas.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usuariosRouter);
app.use("/api", monedasRouter);

export default app;
