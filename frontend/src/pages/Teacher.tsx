import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { getActivePoll } from "../api/pollApi";
import { usePollTimer } from "../hooks/usePollTimer";
import LivePollScreen from "../components/teacher/LivePollScreen";
import CreatePollScreen from "../components/teacher/CreatePollScreen";
import Badge from "../components/common/Badge";

export default function Teacher() {
  const [poll, setPoll] = useState<any>(null);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    getActivePoll().then(setPoll);
  }, []);

  useEffect(() => {
    socket.on("POLL_STARTED", setPoll);
    socket.on("POLL_UPDATED", setPoll);
    socket.on("POLL_ENDED", setPoll);

    return () => {
      socket.off("POLL_STARTED");
      socket.off("POLL_UPDATED");
      socket.off("POLL_ENDED");
    };
  }, []);

  const remaining = usePollTimer(
    poll?.startedAt ?? new Date().toISOString(),
    poll?.duration ?? 0
  );

  return (
    <div className="min-h-screen w-full bg-white flex justify-center">
      <div className="w-full max-w-[1100px] px-6 pt-12">

        <div className="flex justify-center mb-10">
          <Badge />
        </div>

        {poll && poll.status === "ACTIVE" ? (
          <LivePollScreen
            question={poll.question}
            options={poll.options}
            remaining={remaining}
            pollId={poll._id}
          />
        ) : (
          <CreatePollScreen
            question={question}
            setQuestion={setQuestion}
            options={options}
            setOptions={setOptions}
            duration={duration}
            setDuration={setDuration}
            onCreate={() => {
              socket.emit("CREATE_POLL", {
                question,
                options: options.map((o) => ({ text: o })), // ✅ FIX
                duration,
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
