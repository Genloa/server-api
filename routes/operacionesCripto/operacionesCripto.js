import { Router } from "express";
import db from "../../models/index.js";

const router = Router();
const { OperacionesCripto } = db;

router.post("/createOperacionCripto", async (req, res) => {
  try {
    const { usuarioId, criptoMonedaId, operacion, cantidad, estado } = req.body;

    const cripto = await db.CriptoMoneda.findByPk(criptoMonedaId);

    if (!cripto) {
      return res.status(404).json({ message: "Criptomoneda no encontrada" });
    }
    const operacionCripto = await db.OperacionesCripto.create({
      usuarioId,
      criptoMonedaId,
      operacion,
      cantidad,
      precioUnitario: cripto.precio,
      estado: estado || "pendiente",
    });

    res.status(201).json({ message: "Operación creada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getOperacionesCripto", async (req, res) => {
  try {
    const operacionesCripto = await OperacionesCripto.findAll();
    res.status(200).json(operacionesCripto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateOperacionCripto", async (req, res) => {
  try {
    const operacionCripto = await OperacionesCripto.update(
      {
        estado: req.body.estado,
      },
      { where: { id: req.body.id } }
    );
    if (!operacionCripto) {
      res.status(200).json({ message: "Operación no encontrada" });
    } else {
      res.status(200).json({ message: "Operación actualizada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteOperacionCripto", async (req, res) => {
  try {
    const operacionCripto = await OperacionesCripto.destroy({
      where: { id: req.body.id },
    });
    if (!operacionCripto) {
      res.status(200).json({ message: "Operación no encontrada" });
    } else {
      res.status(200).json({ message: "Operación eliminada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
