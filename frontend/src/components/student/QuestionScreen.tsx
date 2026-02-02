type Props = {
  question: string;
  options: { text: string }[];
  remaining: number;
  onVote: (index: number) => void;
};

export default function QuestionScreen({
  question,
  options,
  remaining,
  onVote,
}: Props) {
  const seconds = Math.max(0, remaining);

  return (
    <div className="min-h-screen w-full flex justify-center pt-20 px-6">
      <div className="w-full max-w-[640px]">

        {/* Meta row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[14px] font-medium text-[#6E6E6E]">
            Question
          </span>

          <div className="flex items-center gap-1 text-[14px] font-semibold text-red-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" />
            </svg>
            {seconds}s
          </div>
        </div>

        {/* Card */}
        <div className="border border-[#7765DA] rounded-[14px] overflow-hidden bg-white shadow-sm">

          {/* Question header */}
          <div className="bg-[#373737] px-6 py-4">
            <h3 className="text-white text-[16px] font-medium leading-snug">
              {question}
            </h3>
          </div>

          {/* Options */}
          <div className="p-6 space-y-4">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onVote(idx)}
                className="
                  w-full flex items-center gap-4 px-5 py-4
                  border border-[#E0E0E0] rounded-xl
                  bg-[#F2F2F2]
                  transition-all duration-200
                  hover:border-[#7765DA]
                  hover:-translate-y-[1px]
                  hover:shadow-sm
                  active:translate-y-0
                "
              >
                <span className="w-7 h-7 rounded-full flex items-center justify-center
                                 text-[13px] font-semibold text-white
                                 bg-[#7765DA] shrink-0">
                  {idx + 1}
                </span>

                <span className="text-[15px] text-[#373737] text-left">
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
