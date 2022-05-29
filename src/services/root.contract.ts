import { BigNumber, Contract, ContractTransaction } from "ethers";
import RootArtifacts from "../abi/Root.json";
import walletService from "./wallet.service";

export enum State {
  upcoming,
  redeem,
  fcfs,
  claim,
  distributed,
}

export type TBlockchainProject = {
  id: BigNumber;
  props: TProjectProps;
  investors: string[];
  amounts: BigNumber[];
  redeemed: BigNumber[];
  claimed: BigNumber[];
  totalInvested: BigNumber;
  availableBalance: BigNumber;
  state: State;
  isActive: boolean;
};

export type TProjectProps = {
  token: string;
  claimToken: string;
  price: BigNumber;
  claimDates: BigNumber[];
  claimPercent: BigNumber[];
};

export type TOwner = string;

class RootContract {
  contracts: { [key: string]: Contract } = {};

  _getContract(address: string) {
    // if (!Object.keys(this.contracts).includes(address)) {
    return this._registerContract(address);
    // }x
    // return this.contracts[address];
  }

  _registerContract(address: string) {
    const contract = new Contract(
      address,
      RootArtifacts.abi,
      walletService.provider
    );
    this.contracts[address] = contract;
    return contract;
  }

  projectById({
    address,
    blockchainId,
  }: {
    address: string;
    blockchainId: number;
  }): Promise<TBlockchainProject> {
    const contract = this._getContract(address);
    return contract.projectById(blockchainId);
  }

  redeemAllocation({
    address,
    blockchainId,
  }: {
    address: string;
    blockchainId: number;
  }): Promise<ContractTransaction> {
    const contract = this._getContract(address);
    return contract
      .connect(walletService.signer!)
      .redeemAllocation(blockchainId);
  }

  redeemAllocationFCFS({
    address,
    functionSignature,
    r,
    s,
    v,
    signerAddress,
  }: {
    address: string;
    functionSignature: any;
    r: any;
    s: any;
    v: any;
    signerAddress: string;
  }): Promise<ContractTransaction> {
    const contract = this._getContract(address); //todo where to place server signing address?
    return contract
      .connect(walletService.signer!)
      .executeMetaTransaction(signerAddress, functionSignature, r, s, v);
  }

  claimProject({
    address,
    blockchainId,
  }: {
    address: string;
    blockchainId: number;
  }): Promise<ContractTransaction> {
    const contract = this._getContract(address);
    return contract.connect(walletService.signer!).claimProject(blockchainId);
  }
}

const rootContract = new RootContract();

export default rootContract;
