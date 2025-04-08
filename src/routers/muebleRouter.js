// Ruta para productos (muebles)
import { Router } from "express";
import multer from "multer";
import {
  getMuebles,
  getMueble,
  getMueblesPorCategoria,
  createMueble,
  updateMueble,
  deleteMueble,
} from "../controllers/muebleController.js";

// Configuracion de Multer para la subida de imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // destino de la imagen
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage });

const router = Router();

// GET todos los muebles - /api/muebles
router.get("/muebles", getMuebles);

// GET muebles por categoría - /api/muebles/categoria/sillas
router.get("/muebles/categoria/:categoria", getMueblesPorCategoria);

// GET un mueble por ID - /api/muebles/5
router.get("/muebles/:id", getMueble);

// POST crear nuevo mueble - /api/muebles
router.post("/muebles", upload.single("imagen"), createMueble);

// PATCH actualizar mueble - /api/muebles/:id
router.patch("/muebles/:id", upload.single("imagen"), updateMueble);

// DELETE eliminar mueble - /api/muebles/5
router.delete("/muebles/:id", deleteMueble);

export default router;
