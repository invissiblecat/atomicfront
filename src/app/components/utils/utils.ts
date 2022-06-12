import { useEffect } from "react";
import { useActions } from "../hooks/use-actions";

export const getTokenSymbol = (tokenAddress: string) => {
    switch (tokenAddress) {
      case process.env.REACT_APP_TETH: return 'tETH';
      case process.env.REACT_APP_TAVAX: return 'tAVAX'
      default: return 'unknwn tkn'
    }
  }

export const checkAddress = (address: string, sender: string, reciever: string) => {
    if (address === sender) {
        return "sender";
    } else if (address === reciever) { return "reciever"} 
    else {
        return 'redirect'
    }
}

export const connectWallet = (address: string) => {

}