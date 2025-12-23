import axios from "axios";
import { settingsStore } from "store/settingsStore";
const API_URL = import.meta.env.VITE_API_URL;

const direction = settingsStore.getState().direction;

export const _axios = axios.create({
  baseURL: API_URL,
  headers: {
    locale: direction,
    city: localStorage.getItem("city"),
  },
});
