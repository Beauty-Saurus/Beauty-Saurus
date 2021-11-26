import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5001",
});

export default client;
