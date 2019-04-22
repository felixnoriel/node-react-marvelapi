import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from "axios";

export default class APIClient {
  axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL
    });
  }

  makeRequest(req: AxiosRequestConfig): AxiosPromise {
    return this.axiosInstance(req);
  }
}
