import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { parseEther } from "ethers/lib/utils";
import apiService from "../services/api.service";
import rootContract from "../services/root.contract";
import TokenService from "../services/token.service";
import { TApplication, TRawProject } from "./types";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ROOT,
    prepareHeaders: (headers) => {
      if (TokenService.tokens) {
        headers.set(
          "authorization",
          `Bearer ${TokenService.tokens.accessToken}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<TRawProject[], void>({
      query: () =>
        `/idos?filter=${JSON.stringify({
          order: ["blockchainId ASC", "id DESC"], // временно
          include: ["links", "payments"],
        })}`,
    }),
    getProjectById: builder.query<TRawProject, string>({
      query: (id) =>
        `/idos/${id}?filter=${JSON.stringify({
          include: ["links", "payments"],
        })}`,
    }),
    getCurrencyByAddress: builder.query<any, any>({
      query: (data) =>
        `/currencies?filter=${JSON.stringify({
          where: {
            address: data.address,
          },
        })}`,
      transformResponse: (response: any[]) => response[0],
    }),
    createApplication: builder.mutation<
      TApplication,
      { idoId: string; telegram: string; twitter: string }
    >({
      query: ({ idoId, ...body }) => ({
        url: `/idos/${idoId}/applications/my`,
        method: "POST",
        body,
      }),
    }),

    redeemAllocation: builder.mutation<null, number>({
      async queryFn(blockchainId) {
        try {
          const tx = await rootContract.redeemAllocation({
            address: process.env.REACT_APP_ROOT!,
            blockchainId,
          });
          await tx.wait();

          return { data: null };
        } catch (error) {
          console.error("redeemAllocation err: ", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),

    claim: builder.mutation<
      null,
      {
        blockchainId: number;
      }
    >({
      async queryFn({ blockchainId }) {
        try {
          console.log("claim");
          const tx = await rootContract.claimProject({
            address: process.env.REACT_APP_ROOT!,
            blockchainId,
          });
          await tx.wait();

          return { data: null };
        } catch (error) {
          console.error("redeemAllocation err: ", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
    redeemAllocationFcfs: builder.mutation<
      null,
      {
        offchainId: string;
        amount: string;
      }
    >({
      queryFn: async ({ offchainId, amount }) => {
        try {
          const { functionSignature, r, s, v, signerAddress } =
            await apiService.getMetaTx({
              offchainId,
              amount: parseEther(amount).toString(),
            });

          const tx = await rootContract.redeemAllocationFCFS({
            address: process.env.REACT_APP_ROOT!,
            functionSignature,
            r,
            s,
            v,
            signerAddress,
          });
          await tx.wait();

          return { data: null };
        } catch (error) {
          console.error("redeemAllocationFCFS err: ", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetCurrencyByAddressQuery,
  useCreateApplicationMutation,
  useRedeemAllocationMutation,
  useClaimMutation,
  useRedeemAllocationFcfsMutation,
} = projectApi;
