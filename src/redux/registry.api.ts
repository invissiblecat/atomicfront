import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { pick } from "lodash";
import registryContract, { TCreateBox } from "services/root.contract";

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
  }),
});

export const { useCreateBoxMutation } = registryApi;
