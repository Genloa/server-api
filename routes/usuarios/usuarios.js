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

router.put("/updateUsuario", async (req, res) => {
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
    if (!usuario) {
      res.status(200).json({ message: "Usuario no encontrada" });
    } else {
      res.status(200).json({ message: "Usuario actualizada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteUsuario", async (req, res) => {
  try {
    const Usuario = await Usuario.destroy({
      where: { cedula: req.body.cedula },
    });
    if (!usuario) {
      res.status(200).json({ message: "Usuario no encontrada" });
    } else {
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    }
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
    if (!usuario) {
      res.status(200).json({ message: "Datos incorrectos" });
    } else {
      res.status(200).json({ message: "Datos Correctos" });
    }
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
    if (!usuario) {
      res.status(200).json({ message: "No se pudo crear Usuario" });
    } else {
      res.status(200).json({ message: "Usuario creado correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
