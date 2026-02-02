export default function WaitingScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      
      {/* Subtle loading indicator */}
      <div className="mb-4 flex items-center gap-2 text-[#7765DA]">
        <span className="w-2 h-2 rounded-full bg-[#7765DA] animate-bounce [animation-delay:-0.2s]" />
        <span className="w-2 h-2 rounded-full bg-[#7765DA] animate-bounce" />
        <span className="w-2 h-2 rounded-full bg-[#7765DA] animate-bounce [animation-delay:0.2s]" />
      </div>

      {/* Text */}
      <p className="text-center text-[15px] text-[#6E6E6E]">
        Waiting for the host to start the next question…
      </p>
    </div>
  );
}
