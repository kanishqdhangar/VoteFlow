import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    optionIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// 🔒 HARD DB-LEVEL GUARANTEE
VoteSchema.index({ pollId: 1, studentId: 1 }, { unique: true });

export default mongoose.model("Vote", VoteSchema);
