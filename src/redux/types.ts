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
}

export type TProjectResponseData = TProjectRequestData & {
  id: string
  reciever?: string;
  status: string;
};






