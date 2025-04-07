// Controlador de productos (muebles)
import { pool } from "../db.js";

const getMuebles = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM muebles");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMueble = async (req, res) => {};

const getMueblesPorCategoria = async (req, res) => {};

const createMueble = async (req, res) => {};

const updateMueble = async (req, res) => {};

const deleteMueble = async (req, res) => {};

export {
  getMuebles,
  getMueble,
  getMueblesPorCategoria,
  createMueble,
  updateMueble,
  deleteMueble,
};
