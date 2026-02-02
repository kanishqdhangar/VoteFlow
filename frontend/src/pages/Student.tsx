import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { getActivePoll } from "../api/pollApi";
import { usePollTimer } from "../hooks/usePollTimer";

import NameScreen from "../components/student/NameScreen";
import WaitingScreen from "../components/student/WaitingScreen";
import QuestionScreen from "../components/student/QuestionScreen";
import ResultScreen from "../components/student/ResultScreen";

export default function Student() {
  const [studentId, setStudentId] = useState("");
  const [poll, setPoll] = useState<any>(null);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputName, setInputName] = useState("");
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("studentId");

    if (storedId) {
      setStudentId(storedId);
    } else {
      const id = crypto.randomUUID();
      localStorage.setItem("studentId", id);
      setStudentId(id);
    }
  }, []);

  useEffect(() => {
    socket.on("ERROR", (message: string) => {
      if (message.includes("already voted")) {
        setError("You have already voted in this poll.");
      }
    });

    return () => {
      socket.off("ERROR");
    };
  }, []);

  useEffect(() => {
    getActivePoll().then(setPoll);
  }, []);

  useEffect(() => {
    socket.emit("JOIN_POLL", {
      studentId,
      studentName: name,
    });

    socket.on("POLL_STATE", setPoll);
    socket.on("POLL_STARTED", setPoll);
    socket.on("POLL_UPDATED", setPoll);
    socket.on("POLL_ENDED", setPoll);

    return () => {
      socket.off("POLL_STATE");
      socket.off("POLL_STARTED");
      socket.off("POLL_UPDATED");
      socket.off("POLL_ENDED");
    };
  }, [studentId, name]);

  const remaining = usePollTimer(
    poll?.startedAt ?? new Date().toISOString(),
    poll?.duration ?? 0
  );

  // ✅ Reset vote state on new poll
  useEffect(() => {
    if (poll && poll.status === "ACTIVE") {
      setVoted(false);
    }
  }, [poll?._id]);

  const submitVote = (index: number) => {
    if (!poll || voted) return;

    socket.emit("SUBMIT_VOTE", {
      pollId: poll._id,
      studentId,
      optionIndex: index,
    });

    setVoted(true);
  };

  return (
    <div>
      {!name && (
        <NameScreen
          inputName={inputName}
          setInputName={setInputName}
          onContinue={() => setName(inputName.trim())}
        />
      )}

      {name && !poll && <WaitingScreen />}

      {name && poll && poll.status === "ACTIVE" && !voted && (
        <QuestionScreen
          question={poll.question}
          options={poll.options}
          remaining={remaining}
          onVote={submitVote}
        />
      )}

      { name && poll && (voted || poll.status === "COMPLETED") && (
        <ResultScreen
          options={poll.options}
          isPollEnded={poll.status === "COMPLETED"}
          remaining={remaining}
          onExit={() => {
            setName(null);
            setInputName("");
            setPoll(null);
            setVoted(false);
          }}
        />
      )}



      {error && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[320px] text-center shadow-lg">
            <h3 className="text-[16px] font-semibold text-[#373737] mb-2">
              Vote already submitted
            </h3>
            <p className="text-[14px] text-[#6E6E6E] mb-4">
              You have already voted in this poll.
            </p>
            <button
              onClick={() => setError(null)}
              className="px-6 py-2 rounded-full bg-[#7765DA] text-white font-medium"
            >
              Okay
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
