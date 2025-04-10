import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Importacion de rutas
import mueblesRoutes from "./routers/muebleRouter.js";
import usuarioRoutes from "./routers/usuarioRoutes.js";

// Crear instancia express
const app = express();

// Configuracion de la carpeta de subida de imagenes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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

// uso de las rutas
app.use(express.json());
app.use("/api", mueblesRoutes);
app.use("/api", usuarioRoutes);

// ruta raiz
app.get("/", (req, res) => {
  res.send("Probando");
});

// Escuchar Puerto
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
