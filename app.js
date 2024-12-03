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
    origin: ['http://localhost:5173', 'https://back-eve.vercel.app'], // Permite ambos orígenes
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

// Ruta para manejar las solicitudes OPTIONS (preflight)
app.options('*', cors()); // Permite solicitudes OPTIONS en todas las rutas

export default app;
