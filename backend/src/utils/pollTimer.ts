import { Server } from "socket.io";
import * as PollService from "../services/poll.service.js";

let activeTimer: NodeJS.Timeout | null = null;

export function startPollTimer(
  io: Server,
  pollId: string,
  duration: number
) {
  console.log("⏱️ Starting poll timer:", pollId, "for", duration, "seconds");

  if (activeTimer) {
    clearTimeout(activeTimer);
  }

  activeTimer = setTimeout(async () => {
    console.log("⏱️ Timer expired for poll:", pollId);

    await PollService.endPoll(pollId);

    const completedPoll = await PollService.getPollById(pollId);

    io.emit("POLL_ENDED", completedPoll);

    activeTimer = null;
  }, duration * 1000);
}
