import express from "express";

// Importacion de rutas
import mueblesRoutes from "./routers/muebleRouter.js";
import usuarioRoutes from "./routers/usuarioRoutes.js";

// Crear instancia express
const app = express();

// uso de las rutas
app.use(express.json());
app.use("/api", mueblesRoutes);
app.use("/api", usuarioRoutes);

// Politicas CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ruta raiz
app.get("/", (req, res) => {
  res.send("Probando");
});

// Escuchar Puerto
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
