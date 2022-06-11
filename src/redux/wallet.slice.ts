import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import walletService from "../services/wallet.service";

interface WalletState {
  address: string;
  chainId: number;
}

const initialState: WalletState = {
  address: "",
  chainId: 0,
};

export const connect = createAsyncThunk("wallet/connect", async () => {
  const { signer, network } = await walletService.connect();
  return { address: await signer!.getAddress(), chainId: network!.chainId };
});

export const disconnect = createAsyncThunk("wallet/disconnect", async () => {
  await walletService.disconnect();
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAddress(state, { payload }) {
      return {
        ...state,
        address: payload,
      };
    },
    setChainId(state, { payload }) {
      return {
        ...state,
        chainId: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state, action) => action.payload);
    builder.addCase(disconnect.fulfilled, (state, action) => initialState);
  },
});

export const selectWallet = (state: RootState) => state.wallet;

export const { setAddress, setChainId } = walletSlice.actions;

export const walletActions = {
  ...walletSlice.actions,
  connect,
  disconnect,
};

export default walletSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";
// import walletService from "../services/wallet.service";

// interface WalletState {
//   address: string;
//   chainId: number;
//   isMetamask: boolean;
// }

// const initialState: WalletState = {
//   address: "",
//   chainId: 0,
//   isMetamask: false,
// };

// export const connect = createAsyncThunk("wallet/connect", async () => {
//   const connectedNetwork = await walletService.connect();
//   if (!connectedNetwork) {
//     return console.error("disconnect");
//   }
//   const { signer, network, provider } = connectedNetwork;
//   return {
//     address: await signer.getAddress(),
//     chainId: network.chainId,
//     isMetamask: provider.provider.isMetaMask || false,
//   };
// });

// export const disconnect = createAsyncThunk("wallet/disconnect", async () => {
//   await walletService.disconnect();
// });

// const walletSlice = createSlice({
//   name: "wallet",
//   initialState,
//   reducers: {
//     setAddress(state, { payload }) {
//       // console.log(payload, {
//       //   ...state,
//       //   address: payload,
//       // });
//       return {
//         ...state,
//         address: payload,
//       };
//     },
//     setChainId(state, { payload }) {
//       return {
//         ...state,
//         chainId: payload,
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(connect.fulfilled, (state, action) => action.payload);
//     builder.addCase(disconnect.fulfilled, (state, action) => initialState);
//   },
// });

// export const selectWallet = (state: RootState) => state.wallet;

// export const { setAddress, setChainId } = walletSlice.actions;

// export const redeemAllocation = createAsyncThunk(
//   "wallet/redeem",
//   async (idoId: number) => {
//     await walletService.redeemAllocation(idoId);
//   }
// );

// export const claim = createAsyncThunk("wallet/claim", async (idoId: number) => {
//   await walletService.claimTokens(idoId);
// });

// export const pauseIDO = createAsyncThunk(
//   "wallet/pause",
//   async ({ idoId, callback }: { idoId: number; callback: any }) => {
//     await walletService.pauseIDO(idoId);
//     callback();
//   }
// );

// export const continueIDO = createAsyncThunk(
//   "wallet/continue",
//   async ({ idoId, callback }: { idoId: number; callback: any }) => {
//     await walletService.continueIDO(idoId);
//     callback();
//   }
// );

// export default walletSlice.reducer;
