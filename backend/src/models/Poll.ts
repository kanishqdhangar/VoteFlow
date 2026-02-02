import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
});

const PollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    duration: { type: Number, default: 60 }, // seconds
    startedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Poll", PollSchema);
