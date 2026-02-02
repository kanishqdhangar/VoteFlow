type Props = {
  children: React.ReactNode;
};

export default function CardWrapper({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
      <div className="w-105 bg-white rounded-xl px-6 py-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
