import Poll from "../models/Poll.js";
import Vote from "../models/Vote.js";

/**
 * Create a new poll (Teacher)
 * Rule:
 * - Cannot create if another poll is ACTIVE
 */
export async function createPoll(payload: {
  question: string;
  options: { text: string }[];
  duration: number;
}) {
  const activePoll = await Poll.findOne({ status: "ACTIVE" });

  if (activePoll) {
    throw new Error("An active poll already exists");
  }

  const poll = await Poll.create({
    question: payload.question,
    options: payload.options,
    duration: payload.duration,
    startedAt: new Date(),
  });

  return poll;
}

/**
 * Get currently active poll
 * Used for:
 * - Page refresh
 * - Late student join
 */
export async function getActivePoll() {
  return Poll.findOne({ status: "ACTIVE" });
}

/**
 * Submit vote (Student)
 * Rules:
 * - One vote per student per poll
 * - Server is source of truth
 */
export async function submitVote(params: {
  pollId: string;
  studentId: string;
  optionIndex: number;
}) {
  const { pollId, studentId, optionIndex } = params;
  const poll = await Poll.findById(pollId);

  if (!poll || poll.status === "COMPLETED") {
    throw new Error("Poll is not active or has ended");
  }

  // 🔒 Enforce one vote per student per poll
  try {
    await Vote.create({
      pollId,
      studentId,
      optionIndex,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      throw new Error("You have already voted in this poll");
    }
    throw err;
  }

  // Increment vote count (safe now)
  await Poll.updateOne(
    { _id: pollId },
    { $inc: { [`options.${optionIndex}.voteCount`]: 1 } }
  );

  return true;
}


/**
 * End poll after timer expires
 */
export async function endPoll(pollId: string) {
  await Poll.updateOne(
    { _id: pollId, status: "ACTIVE" },
    { status: "COMPLETED" }
  );
}


export async function getPollHistory() {
  return Poll.find({ status: "COMPLETED" }).sort({ createdAt: -1 });
}

export async function getPollById(pollId: string) {
  return Poll.findById(pollId);
}

