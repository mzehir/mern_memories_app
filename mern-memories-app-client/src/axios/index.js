import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, //! cookie'lerle istek yapabilmek için bu değeri veriyoruz. Artık yapılan isteğin header kısmında withCredentials değerinden ötürü httponlyCookie server'a gönderilmiş olacak. cookie'yi göndermek  için ekstra bir işlem yapmaya gerek yok.
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).accessToken
    }`;
  }

  return req;
});

//! -----------------------------------------------
export const createMemory = async (newMemory) => {
  return await API.post("/memories", newMemory);
};

export const fetchMemories = async () => await API.get("/memories");

export const fetchMemory = async (id) => await API.get(`/memories/${id}`);

export const updateMemory = async (id, updatedMemory) => {
  return await API.put(`/memories/${id}`, updatedMemory);
};

export const deleteMemory = async (id) => await API.delete(`/memories/${id}`);

export const signup = async (formData) =>
  await API.post("/users/signup", formData);

export const signIn = async (formData) =>
  await API.post("/users/signin", formData);

export const logOut = async (id) => await API.get(`/users/logout/${id}`);

export const refreshAccessToken = async (userId) =>
  await API.get(`/users/refresh/${userId}`);
