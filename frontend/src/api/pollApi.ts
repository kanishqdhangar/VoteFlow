import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getActivePoll = async () => {
  const res = await api.get("/poll/active");
  return res.data;
};

export const getPollHistory = async () => {
  const res = await api.get("/poll/history");
  return res.data;
};
