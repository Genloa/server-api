import { Router } from "express";
import db from "../../models/index.js";
import criptoMonedas from "../../models/criptoMonedas.js";

const router = Router();
const { CriptoMoneda } = db;

router.post("/createCriptoMoneda", async (req, res) => {
  try {
    const criptoMoneda = await CriptoMoneda.create({
      nombre: req.body.nombre,
      codigo: req.body.codigo,
      precio: req.body.precio,
      monedaId: req.body.monedaId,
    });
    if (!criptoMoneda) {
      res.status(200).json({ message: "No se pudo crear criptomoneda" });
    } else {
      res.status(200).json({ message: "Criptomoneda creada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getCriptoMonedas", async (req, res) => {
  try {
    const CriptoMonedas = await CriptoMoneda.findAll({
      include: [{ model: db.Moneda, as: "moneda" }],
    });
    res.status(200).json(CriptoMonedas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/getCriptoMonedasByCodigoMoneda", async (req, res) => {
  try {
    const criptoMonedas = await db.CriptoMoneda.findAll({
      include: [
        {
          model: db.Moneda,
          as: "moneda",
          where: { codigo: req.body.codigo },
        },
      ],
    });

    if (criptoMonedas.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron criptomonedas para esa moneda" });
    }

    res.status(200).json(criptoMonedas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateCriptoMoneda", async (req, res) => {
  try {
    const criptoMoneda = await CriptoMoneda.update(
      {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        precio: req.body.precio,
        monedaId: req.body.monedaId,
      },
      { where: { codigo: req.body.codigo } }
    );
    if (!criptoMoneda) {
      res.status(200).json({ message: "Criptomoneda no encontrada" });
    } else {
      res
        .status(200)
        .json({ message: "Criptomoneda actualizada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteCriptoMoneda", async (req, res) => {
  try {
    const criptoMoneda = await CriptoMoneda.destroy({
      where: { codigo: req.body.codigo },
    });
    if (!criptoMoneda) {
      res.status(200).json({ message: "Criptomoneda no encontrada" });
    } else {
      res.status(200).json({ message: "Criptomoneda eliminada correctamente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
