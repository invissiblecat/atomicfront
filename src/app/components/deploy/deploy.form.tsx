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
  const [fromToken, setFromToken] = useState('AvalancheToken');
  const [toToken, setToToken] = useState('EthereumToken');
  const [fromNetwork, setFromNetwork] = useState('Avalanche');
  const [toNetwork, setToNetwork] = useState('Ethereum');

  const handleFrom = (tokenName: string) => {
    console.log(process.env.REACT_APP_API)
    switch (tokenName) {
      case 'AvalancheToken': setFromNetwork('Avalanche'); setFromToken(''); break; //todo address
      case 'EthereumToken': setFromNetwork('Ethereum'); setFromToken(''); break;
    }
  }

  const handleTo = (tokenName: string) => {
    switch (tokenName) {
      case 'AvalancheToken': setToNetwork('Avalanche'); setToToken(''); break;
      case 'EthereumToken': setToNetwork('Ethereum'); setToToken(''); break;
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
    console.log(boxParams)
    try {
      const res = await createBox(boxParams);
      console.log(res)
      if (Object.hasOwn(res, "data")) {
        //@ts-ignore
        history.push(`/orderCreated/${res.data.id}`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <div className="new-order">
        <div className="new-order__title">Create your own swap</div>
        <div className="new-order__form-inner">
          <span className="new-order__form-token-info">
            <input className="new-order__form-input" placeholder="From" onChange={e => setFromAmount(ethers.utils.parseUnits(e.target.value).toString())}></input>
            <select className="new-order__form-select" defaultValue={'AvalancheToken'} onChange={e => handleFrom(e.target.value)}>
              <option value='AvalancheToken'>AVL</option>
              <option value='EthereumToken'>ETH</option>
            </select>
          </span>
          <span className="new-order__form-token-info">
            <input className="new-order__form-input" placeholder="To" onChange={e => setToAmount(ethers.utils.parseUnits(e.target.value).toString())}></input>
            <select className="new-order__form-select" defaultValue={'EthereumToken'} onChange={e => handleTo(e.target.value)}>
            <option value='AvalancheToken'>AVL</option>
              <option value='EthereumToken'>ETH</option>
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
