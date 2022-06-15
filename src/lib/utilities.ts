import { connect, disconnect } from "redux/wallet.slice";

export function ellipseAddress(address = "", width = 4): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width + 2)}...${address.slice(-width)}`;
}

export enum ChainId {
  AVALANCHE = +process.env.REACT_APP_AVALANCHE_CHAINID!,
  ETHEREUM = +process.env.REACT_APP_ETHEREUM_CHAINID!
}
export const getChainId = (networkName: string) => {
  switch (networkName) {
    case 'Ethereum': return  ChainId.ETHEREUM
    case 'Avalanche': return  ChainId.AVALANCHE
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
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  ],
};


export const setupNetwork = async (networkName: string) => {
  const provider = window.ethereum;
  const chainId = getChainId(networkName);
  if (provider) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                rpcUrls: NODES[chainId]
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
      params: [{ chainId: `0x${chainId.toString(16)}`}],
    });
    disconnect();
    connect();
  } catch (switchErr: any) {
    console.log(switchErr)
}
}

export const getProvider = (contractNetwork: string) =>  {
  switch(contractNetwork){
    case 'Ethereum': return process.env.REACT_APP_AVALANCHE!;
    case 'Avalanche': return process.env.REACT_APP_ETHEREUM!;
    default: return ''
  }
}

export const getRegistry = (contractNetwork: string) =>  {
  switch(contractNetwork){
    case 'Ethereum': return process.env.REACT_APP_AVALANCHE_REGISTRY!;
    case 'Avalanche': return process.env.REACT_APP_ETHEREUM_REGISTRY!;
    default: return ''
  }
}

export const getTokenSymbol = (tokenAddress: string) => {
  switch (tokenAddress) {
    case process.env.REACT_APP_TETH: return 'tETH';
    case process.env.REACT_APP_TAVAX: return 'tAVAX'
    default: return 'unknwn tkn'
  }
}

export const checkAddress = (address: string, sender: string, reciever: string) => {
  if (address === sender) {
      return "sender";
  } else if (address === reciever) { return "reciever"} 
  else {
      return 'redirect'
  }
}


