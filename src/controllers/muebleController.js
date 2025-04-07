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

const getMueble = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM muebles WHERE id_mueble = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Mueble no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
