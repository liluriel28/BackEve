import express from "express";
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();

// Configuración de CORS
app.use(
  cors({
    credentials: true, // Permite el manejo de cookies
    origin: ['http://localhost:5173', 'https://back-eve.vercel.app', 'https://cc67-189-190-165-116.ngrok-free.app/ '], // Permite ambos orígenes
    methods: ['GET', 'POST', 'OPTIONS'], // Asegúrate de permitir todos los métodos que tu API necesite
    allowedHeaders: ['Content-Type', 'Authorization'], // Asegúrate de permitir los encabezados que tu API necesita
  })
);

// Manejo de solicitudes OPTIONS
app.options('*', cors()); // Permite solicitudes OPTIONS en todas las rutas

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;