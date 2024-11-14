import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';  // Importa fileURLToPath para convertir URL en path
import postRoutes from "./routes/post.js";  // Asegúrate de importar las rutas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Usar fileURLToPath para obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // Obtiene el directorio del archivo

app.use(cors());
app.use(express.json());

// Aquí es donde configuras las rutas
app.use('/api/post', postRoutes);  // Esto conecta tus rutas de post a /api/post

// Servir archivos estáticos (por ejemplo, el index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conexión a la base de datos y ejecución del servidor
async function main() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
  }
}

main();
