import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/authRoutes.js";
import manuscriptRoutes from "./routes/manuscriptRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Connect to Database
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public')); // Serve static files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/manuscripts", manuscriptRoutes);
app.use('/api/articles', articleRoutes);

// Error handling
app.use(errorHandler);

export default app;
