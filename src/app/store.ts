import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import kycReducer from "../redux/kyc.slice";
import { projectApi } from "../redux/project.api";
import projectReducer from "../redux/project.slice";
import { rootApi } from "../redux/root.api";
import { tokenContractApi } from "../redux/token-contract.api";
import { userApi } from "../redux/user.api";
import walletReducer from "../redux/wallet.slice";

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    wallet: walletReducer,
    KYCStatus: kycReducer,
    project: projectReducer,
    [tokenContractApi.reducerPath]: tokenContractApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(rootApi.middleware)
      .concat(projectApi.middleware)
      .concat(userApi.middleware)
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

setupListeners(store.dispatch);
