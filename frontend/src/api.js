import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

export const generatePlan = async (userData) => {
  const { data } = await api.post("/api/generate-plan", { userData });
  return data;
};

export const regenerateSlot = async (slot, context) => {
  const { data } = await api.post("/api/regenerate-slot", { slot, context });
  return data;
};

export const checkHealth = async () => {
  const { data } = await api.get("/api/health");
  return data;
};
