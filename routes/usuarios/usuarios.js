import { Router } from "express";
import db from "../../models/index.js";

const router = Router();
const { Usuarios } = db;

router.get("/getUsuarios", async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll({
      correo: req.body.correo,
      password: req.body.password,
    });
    res.status(201).json({ result: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
