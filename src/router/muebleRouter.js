// Ruta para productos (muebles)
import { Router } from "express";
import {
  getMuebles,
  getMueble,
  getMueblesPorCategoria,
  createMueble,
  updateMueble,
  deleteMueble,
} from "../controllers/mueblesController.js";

const router = Router();

// GET todos los muebles - /api/muebles
router.get("/muebles", getMuebles);

// GET muebles por categoría - /api/muebles/categoria/sillas
router.get("/muebles/categoria/:categoria", getMueblesPorCategoria);

// GET un mueble por ID - /api/muebles/5
router.get("/muebles/:id", getMueble);

// POST crear nuevo mueble - /api/muebles
router.post("/muebles", createMueble);

// PATCH actualizar mueble - /api/muebles/5
router.patch("/muebles/:id", updateMueble);

// DELETE eliminar mueble - /api/muebles/5
router.delete("/muebles/:id", deleteMueble);

export default router;
