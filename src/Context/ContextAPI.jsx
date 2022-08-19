import react, { createContext, useState } from "react";

const context = createContext();

export function Provider(props) {
  const [donorInstitutions, setDonorInstitutions] = useState([]);
  const [heartStatus, setHeartStatus] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [load, setLoad] = useState(false);

  return (
    <context.Provider
      value={{
        institutions,
        setInstitutions,
        donorInstitutions,
        setDonorInstitutions,
        load,
        setLoad,
        heartStatus,
        setHeartStatus
      }}
    >
      {props.children}
    </context.Provider>
  );
}
export const getContext = () => react.useContext(context);