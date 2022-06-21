import { bindActionCreators } from "@reduxjs/toolkit";
import { AppDispatch, connect, disconnect, walletSlice } from "app/store";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(
    {
      ...walletSlice.actions,
      connect,
      disconnect,
    },
    dispatch
  );
};
