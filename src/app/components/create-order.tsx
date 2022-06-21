import Table from "./table";
import "./create-order.sass";
import { useGetBoxByIdQuery } from "redux/project.api";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StateLoading from "./state-loading.component";

type TProps = {
  timerTitle: string;
  id: string;
};

const CreateOrder: FC<TProps> = ({ timerTitle, id }) => {
  const { data } = useGetBoxByIdQuery(id, { pollingInterval: 2000 });
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
      />
      <Table size={4} title="" type="create" box={data} />
    </div>
  );
};

export default CreateOrder;
