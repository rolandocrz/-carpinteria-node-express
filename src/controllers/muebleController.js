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

const createMueble = async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;

    // Validar que el precio sea un número valido y mayor que 0
    if (isNaN(precio) || parseFloat(precio) <= 0) {
      return res.status(400).json({
        success: false,
        message: "El precio debe ser un número válido mayor que cero.",
      });
    }

    // Convertir precio a numero
    const precioNumerico = parseFloat(precio);

    // Insertar el mueble en la base de datos
    const [result] = await pool.query(
      "INSERT INTO muebles (nombre, descripcion, categoria, precio, imagen) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, categoria, precioNumerico, imagen]
    );

    // Regresar el mensaje en caso de exito
    res.status(201).json({
      success: true,
      id_mueble: result.insertId,
      nombre,
      descripcion,
      categoria,
      precio: precioNumerico,
      imagen,
    });
  } catch (error) {
    console.error("Error al crear el mueble:", error);
    // Mensajes de error
    res.status(500).json({
      success: false,
      message: "Error al crear el mueble: " + error.message,
    });
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
