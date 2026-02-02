import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6">
      
      {/* Badge */}
      <div className="mb-10 px-6 py-2 rounded-full bg-[#7765DA]/15 text-[#7765DA] 
                      text-sm font-semibold flex items-center gap-2">
        <span className="text-base">●</span> Live Poll
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl font-medium text-[#1A1A1A] mb-4 text-center">
        Welcome to the <span className="font-bold">Live Polling Platform</span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm mb-16 text-center max-w-lg leading-relaxed">
        Select your role to start participating in or hosting real-time polls
      </p>

      {/* Selection Area */}
      <div className="flex flex-col md:flex-row gap-8 mb-16 w-full max-w-4xl justify-center">
        
        {/* Student Option */}
        <button
          onClick={() => setRole("student")}
          className={`w-full md:w-[320px] p-8 rounded-xl border text-left 
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-xl
            ${
              role === "student"
                ? "border-[#7765DA] ring-2 ring-[#7765DA]/30"
                : "border-gray-200"
            }`}
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            I’m a Student
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Join live polls, submit responses, and see results update instantly.
          </p>
        </button>

        {/* Teacher Option */}
        <button
          onClick={() => setRole("teacher")}
          className={`w-full md:w-[320px] p-8 rounded-xl border text-left 
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-xl
            ${
              role === "teacher"
                ? "border-[#7765DA] ring-2 ring-[#7765DA]/30"
                : "border-gray-200"
            }`}
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            I’m a Host
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Create polls, manage sessions, and view results in real time.
          </p>
        </button>
      </div>

      {/* Continue Button */}
      <button
        disabled={!role}
        onClick={() => navigate(`/${role}`)}
        className="px-16 py-3.5 rounded-2xl text-white font-semibold text-lg 
                  bg-[#7765DA] hover:opacity-90 transition-opacity
                  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
