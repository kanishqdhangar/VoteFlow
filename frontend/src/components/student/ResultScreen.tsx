type Props = {
  options: { text: string; voteCount: number }[];
  isPollEnded: boolean;
  remaining: number;
  onExit: () => void;
};


export default function ResultScreen({
  options,
  isPollEnded,
  remaining,
  onExit,
}: Props) {
  const total = options.reduce(
    (sum, o) => sum + o.voteCount,
    0
  );

  return (
    <div className="min-h-screen w-full flex justify-center pt-20 px-6">
      <div className="w-full max-w-[640px]">

        {/* Alert ONLY when poll has ended */}
        {isPollEnded && (
          <div className="mb-6 rounded-xl bg-[#7765DA]/10 border border-[#7765DA]/30 px-4 py-3">
            <p className="text-[14px] font-medium text-[#7765DA] text-center">
              This poll has ended
            </p>
          </div>
        )}

        {/* Timer ONLY when poll is active */}
        {!isPollEnded && (
          <div className="flex justify-end mb-4 text-[14px] font-medium text-red-500">
            ⏱ {remaining}s
          </div>
        )}

        <h3 className="text-[18px] font-semibold text-[#373737] mb-6">
          Poll Results
        </h3>

        <div className="border border-[#E0E0E0] rounded-[14px] bg-white p-6 space-y-4 shadow-sm mb-8">
          {options.map((opt, idx) => {
            const percent = total
              ? Math.round((opt.voteCount / total) * 100)
              : 0;

            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#373737]">
                    {opt.text}
                  </span>
                  <span className="text-[14px] font-semibold text-[#7765DA]">
                    {percent}%
                  </span>
                </div>

                <div className="w-full h-[8px] rounded-full bg-[#F2F2F2] overflow-hidden">
                  <div
                    className="h-full bg-[#7765DA] rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Back button ONLY when poll has ended */}
        {isPollEnded && (
          <div className="flex justify-center">
            <button
              onClick={onExit}
              className="px-8 py-3 rounded-full bg-[#7765DA]
                         text-white font-semibold text-[15px]
                         hover:opacity-90 transition"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
