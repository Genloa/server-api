import { Router } from "express";
import jwt from "jsonwebtoken";
import db from "../../models/index.js";
import bcrypt from "bcrypt";
import { verificarToken } from "../../middlewares/verificarToken.js";

const router = Router();
const { Usuario } = db;

router.get("/getUsuarios", verificarToken, async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateUsuario", verificarToken, async (req, res) => {
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

router.delete("/deleteUsuario", verificarToken, async (req, res) => {
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
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ message: "Correo no registrado" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/auth/register", async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const usuario = await Usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      cedula: req.body.cedula,
      correo: req.body.correo,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
