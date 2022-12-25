import axios from "axios";

export const api = axios.create({
  baseURL: 'https://manhwa-tracker.onrender.com/',
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
});
