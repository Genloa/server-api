import { Router } from "express";
import db from "../../models/index.js";

const router = Router();
const { Moneda } = db;

router.post("/createMoneda", async (req, res) => {
  try {
    const moneda = await Moneda.create({
      nombre: req.body.nombre,
      codigo: req.body.codigo,
      simbolo: req.body.simbolo,
    });
    if (!moneda) {
      res.status(200).json({ message: "No se pudo crear moneda" });
    } else {
      res.status(200).json({ message: "Moneda creada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getMonedas", async (req, res) => {
  try {
    const Monedas = await Moneda.findAll();
    res.status(200).json(Monedas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateMoneda", async (req, res) => {
  try {
    const moneda = await Moneda.update(
      {
        nombre: req.body.nombre,
        simbolo: req.body.simbolo,
        precioUSD: req.body.precioUSD,
      },
      { where: { codigo: req.body.codigo } }
    );
    if (!moneda) {
      res.status(200).json({ message: "Moneda no encontrada" });
    } else {
      res.status(200).json({ message: "Moneda actualizada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteMoneda", async (req, res) => {
  try {
    const moneda = await Moneda.destroy({ where: { codigo: req.body.codigo } });
    if (!moneda) {
      res.status(200).json({ message: "Moneda no encontrada" });
    } else {
      res.status(200).json({ message: "Moneda eliminada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
