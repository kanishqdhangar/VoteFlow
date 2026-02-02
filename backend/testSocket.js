import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("CREATE_POLL", {
    question: "Timer socket test",
    options: [{ text: "Yes" }, { text: "No" }],
    duration: 120
  });
});

socket.on("POLL_STATE", (poll) => {
  console.log("POLL_STATE:", poll);
});

socket.on("POLL_STARTED", (poll) => {
  console.log("POLL_STARTED:", poll);
});

socket.on("POLL_UPDATED", (poll) => {
  console.log("POLL_UPDATED:", poll);
});

socket.on("POLL_ENDED", (poll) => {
  console.log("POLL_ENDED:", poll);
});

socket.on("ERROR", (err) => {
  console.error("ERROR:", err);
});

socket.emit("SUBMIT_VOTE", {
  pollId: "697a5b9395566f1c00b85ee4",
  studentId: "student-2",
  optionIndex: 1
});

socket.emit("SUBMIT_VOTE", {
  pollId: "697a5b9395566f1c00b85ee4",
  studentId: "student-3",
  optionIndex: 1
});
