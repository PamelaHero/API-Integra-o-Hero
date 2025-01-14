import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });

    // this.client.interceptors.request.use((config) => {
    //   const token = localStorage.getItem("access_token");
    //   if (token) config.headers.Authorization = `Bearer ${token}`;
    //   return config;
    // });
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config).then((response) => response.data);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config).then((response) => response.data);
  }
}

export default HttpClient;
