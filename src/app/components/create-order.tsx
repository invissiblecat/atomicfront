import Table from "./table";
import "./create-order.sass";
import { useGetBoxByIdQuery, useGetBoxQuery } from "redux/project.api";
import { selectWallet } from "redux/wallet.slice";
import { useSelector } from "react-redux";
import { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import StateLoading from "./state-loading.component";

type TProps = {
  timerTitle: string;
  id: string;
};

const CreateOrder: FC<TProps> = ({ timerTitle, id }) => {
  const wallet = useSelector(selectWallet);
  const { data } = useGetBoxByIdQuery(id, { pollingInterval: 10000 });
  const history = useHistory();

  useEffect(() => {
    if (data && data.status === "first deployed") {
      history.push(`/deployReciever/${id}`);
    }
  }, [data?.status]);

  return (
    <div className="create-order">
      <StateLoading
        timerTitle={timerTitle}
        isLoading={true}
        time={"15:23:16"}
      />
      <Table size={4} title="" type="create" box={data} />
    </div>
  );
};

export default CreateOrder;
