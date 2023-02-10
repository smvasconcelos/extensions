import axios from "axios";

export const api = axios.create({
  baseURL: 'https://manhwa-tracker.onrender.com/',
  timeout: 20000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
});
