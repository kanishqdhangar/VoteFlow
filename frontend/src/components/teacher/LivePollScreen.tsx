import { socket } from "../../socket/socket";

type Props = {
  question: string;
  options: any[];
  remaining: number;
  pollId: string;
};

export default function LivePollScreen({
  question,
  options,
  remaining,
  pollId
}: Props) {
  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-16 px-6">
      <div className="w-full max-w-180">

        {/* Card */}
        <div className="border border-[#E0E0E0] rounded-2xl bg-white p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-[#373737]">
              Live Poll
            </h2>

            <span className="text-[14px] font-medium text-[#6E6E6E]">
              ⏱ {remaining}s
            </span>
            <button
              onClick={() => socket.emit("END_POLL", { pollId })}
              className="px-4 py-2 rounded-full
                        bg-red-500 text-white text-sm font-semibold
                        hover:bg-red-600 transition"
            >
              End Poll
            </button>
          </div>

          {/* Question */}
          <h3 className="text-[16px] font-medium text-[#373737] mb-6">
            {question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {options.map((opt: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between
                           px-4 py-3 rounded-[10px]
                           bg-[#F2F2F2]"
              >
                <span className="text-[15px] text-[#373737]">
                  {opt.text}
                </span>

                <span className="text-[14px] font-semibold text-[#7765DA]">
                  {opt.voteCount} votes
                </span>
              </div>
            ))}
          </div>

          {/* Status */}
          <p className="text-[14px] text-[#6E6E6E] italic">
            Waiting for poll to complete…
          </p>
        </div>
      </div>
    </div>
  );
}
