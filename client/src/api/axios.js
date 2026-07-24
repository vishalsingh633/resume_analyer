import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-analyer-cwmr.onrender.com/api",
});

export default api;