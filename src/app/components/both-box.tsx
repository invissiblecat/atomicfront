import { FC } from "react";
import { useGetBoxByIdQuery } from "redux/project.api";
import "./both-box.sass";
import BoxSended from "./box-sended";
import Table from "./table";

type TProps = {
  timerTitle: string;
  id: string
  statusToUpdate: string
  redirect: string
};

const BothBoxSend: FC<TProps> = ({timerTitle, id, statusToUpdate, redirect}) => {
  const {data} = useGetBoxByIdQuery(id);
  
  return (
    <span className="both-box">
     <BoxSended id={id} statusToUpdate={statusToUpdate} redirect={redirect}></BoxSended>
    </span>
  );
};

export default BothBoxSend;
