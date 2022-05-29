import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenService from "../services/token.service";
import { TApplication, User } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ROOT,
    prepareHeaders: (headers) => {
      if (tokenService.tokens) {
        headers.set(
          "authorization",
          `Bearer ${tokenService.tokens.accessToken}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    patchMe: builder.mutation<
      void,
      { twitterHandle: string; telegramHandle: string }
    >({
      query: (body) => ({
        url: `/users/me`,
        method: "PATCH",
        body,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () =>
        `/users/me?filter=${JSON.stringify({
          include: ["applications"],
        })}`,
    }),
    getMyApplicationByIdo: builder.query<TApplication, string>({
      query: (idoId) => `/idos/${idoId}/applications/my`,
    }),
  }),
});

export const {
  usePatchMeMutation,
  useGetMeQuery,
  useGetMyApplicationByIdoQuery,
} = userApi;
