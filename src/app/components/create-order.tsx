import Table from "./table";
import "./create-order.sass";
import { useGetBoxByIdQuery, useGetBoxBySenderQuery } from "redux/project.api";
import { selectWallet } from "redux/wallet.slice";
import { useSelector } from "react-redux";
import { FC } from "react";
import { useParams } from "react-router-dom";

type TProps = {
  timerTitle: string;
  id: string
};

const CreateOrder: FC<TProps> = ({timerTitle, id}) => {
  const wallet = useSelector(selectWallet);
  const {data} = useGetBoxByIdQuery(id);
  console.log({id})
  console.log({data})
  return (
    <div className="create-order">
      <div className="create-order__state-loading">
        <div className="create-order__description-text">
          {timerTitle}
        </div>
        <div className="create-order__time">15:23:16</div>
      </div>
      <Table size={4} title="" type="create" box={data}/>
    </div>
  );
};

export default CreateOrder;
