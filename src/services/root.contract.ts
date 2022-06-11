import { BigNumber, Contract, ContractTransaction, ethers } from "ethers";
import { setupNetwork } from "lib/utilities";
import RegistryArtifacts from "../abi/Registry.json";
import walletService from "./wallet.service";

export type TOwner = string;

export type TCreateBox = {
  reciever: string;
  token: string;
  amount: string;
  secret: string;
  unlockTimestamp: number;
  offchainId: string;
}
class RegistryContract {
  contracts: { [key: string]: Contract } = {};

  _getContract(address: string) {
    // if (!Object.keys(this.contracts).includes(address)) {
      console.log({address})
    return this._registerContract(address);
    // }x
    // return this.contracts[address];
  }

  _registerContract(address: string) {
    const contract = new Contract(
      address,
      RegistryArtifacts.abi,
      walletService.provider
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
    await setupNetwork(contractNetwork);
    const address = this.getRegistryAddress(contractNetwork)
    const hashSecret = ethers.utils.id(props.secret);
    const contract = this._getContract(address);
    return contract
      .connect(walletService.signer!)
      .createBox(props.reciever, props.token, props.amount, hashSecret, props.unlockTimestamp, props.offchainId);
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
