import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import postRoutes from "./routes/post.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); 
app.use(express.json());
app.use('/api/post', postRoutes);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
