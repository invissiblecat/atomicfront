import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetBoxByIdQuery } from "redux/project.api";
import "./ending-stage.sass";

const EndingStage = () => {
  const [timeOnLoad, setTimeOnLoad] = useState(Number); 
  const { boxId } = useParams<{ boxId: string }>();
  const { data } = useGetBoxByIdQuery(boxId, { pollingInterval: 60 * 1000 });
  const history = useHistory();
  useEffect(() => {
    setTimeOnLoad(Date.now())
  }, [])
  useEffect(() => {
    if (Date.now() > timeOnLoad + 1000 * 60) history.push(`/`);
  }, [data])
  return (
    <div className="ending-stage">
      <div className="ending-stage__text">Your swap is completed!</div>
      <div className="ending-stage__subtext">Can't wait to see you again.</div>
    </div>
  );
};

export default EndingStage;
