// Rutas para usuarios
 import { Router } from 'express';

 import { 
    getUsuarios,
    getUsuarioPorId,
    registrarUsuario,
    autenticarUsuario,
    actualizarUsuario,
    eliminarUsuario,
 } from '../controllers/usuarioController.js';

 const router = Router();

 router.get('/usuarios', getUsuarios);
 router.get('/usuarios/:id', getUsuarioPorId);
 router.post('/usuarios', registrarUsuario);
 router.post('/usuarios/login', autenticarUsuario);
 router.patch('/usuarios/:id', actualizarUsuario);
 router.delete('/usuarios/:id', eliminarUsuario);

 export default router;