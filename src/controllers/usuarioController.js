// Controlador para usuarios


import { pool } from "../db.js";
import bcrypt from "bcryptjs";

// Función para obtener todos los usuarios
// 
// GET /api/usuarios
const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.promise().query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

// Función para obtener un usuario por ID
// GET /usuarios/:id
const getUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.promise().query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

// Función para registrar un nuevo usuario
// POST /usuarios
const registrarUsuario = async (req, res) => {
    const { usuario, contrasena, es_admin = 0 } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const contrasenaHash = await bcrypt.hash(contrasena, salt);
        const [result] = await pool.promise().query(
            "INSERT INTO usuarios (usuario, contrasena, es_admin ) VALUES (?, ?, ?)", 
            [usuario, contrasenaHash, es_admin]);
        res.status(201).json({ id_usuario: result.insertId, usuario, es_admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

// Función para autenticar un usuario
// POST /usuarios/login
const autenticarUsuario = async (req, res) => {
    const { usuario, contrasena } = req.body;
    try {
        const [rows] = await pool.promise().query(
            "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?", 
            [usuario, contrasena]
        );
        if (rows.length === 0) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        res.json({ mensaje: "Login exitoso", usuario: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al autenticar el usuario" });
    }
};

// Función para actualizar un usuario
// PATCH /usuarios/:id
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { usuario, contrasena, es_admin } = req.body;
    try {
        const [result] = await pool.promise().query(
            "UPDATE usuarios SET usuario = ?, contrasena = ?, es_admin = ? WHERE id_usuario = ?", 
            [usuario, contrasena, es_admin, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

// Función para eliminar un usuario
// DELETE /usuarios/:id
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.promise().query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};





// Exportar las funciones para ser utilizadas en las rutas
export { 
    getUsuarios, 
    getUsuarioPorId, 
    registrarUsuario, 
    autenticarUsuario, 
    actualizarUsuario, 
    eliminarUsuario 
};
