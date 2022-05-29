import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BigNumber } from "ethers";
import ERC20Contract from "../services/ERC20.contract";

export const tokenContractApi = createApi({
  reducerPath: "tokenContractApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getBalance: builder.query<BigNumber, { account: string; address: string }>({
      async queryFn({ account, address }) {
        try {
          const data = await ERC20Contract.balanceOf({
            address,
            account,
          });
          return { data };
        } catch (error) {
          console.error("getBalance error:", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),

    getAllowance: builder.query<
      BigNumber,
      { owner: string; stableAddress: string }
    >({
      async queryFn({ owner, stableAddress }) {
        try {
          const data = await ERC20Contract.allowance({
            address: stableAddress,
            owner,
            spender: process.env.REACT_APP_ROOT!,
          });
          return { data };
        } catch (error) {
          console.error("allowance error:", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),

    approve: builder.mutation<null, string>({
      async queryFn(stableAddress) {
        const amount = BigNumber.from(2).pow(256).sub(1);

        try {
          const tx = await ERC20Contract.approve({
            address: stableAddress,
            spender: process.env.REACT_APP_ROOT!,
            amount,
          });
          await tx.wait();
          return { data: null };
        } catch (error) {
          console.error("approve error:", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});

export const { useGetBalanceQuery, useGetAllowanceQuery, useApproveMutation } =
  tokenContractApi;
