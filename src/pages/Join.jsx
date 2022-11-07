import { useContext } from "react";
import { UserContext } from "../context/UserContext"

const Join = () => {

  const context = useContext(UserContext);

  return (
    <div>
      {context.channel}
    </div>
  );
};

export default Join;