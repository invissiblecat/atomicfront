import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { useCreateBoxMutation } from "redux/project.api";
import { TProjectRequestData } from "redux/types";
import { selectWallet } from "redux/wallet.slice";
import "./deploy.form.sass";
import { useHistory } from "react-router-dom";

const NewOrderForm = () => {
  const wallet = useSelector(selectWallet);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState(process.env.REACT_APP_TAVAX!);
  const [toToken, setToToken] = useState(process.env.REACT_APP_TETH!);
  const [fromNetwork, setFromNetwork] = useState('Avalanche');
  const [toNetwork, setToNetwork] = useState('Ethereum');

  const handleFrom = (tokenName: string) => {
    switch (tokenName) {
      case 'AvalancheToken': setFromNetwork('Avalanche'); setFromToken(process.env.REACT_APP_TAVAX!); break; //todo address
      case 'EthereumToken': setFromNetwork('Ethereum'); setFromToken(process.env.REACT_APP_TETH!); break;
    }
  }

  const handleTo = (tokenName: string) => {
    switch (tokenName) {
      case 'AvalancheToken': setToNetwork('Avalanche'); setToToken(process.env.REACT_APP_TAVAX!); break;
      case 'EthereumToken': setToNetwork('Ethereum'); setToToken(process.env.REACT_APP_TETH!); break;
    }
  }
  const history = useHistory();
  
  const [
    createBox,
    { error: createError, isLoading: isCreateLoding, isError, isSuccess },
  ] = useCreateBoxMutation();

  const BoxCreation = async () => {
    const boxParams: TProjectRequestData = {
      sender: wallet.address,
      sendNetwork: fromNetwork,
      recieveNetwork: toNetwork,
      sendToken: fromToken,
      recieveToken: toToken,
      sendAmount: fromAmount,
      recieveAmount: toAmount
    }
    try {
      const res = await createBox(boxParams);
      if (Object.hasOwn(res, "data")) {
        //@ts-ignore
        history.push(`/orderCreated/${res.data.id}`)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [valueFrom, setFrom] = useState('');
  const [valueTo, setTo] = useState('');
  const handleChangeFrom = (event: any) => {
    const result = event.target.value.replace(/\D/, '');

    setFrom(result)
    setFromAmount(ethers.utils.parseUnits(result).toString())
  };
  const handleChangeTo = (event: any) => {
    const result = event.target.value.replace(/\D/, '');
    
    setTo(result)
    setToAmount(ethers.utils.parseUnits(result).toString())
  };
  
  return (
    <>
      <div className="new-order">
        <div className="new-order__title">Create your own swap</div>
        <div className="new-order__form-inner">
          <span className="new-order__form-token-info">
            <input className="new-order__form-input" placeholder="From" value={valueFrom} onChange={e => handleChangeFrom(e)}></input>
            <select className="new-order__form-select" defaultValue={'AvalancheToken'} onChange={e => handleFrom(e.target.value)}>
              <option value='AvalancheToken'>tAVAX</option>
              <option value='EthereumToken'>tETH</option>
            </select>
          </span>
          <span className="new-order__form-token-info">
            <input className="new-order__form-input" placeholder="To" value={valueTo} onChange={e => handleChangeTo(e)}></input>
            <select className="new-order__form-select" defaultValue={'EthereumToken'} onChange={e => handleTo(e.target.value)}>
            <option value='AvalancheToken'>tAVAX</option>
              <option value='EthereumToken'>tETH</option>
            </select>
          </span>
        </div>
        <button className="new-order__form-button" placeholder="Create order" onClick={BoxCreation}>
          Create new order
        </button>
      </div>
    </>
  );
};

export default NewOrderForm;
