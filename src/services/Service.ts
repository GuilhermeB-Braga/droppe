import axios, { AxiosInstance } from "axios";

export default class Service {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.BACKEND_BASE_URL || "http://localhost:9090",
    });
  }
}