import { Server, Socket } from "socket.io";
import * as PollService from "../services/poll.service.js";
import { startPollTimer } from "../utils/pollTimer.js";

export default function registerPollSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 Socket connected:", socket.id);

    /**
     * STUDENT / TEACHER joins
     * Used for:
     * - late join
     * - refresh recovery
     */
    socket.on("JOIN_POLL", async () => {
      try {
        const poll = await PollService.getActivePoll();
        socket.emit("POLL_STATE", poll);
      } catch {
        socket.emit("ERROR", "Failed to fetch poll state");
      }
    });

    /**
     * TEACHER creates poll
     */
    socket.on("CREATE_POLL", async (payload) => {
      try {
        const poll = await PollService.createPoll(payload);

        io.emit("POLL_STARTED", poll);

        // ⏱ Start server-side timer
        startPollTimer(io, poll._id.toString(), poll.duration);
      } catch (err: any) {
        socket.emit("ERROR", err.message);
      }
    });
    
    /**
     * TEACHER ends poll manually
     */
    socket.on("END_POLL", async ({ pollId }) => {
      try {
        await PollService.endPoll(pollId);

        const endedPoll = await PollService.getPollById(pollId);
        io.emit("POLL_ENDED", endedPoll);
      } catch (err: any) {
        socket.emit("ERROR", err.message);
      }
    });


    /**
     * STUDENT submits vote
     */
    socket.on("SUBMIT_VOTE", async (payload) => {
      if (!payload?.pollId || !payload?.studentId) return;
      try {
        await PollService.submitVote(payload);
        const updatedPoll = await PollService.getActivePoll();
        io.emit("POLL_UPDATED", updatedPoll);
      } catch (err: any) {
        socket.emit("ERROR", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
}
