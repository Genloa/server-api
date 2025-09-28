import jwt from "jsonwebtoken";
import db from "../models/index.js";

export const login = async (req, res) => {
  const { correo, password } = req.body;

  const usuario = await db.Usuario.findOne({ where: { correo } });
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { id: usuario.id, correo: usuario.correo },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(200).json({ token });
};

export const getPerfil = async (req, res) => {
  try {
    const usuario = await db.Usuario.findByPk(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
