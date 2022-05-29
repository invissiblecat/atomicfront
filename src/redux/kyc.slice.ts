import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { TStatus } from "./types";

interface KYCStatusState {
  status: TStatus;
}

const initialState: KYCStatusState = {
  status: "idle",
};

export const getKYCStatus = createAsyncThunk<TStatus, string | undefined>(
  "kyc/getStatus",
  async (
    walletAddress: string = "0x97F88e0f01b24Ec91E468d631675D69Fa41E31d2"
  ) => {
    try {
      const { data } = await axios.get(
        "https://kyc.blockpass.org/kyc/1.0/connect/gagarin_launchpad_077b3/refId/" +
          walletAddress,
        {
          headers: {
            Authorization: "cbd17356a95f97d798eadbfe2345a9c1",
          },
        }
      );

      switch (data.data.status) {
        case "approved":
          return "success";
        case "waiting":
        case "inreview":
          return "pending";
        case "resubmit":
        case "blocked":
          return "reject";
        default:
          return "idle";
      }
    } catch (error) {
      console.error("getKYCStatus err: ", error);
      // return 'empty'
      return "idle";
    }
  }
);

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setKYCStatus(state, { payload }) {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getKYCStatus.fulfilled, (state, action) => ({
      status: action.payload,
    }));
  },
});

export const selectKYCStatus = (state: RootState) => state.KYCStatus.status;

export const kycActions = {
  ...kycSlice.actions,
  getKYCStatus,
};

export default kycSlice.reducer;
