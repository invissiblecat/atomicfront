import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseEther } from "ethers/lib/utils";
import { RootState } from "../app/store";

interface InitialState {
  fcfsInputValue: string;
  isTimerRunning: boolean;
  screenWidth: number;
}

const initialState: InitialState = {
  fcfsInputValue: "",
  isTimerRunning: true,
  screenWidth: window.innerWidth,
};

export const projectSlice = createSlice({
  initialState,
  name: "project",
  reducers: {
    setFcfsInputValue: (state, { payload }: PayloadAction<string>) => {
      const inputValue = payload.replace(/,/g, ".");
      try {
        const splittedValue = inputValue.split(".");
        if (splittedValue[1] && splittedValue[1].length > 3) {
          throw new Error();
        }
        if (!inputValue) {
          state.fcfsInputValue = inputValue;
        }
        parseEther(inputValue);
        state.fcfsInputValue = inputValue;
      } catch (error) {
        console.log("invalid input");
      }
    },
    setIsTimerRunning: (state, { payload }: PayloadAction<boolean>) => {
      state.isTimerRunning = payload;
    },
    setScreenWidth: (state, { payload }: PayloadAction<number>) => {
      state.screenWidth = payload;
    },
  },
});

export const selectProjectReducer = (store: RootState) => store.project;
export const selectFcfsInputValue = (store: RootState) =>
  store.project.fcfsInputValue;
export const selectIsTimerRunning = (store: RootState) =>
  store.project.isTimerRunning;
export const selectScreenWidth = (store: RootState) =>
  store.project.screenWidth;

export default projectSlice.reducer;
