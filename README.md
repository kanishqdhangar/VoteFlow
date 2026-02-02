# Live Polling System

A real-time polling application where a teacher can create live polls and students can participate instantly.  
The system uses WebSockets for real-time updates and enforces one vote per student at the database level to ensure correctness and consistency.

This project focuses on real-time system design, backend-first validation, and production deployment.

---

## 🚀 Live Demo

- **Frontend:** https://polling-system-indol.vercel.app/
- **Backend API:** https://polling-system-aa7s.onrender.com

---

## Features

### Teacher
- Create a live poll with custom options and duration
- View live voting results in real time
- Manually end a poll before the timer finishes
- Instantly broadcast poll state changes to all connected students

### Student
- Join a poll without authentication
- Vote in real time
- View results immediately after voting
- Prevented from voting multiple times, even on refresh
- Shown a clear message if a duplicate vote is attempted
- Return to the home screen after the poll ends

---

## Core Engineering Decisions

### Real-Time Communication
- Implemented using Socket.IO
- Poll lifecycle events (start, vote, end) are broadcast instantly
- Backend is the single source of truth

### One Vote per Student (Race-Condition Safe)
- Each student is assigned a persistent `studentId` stored in `localStorage`
- Votes are stored in a separate `Vote` collection
- A compound unique index on `(pollId, studentId)` guarantees:
  - One vote per student per poll
  - Protection against refresh, multiple tabs, and concurrent requests

### Backend-First Validation
- Duplicate vote prevention is enforced at the database level
- Frontend reacts only to backend responses
- Ensures correctness regardless of client-side behavior

### Refresh and Late Join Recovery
- Students joining late or refreshing the page receive the current poll state
- Active polls can be joined immediately
- Completed polls display results correctly

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Socket.IO Client
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Socket.IO
- MongoDB
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Database Design

### Poll
- Question
- Options with vote counts
- Status (ACTIVE / COMPLETED)
- Duration
- Start timestamp

### Vote
- Poll ID
- Student ID
- Option index

A compound unique index ensures one vote per student per poll at the database level.

---

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Known Limitations

- No authentication (intentional design choice)
- Student identity is browser-based using localStorage
- Clearing browser storage allows re-voting
- These tradeoffs keep the system lightweight while focusing on real-time correctness and system design.

---

## Author
Built by  Kanishq Dhangar
