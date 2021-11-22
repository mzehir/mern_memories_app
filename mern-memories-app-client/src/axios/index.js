import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

//! Fonksiyonlar
export const fetchMemories = async () => API.get("/memories");

export const createMemory = async (newMemory) => {
  await API.post("/memories", newMemory);
};
