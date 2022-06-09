import { bindActionCreators } from "@reduxjs/toolkit";
import { AppDispatch, connect, disconnect, walletSlice } from "app/store";
import { useDispatch } from "react-redux";
// import { connect, disconnect, walletSlice } from "store/wallet.slice";

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
