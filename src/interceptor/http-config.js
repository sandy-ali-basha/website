import axios from "axios";
import { settingsStore } from "store/settingsStore";

const { REACT_APP_API_URL } = process.env;

const direction = settingsStore.getState().direction;

export const _axios = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'lang': direction
  }
});
