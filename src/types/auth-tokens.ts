/**
 * @param accessExpiresIn in milliseconds
 * @param refreshExpiresIn in milliseconds
 */
export type AuthTokens = {
  refreshToken: string;
  accessToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
};
