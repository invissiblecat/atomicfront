import { BigNumber, Contract, ContractTransaction, ethers } from "ethers";
import { getProvider, switchNetwork } from "lib/utilities";
import ERC20Artifact from "../abi/ERC20.json";
import walletService from "./wallet.service";

class ERC20Contract {
  contracts: { [key: string]: Contract } = {};

  _getContract(address: string, contractNetwork: string) {
    // if (!Object.keys(this.contracts).includes(address)) {
      // console.log({address})
    return this._registerContract(address, contractNetwork);
    // }x
    // return this.contracts[address];
  }

  _registerContract(address: string, contractNetwork: string) {
    const contract = new Contract(
      address,
      ERC20Artifact.abi,
      new ethers.providers.JsonRpcProvider(getProvider(contractNetwork))
    );
    this.contracts[address] = contract;
    return contract;
  }

  async allowance({
    contractNetwork,
    owner,
    spender,
  }: {
    contractNetwork: string;
    owner: string;
    spender: string;
  }): Promise<BigNumber> {
    const address = this.getTokenAddress(contractNetwork)
    const contract = this._getContract(address, contractNetwork);
    return contract.allowance(owner, spender);
  }

  async approve({
    contractNetwork,
    spender,
    amount,
  }: {
    contractNetwork: string;
    spender: string;
    amount: BigNumber;
  }): Promise<ContractTransaction> {
    const address = this.getTokenAddress(contractNetwork)
    const contract = this._getContract(address, contractNetwork);
    return contract.connect(walletService.signer!).approve(spender, amount);
  }

  getTokenAddress(contractNetwork: string): string {
    switch(contractNetwork){
      case 'Ethereum': return process.env.REACT_APP_TETH!; break;
      case 'Avalanche': return process.env.REACT_APP_TAVAX!; break;
      default: return ''
    }
  }
}

const erc20Contract = new ERC20Contract();

export default erc20Contract;
