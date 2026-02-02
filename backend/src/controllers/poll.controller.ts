import { Request, Response } from "express";
import * as PollService from "../services/poll.service.js";

/**
 * Teacher creates a poll
 */
export async function createPoll(req: Request, res: Response) {
  try {
    const poll = await PollService.createPoll(req.body);
    res.status(201).json(poll);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

/**
 * Used for:
 * - Page refresh
 * - Student late join
 * - Teacher refresh
 */
export async function getActivePoll(req: Request, res: Response) {
  try {
    const poll = await PollService.getActivePoll();
    res.json(poll);
  } catch {
    res.status(500).json({ message: "Failed to fetch active poll" });
  }
}

/**
 * Poll history (Good-to-have / Bonus)
 */
export async function getPollHistory(req: Request, res: Response) {
  try {
    const polls = await PollService.getPollHistory();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch poll history" });
  }
}
