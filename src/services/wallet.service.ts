import { Network } from "@ethersproject/networks";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import Web3Modal from "web3modal";
import apiService from "./api.service";
import tokenService, { ONE_HOUR } from "./token.service";

type THandler<T> = (arg0: T) => Promise<void>;

export const web3Modal = new Web3Modal();
export const USER_LOGIN_SIGNATURE_KEY =
  "Atomic Swap sign confirmation" as const;
class WalletService {
  web3ModalProvider?: any;
  provider?: Web3Provider;
  signer?: JsonRpcSigner;
  network?: Network;
  signature?: string;

  handleAccountsChanged: THandler<string[]> = async () => {};
  handleChainChanged: THandler<number> = async () => {};
  handleDisconnect: THandler<any> = async () => {};

  async connect() {
    this.web3ModalProvider = await web3Modal.connect();
    this.provider = new Web3Provider(this.web3ModalProvider);
    this.signer = this.provider.getSigner();
    this.network = await this.provider.getNetwork();
    // this.setupHandlers();
    // const setupResult = await setupNetwork();

    // if (!setupResult) {
    //   this.handleDisconnect({});
    // }

    if (tokenService.tokens) {
      const timestamp = Date.now();

      if (tokenService.tokens.accessExpiresIn - timestamp >= ONE_HOUR) {
        return {
          provider: this.provider,
          web3ModalProvider: this.web3ModalProvider,
          signer: this.signer,
          network: this.network,
        };
      }

      try {
        await tokenService.updateToken();
        return {
          provider: this.provider,
          web3ModalProvider: this.web3ModalProvider,
          signer: this.signer,
          network: this.network,
        };
      } catch (err: any) {
        tokenService.removeToken();
      }
    }

    return this.signLoginMessage(this.signer);
  }

  async disconnect() {
    await web3Modal.clearCachedProvider();
    if (
      this.web3ModalProvider.disconnect &&
      typeof this.web3ModalProvider.disconnect === "function"
    ) {
      await this.web3ModalProvider.disconnect();
    }
  }

  async signLoginMessage(signer: JsonRpcSigner) {
    try {
      this.signature = await signer.signMessage(USER_LOGIN_SIGNATURE_KEY);
      await apiService.login(this.signature);
      return {
        provider: this.provider,
        web3ModalProvider: this.web3ModalProvider,
        signer: this.signer,
        network: this.network,
      };
    } catch (err) {
      console.error("login error: ", err);
      this.disconnect();
      throw new Error();
    }
  }

  initHandlers(
    handleAccountsChanged: THandler<string[]>,
    handleChainChanged: THandler<number>,
    handleDisconnect: THandler<any>
  ) {
    this.handleAccountsChanged = handleAccountsChanged;
    this.handleChainChanged = handleChainChanged;
    this.handleDisconnect = handleDisconnect;
  }

  setupHandlers() {
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length) {
        await this.handleAccountsChanged(accounts);
      } else {
      await this.handleDisconnect({});
      this.disconnect();
      }
    };

    const handleChainChanged = async (chainId: string) => {
      const formattedChainId = BigNumber.from(chainId).toNumber();
      await this.handleChainChanged(formattedChainId);
      window.location.reload();
    };

    const handleDisconnect = async (error: {
      code: number;
      message: string;
    }) => {
      await this.handleDisconnect(error);
      this.disconnect();
    };

    this.web3ModalProvider.on("accountsChanged", handleAccountsChanged);
    this.web3ModalProvider.on("chainChanged", handleChainChanged);
    this.web3ModalProvider.on("disconnect", handleDisconnect);
  }
}

const walletService = new WalletService();

export default walletService;
