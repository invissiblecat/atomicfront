// import { Tokens } from "../redux/types";
import apiService from "./api.service";

export const ONE_HOUR = 3600000 as const;

class TokenService {
  // static storageName: string = "tokens";

  // get tokens(): Tokens | null {
  //   const stringTokens = localStorage.getItem(TokenService.storageName);
  //   if (stringTokens) {
  //     return JSON.parse(stringTokens);
  //   }
  //   return null;
  // }
  // async updateToken(): Promise<void> {
  //   if (this.tokens) {
  //     const tokens = await apiService.refresh(this.tokens);
  //     this.setToken(tokens);
  //   }
  // }

  // setToken(tokens: Tokens): void {
  //   localStorage.setItem(TokenService.storageName, JSON.stringify(tokens));
  // }

  // removeToken(): void {
  //   localStorage.removeItem(TokenService.storageName);
  // }
}

export default new TokenService();
