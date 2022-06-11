export type TProjectRequestData = {
  sender: string,
  sendNetwork: string,
  recieveNetwork: string,
  sendToken: string;
  recieveToken: string;
  sendAmount: string;
  recieveAmount: string;
  unlockTimestamp?: string;
  secret?: string;
}

export type TProjectResponseData = TProjectRequestData & {
  id: string
  reciever?: string;
};

export type TSetReciever = {
  id: string,
  reciever: string
}





