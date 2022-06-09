import { selectWalletAddress } from "app/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const address = useSelector(selectWalletAddress);

  return useMemo(() => !!address, [address]);
};