export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
}

export type TProjectRequestData = {
  sender: string,
  sendNetwork: string,
  recieveNetwork: string,
  sendToken: string;
  recieveToken: string;
  sendAmount: string;
  recieveAmount: string;
  unlockTimestamp?: number;
  secret?: string;
  hashSecret?: string;
}

export type TProjectResponseData = TProjectRequestData & {
  id: string
  reciever?: string;
  status: string;
  sendBlockchainId?: number;
  recieveBlockchainId?: number;
};