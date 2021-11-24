import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

//! Fonksiyonlar
export const createMemory = async (newMemory) => {
  await API.post("/memories", newMemory);
};

export const fetchMemories = async () => API.get("/memories");

export const fetchMemory = async (id) => API.get(`/memories/${id}`);

export const updateMemory = async (id, updatedMemory) => {
  await API.put(`/memories/${id}`, updatedMemory);
};

export const deleteMemory = async (id) => API.delete(`/memories/${id}`);
