import { Router } from "express";
import {
  createPoll,
  getActivePoll,
  getPollHistory,
} from "../controllers/poll.controller.js";

const router = Router();

// Teacher
router.post("/create", createPoll);

// Teacher + Student (refresh / late join)
router.get("/active", getActivePoll);

// Bonus
router.get("/history", getPollHistory);

export default router;
