import { AuthTokens } from "../types/auth-tokens";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import TokenService from "./token.service";

class ApiService {
  private _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: process.env.REACT_APP_API,
    });
    this._initInterceptor();
  }

  private _initInterceptor = () => {
    this._instance.interceptors.request.use((config) => {
      const tokens = TokenService.tokens;
      if (!tokens) return config;

      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      };
    });
  };

  login = async (signature: string) => {
    const { data } = await this._instance.post<
      AuthTokens,
      AxiosResponse<AuthTokens>,
      { signature: string }
    >("/users/login", {
      signature,
    });
    TokenService.setToken(data);
  };

  refresh = async (tokens: AuthTokens) => {
    const { data } = await this._instance.post<
      AuthTokens,
      AxiosResponse<AuthTokens>,
      AuthTokens
    >(`/refresh`, tokens);
    return data;
  };
}

export default new ApiService();
