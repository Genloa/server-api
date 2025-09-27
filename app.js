import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios/usuarios.js";
import monedasRouter from "./routes/monedas/monedas.js";
import criptoMonedasRouter from "./routes/criptoMonedas/criptoMonedas.js";
import operacionesCriptoRouter from "./routes/operacionesCripto/operacionesCripto.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usuariosRouter);
app.use("/api", monedasRouter);
app.use("/api", criptoMonedasRouter);
app.use("/api", operacionesCriptoRouter);

export default app;
