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

export enum ChainId {
  AVALANCHE = 43113,
  ETHEREUM = 4,
}
const getChainId = (networkName: string) => {
  switch (networkName) {
    case 'Ethereum': return +process.env.REACT_APP_ETHEREUM_CHAINID! as ChainId
    case 'Avalanche': return +process.env.REACT_APP_AVALANCHE_CHAINID! as ChainId
    default: throw new Error('Unknown network');
  }
}

export const NETWORK_NAMES = {
  [ChainId.AVALANCHE]: "Avalanche FUJI C-Chain",
  [ChainId.ETHEREUM]: "Rinkeby Test Network",
};

export const NATIVE_CURRENCY = {
  [ChainId.AVALANCHE]: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18
  },
  [ChainId.ETHEREUM]: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  }
}

export const NODES = {
  [ChainId.AVALANCHE]: ["https://api.avax-test.network/ext/bc/C/rpc"],
  [ChainId.ETHEREUM]: [
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  ],
};

export const BSC_SCAN_URLS = {
  [ChainId.AVALANCHE]: ["https://testnet.snowtrace.io/"],
  [ChainId.ETHEREUM]: ["https://rinkeby.etherscan.io"],
};

export const setupNetwork = async (networkName: string) => {
  const provider = window.ethereum;
  console.log({networkName})
  const chainId = getChainId(networkName);
  if (provider) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: NETWORK_NAMES[chainId],
                nativeCurrency: NATIVE_CURRENCY[chainId],
                rpcUrls: NODES[chainId],
                blockExplorerUrls: BSC_SCAN_URLS[chainId],
              },
            ],
          });
          return true;
        } catch (error) {
          console.error("Failed to setup the network in Metamask:", error);
          return false;
        }
      } else {
        console.error(
          "Can't setup the network on metamask because window.ethereum is undefined"
        );
        return false;
      }
};

export const switchNetwork = async (networkName: string) => {
  const chainId = getChainId(networkName);
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (switchErr: any) {
    console.log(switchErr)
}
}


