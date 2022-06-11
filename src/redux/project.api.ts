import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProjectResponseData, TProjectRequestData, TSetReciever } from "./types";

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
        setRecipient: builder.mutation<TProjectResponseData, TSetReciever>({
          query: ({ id, reciever}) => ({
            url: `/boxes/${id}`,
            method: "PATCH",
            body: {reciever},
          }),
        }),
    })

});

export const {useCreateBoxMutation, useGetBoxBySenderQuery, useGetBoxesQuery, useGetBoxByIdQuery, useSetRecipientMutation} = projectApi;