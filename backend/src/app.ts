import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/poll", pollRoutes);

// Health check (optional but good)
app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

export default app;
