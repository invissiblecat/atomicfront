import { BigNumber, Contract, ContractTransaction, ethers } from "ethers";
import { getProvider, setupNetwork, switchNetwork } from "lib/utilities";
import RegistryArtifacts from "../abi/Registry.json";
import walletService from "./wallet.service";

export type TOwner = string;

export type TCreateBox = {
  reciever: string;
  token: string;
  amount: string;
  secret: string;
  isHash: boolean;
  unlockTimestamp: number;
  offchainId: string;
}

export type TBox = {
  id: BigNumber;
  sender: string;
  reciever: string;
  token: string;
  amount: string;
  hashSecret: string;
  unlockTimestamp: number;
  isActive: boolean;
}

export type TClaim = {
  boxId: number;
  secret: string;
  offchainId: string;
}

class RegistryContract {
  contracts: { [key: string]: Contract } = {};

  _getContract(address: string, contractNetwork: string) {
    return this._registerContract(address, contractNetwork);
  }

  _registerContract(address: string, contractNetwork: string) {
    const contract = new Contract(
      address,
      RegistryArtifacts.abi,
      new ethers.providers.JsonRpcProvider(getProvider(contractNetwork))
    );
    this.contracts[address] = contract;
    return contract;
  }

  async createBox({
    props,
    contractNetwork,
  }: {
    props: TCreateBox;
    contractNetwork: string;
  }): Promise<ContractTransaction> {
    await switchNetwork(contractNetwork);
    const address = this.getRegistryAddress(contractNetwork)
    let hashSecret
    if (!props.isHash) {
      hashSecret = ethers.utils.id(props.secret);
    } else {
      hashSecret = props.secret
    }
    const contract = this._getContract(address, contractNetwork);
    return contract
      .connect(walletService.signer!)
      .createBox(props.reciever, props.token, props.amount, hashSecret, Math.ceil(props.unlockTimestamp / 1000), props.offchainId);
  }

  async claimBox({
    props,
    claimNetwork,
  }: {
    props: TClaim;
    claimNetwork: string;
  }): Promise<ContractTransaction> {
    await switchNetwork(claimNetwork);
    const address = this.getRegistryAddress(claimNetwork)
    const contract = this._getContract(address, claimNetwork);
    return contract
      .connect(walletService.signer!)
      .claim(props.boxId, props.secret, props.offchainId)
  }

  async getBox({
    boxId,
    contractNetwork,
  }: {
    boxId: number;
    contractNetwork: string;
  }): Promise<ContractTransaction> {
    const address = this.getRegistryAddress(contractNetwork)
    const contract = this._getContract(address, contractNetwork);
    return contract.connect(new ethers.providers.JsonRpcProvider(getProvider(contractNetwork))).getBoxById(boxId);
  }

  getRegistryAddress(contractNetwork: string): string {
    switch(contractNetwork){
      case 'Ethereum': return process.env.REACT_APP_ETHEREUM_REGISTRY!;
      case 'Avalanche': return process.env.REACT_APP_AVALANCHE_REGISTRY!;
      default: return ''
    }
  }

}

const registryContract = new RegistryContract();

export default registryContract;
