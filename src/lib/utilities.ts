import getSupportedChains from "./chains";
import { IChainData } from "./types";

export function getChainData(chainId?: number): IChainData | Error | undefined {
  if (!chainId) {
    return;
  }
  const chains = getSupportedChains();
  const chainData = chains.filter(
    (chain: any) => chain.chain_id === chainId
  )[0];
  if (!chainData) {
    return new Error("ChainId missing or not supported");
  }

  const API_KEY = "460f40a260564ac4a4f4b3fffb032dad";

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function ellipseAddress(address = "", width = 4): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
}

export const ethAddressRegex = new RegExp(/^0x[a-fA-F0-9]{40}$/gi);
export const decimalsRegex = new RegExp(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/gi);

export enum EValidationTypes {
  REQUIRED = "required",
  ADDRESS = "address",
  ACTUAL_DATE = "actualDate",
  NUMBER = "number",
}

export const validations = {
  [EValidationTypes.REQUIRED]: (value: string) => !!value,
  [EValidationTypes.ADDRESS]: (value: string) => ethAddressRegex.test(value),
  [EValidationTypes.ACTUAL_DATE]: (value: Date) =>
    new Date().getTime() < value.getTime(),
  [EValidationTypes.NUMBER]: (value: string) => decimalsRegex.test(value),
};

export const log = (...args: any) => {
  if (process.env.REACT_APP_DEBUG === "true") console.log("DEBUG ", ...args);
};
