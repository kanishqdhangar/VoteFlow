type Props = {
  question: string;
  setQuestion: (v: string) => void;
  options: string[];
  setOptions: (v: string[]) => void;
  duration: number;
  setDuration: (v: number) => void;
  onCreate: () => void;
};

export default function CreatePollScreen({
  question,
  setQuestion,
  options,
  setOptions,
  duration,
  setDuration,
  onCreate,
}: Props) {
  return (
    <div className="w-full max-w-[720px] mx-auto">

      {/* Title */}
      <h2 className="text-[20px] font-semibold text-[#373737] mb-6">
        Create New Poll
      </h2>

      {/* Card */}
      <div className="border border-[#E0E0E0] rounded-2xl bg-white p-6">

        {/* Question */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-[#373737] mb-2">
            Question
          </label>
          <input
            className="w-full h-[52px] px-4 rounded-xl bg-[#F2F2F2]
                       text-[15px] text-[#373737]
                       placeholder:text-[#6E6E6E]
                       outline-none focus:ring-2 focus:ring-[#7765DA]/20"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="mb-4 space-y-3">
          <label className="block text-[14px] font-medium text-[#373737]">
            Options
          </label>

          {options.map((opt, idx) => (
            <input
              key={idx}
              className="w-full h-[48px] px-4 rounded-xl bg-[#F2F2F2]
                         text-[15px] text-[#373737]
                         placeholder:text-[#6E6E6E]
                         outline-none focus:ring-2 focus:ring-[#7765DA]/20"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const copy = [...options];
                copy[idx] = e.target.value;
                setOptions(copy);
              }}
            />
          ))}
        </div>

        {/* Add option */}
        <button
          type="button"
          onClick={() => setOptions([...options, ""])}
          className="text-[14px] font-medium text-[#7765DA] mb-6"
        >
          + Add option
        </button>

        {/* Duration */}
        <div className="mb-8">
          <label className="block text-[14px] font-medium text-[#373737] mb-2">
            Duration (seconds)
          </label>
          <input
            type="number"
            className="w-[180px] h-[48px] px-4 rounded-xl bg-[#F2F2F2]
                       text-[15px] text-[#373737]
                       outline-none focus:ring-2 focus:ring-[#7765DA]/20"
            value={duration}
            onChange={(e) => setDuration(+e.target.value)}
          />
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            disabled={
              !question.trim() ||
              options.some((o) => !o.trim())
            }
            onClick={onCreate}
            className="h-[52px] px-14 rounded-full bg-[#7765DA]
                      text-white text-[16px] font-semibold
                      hover:opacity-90 transition
                      disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Start Poll
          </button>

        </div>
      </div>
    </div>
  );
}
