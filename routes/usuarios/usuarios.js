import { Router } from "express";
import db from "../../models/index.js";

const router = Router();
const { Usuario } = db;

router.get("/getUsuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/updateUsuario", async (req, res) => {
  try {
    const usuario = await Usuario.update(
      {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        password: req.body.password,
      },
      { where: { cedula: req.body.cedula } }
    );
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/deleteUsuario", async (req, res) => {
  try {
    await Usuario.destroy({ where: { cedula: req.body.cedula } });
    res.status(200).json({ result: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const usuario = await Usuario.findAll({
      correo: req.body.correo,
      password: req.body.password,
    });
    res.status(201).json({ result: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/auth/register", async (req, res) => {
  try {
    const usuario = await Usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      cedula: req.body.cedula,
      correo: req.body.correo,
      password: req.body.password,
    });
    res.status(201).json({ result: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
