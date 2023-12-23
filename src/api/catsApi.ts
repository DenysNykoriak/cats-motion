import axios from "axios";

export const catsApi = axios.create({
  baseURL: process.env.CATS_BASE_URL,
  headers: {
    "x-api-key": process.env.CATS_API_KEY,
  },
});
