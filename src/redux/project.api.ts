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
        getBox: builder.query<TProjectResponseData[], {where: any}>({
          query: (where) =>
            `/boxes?filter=${JSON.stringify(where)}`,
        }),
        getBoxes: builder.query<TProjectResponseData[], {where: any}>({
          query: (where) =>
            `/boxes?filter=${JSON.stringify(where)}`,
        }),
        getBoxById: builder.query<TProjectResponseData, string>({
          query: (id) => ({
            url: `/boxes/${id}`,
            method: 'GET'
          }
          )
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

export const {useCreateBoxMutation, useGetBoxQuery, useGetBoxesQuery, useGetBoxByIdQuery, usePatchBoxMutation} = projectApi;