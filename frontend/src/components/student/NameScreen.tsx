import Badge from "../common/Badge";

type Props = {
  inputName: string;
  setInputName: (v: string) => void;
  onContinue: () => void;
};

export default function NameScreen({
  inputName,
  setInputName,
  onContinue,
}: Props) {
  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

    {/* Global Badge */}
    <Badge className="mb-10" />

    {/* Heading */}
    <h1 className="text-[40px] leading-12 text-[#373737] mb-4 text-center">
      <span className="font-normal">Let’s </span>
      <span className="font-bold">Get Started</span>
    </h1>

    {/* Subtitle */}
    <p className="text-[#6E6E6E] text-[16px] leading-6wmax-w-130-center mb-10">
      If you’re a student, you’ll be able to{" "}
      <span className="font-semibold text-[#373737]">
        submit your answers
      </span>
      , participate in live polls, and see how your responses compare with
      your classmates.
    </p>

    {/* Input */}
    <div className="w-full max-w-105 flex flex-col items-start mb-10">
      <label className="text-[14px] font-medium text-[#373737] mb-2">
        Enter your Name
      </label>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Rahul Bajaj"
        className="
          w-full h-14 px-4 rounded-xl
          bg-[#F2F2F2]
          text-[15px] text-[#373737]
          placeholder:text-[#6E6E6E]
          outline-none
          focus:ring-2 focus:ring-[#7765DA]/20
          transition
        "
      />
    </div>

    {/* Button */}
    <button
      disabled={!inputName.trim()}
      onClick={onContinue}
      className="
        h-14 px-16 rounded-full
        bg-[#7765DA]
        text-white text-[16px] font-semibold
        shadow-md shadow-[#7765DA]/20
        hover:opacity-90
        disabled:opacity-40 disabled:cursor-not-allowed
        transition
      "
    >
      Continue
    </button>
  </div>
);

}
