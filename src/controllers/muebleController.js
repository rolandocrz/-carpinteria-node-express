// Controlador de productos (muebles)
import { pool } from "../db.js";

// Funcion para obtener todos los muebles
const getMuebles = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM muebles");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funcion para obtener un mueble por ID
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

// Funcion para obtener muebles por categoria
const getMueblesPorCategoria = async (req, res) => {};

// Funcion para crear un nuevo mueble
const createMueble = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const [result] = await pool.query(
      "INSERT INTO muebles (nombre, descripcion, categoria, precio, imagen) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, categoria, precio, imagen]
    );
    res.status(201).json({
      id_mueble: result.insertId,
      nombre,
      descripcion,
      categoria,
      precio,
      imagen,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funcion para actualizar un mueble
const updateMueble = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, categoria, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      `UPDATE muebles SET 
        nombre = IFNULL(?, nombre),
        descripcion = IFNULL(?, descripcion),
        categoria = IFNULL(?, categoria),
        precio = IFNULL(?, precio),
        imagen = IFNULL(?, imagen)
       WHERE id_mueble = ?`,
      [nombre, descripcion, categoria, precio, imagen, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mueble no encontrado" });
    }

    const [updatedMueble] = await pool.query(
      "SELECT * FROM muebles WHERE id_mueble = ?",
      [id]
    );

    res.json(updatedMueble[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funcion para eliminar un mueble
const deleteMueble = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el mueble existe
    const [existe] = await pool.query(
      "SELECT * FROM muebles WHERE id_mueble = ?",
      [id]
    );

    if (existe.length === 0) {
      return res.status(404).json({ message: "Mueble no encontrado" });
    }

    // Eliminar el mueble
    await pool.query("DELETE FROM muebles WHERE id_mueble = ?", [id]);

    res.status(200).json({ message: "Mueble eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getMuebles,
  getMueble,
  getMueblesPorCategoria,
  createMueble,
  updateMueble,
  deleteMueble,
};
