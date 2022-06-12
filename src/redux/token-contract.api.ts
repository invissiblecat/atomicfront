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
    // getBalance: builder.query<BigNumber, { account: string; address: string }>({
    //   async queryFn({ account, address }) {
    //     try {
    //       const data = await ERC20Contract.balanceOf({
    //         address,
    //         account,
    //       });
    //       return { data };
    //     } catch (error) {
    //       console.error("getBalance error:", error);
    //       return { error: error as FetchBaseQueryError };
    //     }
    //   },
    // }),

    getAllowance: builder.query<
      BigNumber,
      { owner: string; contractNetwork: string }
    >({
      async queryFn({ owner, contractNetwork }) {
        const spender = contractNetwork === 'Avalanche' ? process.env.REACT_APP_AVALANCHE_REGISTRY! : process.env.REACT_APP_ETHEREUM_REGISTRY!
        try {
          const data = await ERC20Contract.allowance({
            contractNetwork,
            owner,
            spender,
          });
          return { data };
        } catch (error) {
          console.error("allowance error:", error);
          return { error: error as FetchBaseQueryError };
        }
      },
    }),

    approve: builder.mutation<null, string>({
      async queryFn(contractNetwork) {
        const amount = BigNumber.from(2).pow(256).sub(1);
        const spender = contractNetwork === 'Avalanche' ? process.env.REACT_APP_AVALANCHE_REGISTRY! : process.env.REACT_APP_ETHEREUM_REGISTRY!
        try {
          const tx = await ERC20Contract.approve({
            contractNetwork,
            spender,
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

export const { useGetAllowanceQuery, useApproveMutation } =
  tokenContractApi;
