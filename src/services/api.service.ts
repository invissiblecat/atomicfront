import axios, { AxiosInstance, AxiosResponse } from "axios";
// import { Tokens } from "../redux/types";
import TokenService from "./token.service";

class ApiService {
  // private _instance: AxiosInstance;

  // constructor() {
  //   this._instance = axios.create({
  //     baseURL: process.env.REACT_APP_API_ROOT,
  //   });
  //   this._initInterceptor();
  // }

  // private _initInterceptor = () => {
  //   this._instance.interceptors.request.use((config) => {
  //     const tokens = TokenService.tokens;
  //     if (!tokens) return config;

  //     return {
  //       ...config,
  //       headers: {
  //         ...config.headers,
  //         Authorization: `Bearer ${tokens.accessToken}`,
  //       },
  //     };
  //   });
  // };

  // login = async (signature: string) => {
  //   const { data } = await this._instance.post<
  //     Tokens,
  //     AxiosResponse<Tokens>,
  //     { signature: string }
  //   >("/users/login", {
  //     signature,
  //   });
  //   TokenService.setToken(data);
  // };

  // refresh = async (tokens: Tokens) => {
  //   const { data } = await this._instance.post<
  //     Tokens,
  //     AxiosResponse<Tokens>,
  //     Tokens
  //   >(`/refresh`, tokens);
  //   return data;
  // };

  // getMetaTx = async ({
  //   offchainId,
  //   amount,
  // }: {
  //   offchainId: string;
  //   amount: string;
  // }) => {
  //   const { data } = await this._instance.get<
  //     {
  //       offchainId: string;
  //       amount: string;
  //     },
  //     AxiosResponse<{
  //       r: any;
  //       s: any;
  //       v: any;
  //       functionSignature: string;
  //       signerAddress: string;
  //     }>,
  //     {
  //       offchainId: string;
  //       amount: string;
  //     }
  //   >(`/idos/${offchainId}/getMetaTx?amount=${amount}`);
  //   return data;
  // };
}

export default new ApiService();
