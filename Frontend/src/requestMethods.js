// Frontend/src/requestMethods.js
import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:8000" : "")
).replace(/\/$/, "");

if (!API_URL) {
  console.error("VITE_API_URL set nahi hai. Vercel Environment Variables check karo.");
}

export const BASE_URL = API_URL;

export const userRequest = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});