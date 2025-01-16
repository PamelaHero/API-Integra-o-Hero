import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "./token";


class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
    
    getAccessToken().then((token)=>{
      this.client.interceptors.request.use((config) => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
          config.headers.Accept = "application/json"
        }
        return config;
      });
  
      // this.client.interceptors.response.use(
      //   (response: AxiosResponse) => response,
      //   // (error: AxiosError) => this.handleResponseError(error)
      // );
    })
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config).then((response) => response.data);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config).then((response) => response.data);
  }
}

export default HttpClient;
