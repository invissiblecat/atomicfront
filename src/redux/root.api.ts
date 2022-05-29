import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { pick } from "lodash";
import rootContract, { TBlockchainProject } from "../services/root.contract";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getBlockchainProject: builder.query<TBlockchainProject, number>({
      async queryFn(blockchainId) {
        try {
          const res = await rootContract.projectById({
            address: process.env.REACT_APP_ROOT!,
            blockchainId,
          });
          return {
            data: pick(
              res,
              "id",
              "props",
              "investors",
              "amounts",
              "redeemed",
              "claimed",
              "totalInvested",
              "availableBalance",
              "state",
              "isActive"
            ),
          };
        } catch (error) {
          console.error("getInvestorInfo err: ", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useGetBlockchainProjectQuery } = rootApi;
