import {
  Action,
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import walletService from "services/wallet.service";
import { projectApi } from "../redux/project.api";
import projectReducer from "../redux/project.slice";
import { registryApi } from "../redux/registry.api";
import { tokenContractApi } from "../redux/token-contract.api";
import walletReducer from "../redux/wallet.slice";

enum Connector {
  Injected = "injected",
  WalletConnect = "walletconnect",
}
interface WalletState {
  address: string;
  chainId: number;
  isModalOpen: boolean;
}

const initialState: WalletState = {
  address: "",
  chainId: 0,
  isModalOpen: false,
};

export const connect = createAsyncThunk(
  "wallet/connect",
  async (
    connector: Connector | undefined = Connector.Injected,
    { rejectWithValue }
  ) => {
    try {
      const { signer, network } = await walletService.connect();
      const address = await signer!.getAddress();
      return { address, chainId: network!.chainId };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const disconnect = createAsyncThunk("wallet/disconnect", async () => {
  await walletService.disconnect();
});

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAddress: (state, { payload }: PayloadAction<string>) => {
      state.address = payload;
    },
    setChainId: (state, { payload }: PayloadAction<number>) => {
      state.chainId = payload;
    },
    closeWalletModal: (state) => {
      state.isModalOpen = false;
      console.log("modal closed");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      connect.fulfilled,
      (
        state,
        { payload }: PayloadAction<{ address: string; chainId: number }>
      ) => {
        state.address = payload.address;
        state.chainId = payload.chainId;
        state.isModalOpen = false;
      }
    );
    builder.addCase(connect.rejected, (state, { payload }) => {
      const error: any = payload;
      const stack = error?.stack || "";
      const userRejectedCode = new RegExp('"code": 4001');
      if (
        (error?.code && error?.code !== 4001) ||
        !userRejectedCode.test(stack)
      ) {
        state.isModalOpen = true;
      }
    });
    builder.addCase(disconnect.fulfilled, () => initialState);
  },
});

export const store = configureStore({
  reducer: {
    [registryApi.reducerPath]: registryApi.reducer,
    wallet: walletReducer,
    project: projectReducer,
    [tokenContractApi.reducerPath]: tokenContractApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(registryApi.middleware)
      .concat(projectApi.middleware)
      .concat(tokenContractApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const selectWalletAddress = (state: RootState) => state.wallet.address;

setupListeners(store.dispatch);
