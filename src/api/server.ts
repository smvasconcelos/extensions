import axios from "axios";
const AMBIENT = import.meta.env.VITE_AMBIENT;

export const api = axios.create({
  baseURL: 'http://15.228.192.247:8080/',
  timeout: 20000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
});
