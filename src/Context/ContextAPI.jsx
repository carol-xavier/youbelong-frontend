import react, {createContext, useState } from "react";

const context = createContext();

export function Provider(props) {
    const [institutions, setInstitutions] = useState([]);
    const [donorInstitutions, setDonorInstitutions] = useState([])
    const [load, setLoad] = useState(false);

  return (
    <context.Provider
      value={{
        institutions,
        setInstitutions,
        donorInstitutions,
        setDonorInstitutions,
        load,
        setLoad
      }}
    >
      {props.children}
    </context.Provider> 
  );
}
export const getContext = () => react.useContext(context);