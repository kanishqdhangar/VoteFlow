type Props = {
  className?: string;
};

export default function Badge({ className = "" }: Props) {
  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        rounded-full
        bg-[#7765DA]/15
        text-[#7765DA]
        text-sm font-semibold
        w-fit
        ${className}
      `}
    >
      <span className="text-base">●</span> Live Poll
    </div>
  );
}
