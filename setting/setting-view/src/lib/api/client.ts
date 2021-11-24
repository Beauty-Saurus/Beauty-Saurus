import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

export default client;
