import axios from "axios";

export const userRequest = axios.create({
  baseURL: "https://mbcosmetics.onrender.com/api/v1",
});