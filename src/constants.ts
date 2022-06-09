export type TToken = {
  address: string;
  symbol: string;
  icon: string;
  decimals: number;
};

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const getTokenSymbolByAddress = (tokens: TToken[], address: string) =>
  tokens.find((token) => token.address === address)?.symbol;

export const USER_LOGIN_SIGNATURE_KEY =
  "Atomic Swap sign confirmation" as const;

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
}

export const NETWORK_NAMES = {
  [ChainId.MAINNET]: "Binance Smart Chain Mainnet",
  [ChainId.TESTNET]: "Binance Smart Chain Testnet",
};

export const BSC_SCAN_URLS = {
  [ChainId.MAINNET]: ["https://bscscan.com/"],
  [ChainId.TESTNET]: ["https://testnet.bscscan.com/"],
};

export const NODES = {
  [ChainId.MAINNET]: ["https://bsc-dataseed.binance.org/"],
  [ChainId.TESTNET]: [
    "https://speedy-nodes-nyc.moralis.io/f46b513ed525fb4e771dc9ce/bsc/testnet",
  ],
};

export enum CurrencyTicket {
  BUSD = "BUSD",
  USDT = "USDT",
}

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
}

export const DEFAULT_DATE_FORMAT: string = "DD MMMM, YYYY HH:mm";
export const PAYMENTS_OVER = "Payments are over";

export const MOBILE_WIDTH = 450;
