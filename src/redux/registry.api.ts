import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import registryContract, {TClaim, TCreateBox } from "services/registry.contract";

export const registryApi = createApi({
  reducerPath: "registryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    createBox: builder.mutation<
    null, 
    {box: TCreateBox, contractNetwork: string}
    >({
      async queryFn({box, contractNetwork}): Promise<any> {
        try {
          const tx = await registryContract.createBox({
            props: box,
            contractNetwork: contractNetwork
          });
          await tx.wait()
          return;
        } catch (error) {
          console.error("createBox err: ", error);
          return error;
        }
      },
    }),
    claim: builder.mutation<
    null, 
    {props: TClaim, contractNetwork: string}
    >({
      async queryFn({props, contractNetwork}): Promise<any> {
        try {
          const tx = await registryContract.claimBox({
            props,
            claimNetwork: contractNetwork
          });
          await tx.wait()
          return;
        } catch (error) {
          console.error("claim err: ", error);
          return error;
        }
      },
    }),
    getBox: builder.query<any, {boxId: number, contractNetwork: string}>({
      async queryFn({boxId, contractNetwork}) {
        try {
          const res = await registryContract.getBox({ boxId, contractNetwork });
          return res;
        } catch (error) {
          console.error("getBox err: ", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useCreateBoxMutation, useClaimMutation, useGetBoxQuery} = registryApi;
