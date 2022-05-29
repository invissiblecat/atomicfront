import { BigNumber, Contract, ContractTransaction } from "ethers";
import ERC20Artifact from "../abi/ERC20.json";
import walletService from "./wallet.service";

class ERC20Contract {
  contracts: { [key: string]: Contract } = {};

  _getContract(address: string) {
    if (!Object.keys(this.contracts).includes(address)) {
      return this._registerContract(address);
    }
    if (!this.contracts[address].provider) {
      return this._registerContract(address);
    }
    return this.contracts[address];
  }

  _registerContract(address: string) {
    const contract = new Contract(
      address,
      ERC20Artifact.abi,
      walletService.provider
    );
    this.contracts[address] = contract;
    return contract;
  }

  symbol(address: string): string {
    const contract = this._getContract(address);
    return contract.symbol();
  }

  balanceOf({
    address,
    account,
  }: {
    address: string;
    account: string;
  }): Promise<BigNumber> {
    const contract = this._getContract(address);
    return contract.balanceOf(account);
  }

  allowance({
    address,
    owner,
    spender,
  }: {
    address: string;
    owner: string;
    spender: string;
  }): Promise<BigNumber> {
    const contract = this._getContract(address);
    return contract.allowance(owner, spender);
  }

  approve({
    address,
    spender,
    amount,
  }: {
    address: string;
    spender: string;
    amount: BigNumber;
  }): Promise<ContractTransaction> {
    const contract = this._getContract(address);
    return contract.connect(walletService.signer!).approve(spender, amount);
  }
}

const erc20Contract = new ERC20Contract();

export default erc20Contract;
