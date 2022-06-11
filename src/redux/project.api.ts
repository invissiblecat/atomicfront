import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProjectResponseData, TProjectRequestData } from "./types";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API, 
    }),
    endpoints: (builder) => ({
        createBox: builder.mutation<TProjectResponseData, TProjectRequestData>({
            query: (projectData) => ({
              url: "/boxes",
              method: "POST",
              body: projectData,
            }),
          }),
        getBoxBySender: builder.query<TProjectResponseData[], string>({
          query: (address) =>
            `/boxes?filter=${JSON.stringify({
              where: {and: [{sender: address}, {status: 'not deployed'}]}
            })}`,
        }),
        getBoxes: builder.query<TProjectResponseData[], void>({
          query: () =>
            `/boxes`,
        }),
        getBoxById: builder.query<TProjectResponseData, string>({
          query: (id) =>
            `/boxes/${id}`,
        }),
        patchBox: builder.mutation<TProjectResponseData, {id: string, body: Partial<TProjectResponseData>}>({
          query: ({ id, body}) => ({
            url: `/boxes/${id}`,
            method: "PATCH",
            body: body,
          }),
        }),
    })

});

export const {useCreateBoxMutation, useGetBoxBySenderQuery, useGetBoxesQuery, useGetBoxByIdQuery, usePatchBoxMutation} = projectApi;