import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { api } from "../Assets/Api/api";
import DonorContext from "../Context/DonorContext";
import Top from "../Components/Top";
import SearchMenu from "../Components/SearchMenu";
import Catalog from "../Components/Catalog";

function Home() {
  const { donorInstitutions, setDonorInstitutions } = useContext(DonorContext);
  const [institutions, setInstitutions] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      api
        .get("/donor", config)
        .then(({ data }) => setDonorInstitutions(data))
        .catch(e => console.error(e));
    };

    api
      .get("/institutions")
      .then((res) => {
        setInstitutions(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Houve um erro ao buscar os dados. Por favor, recarregue a página!");
      });
  }, [load]);

  return (
    <Container>
      <Top />
      <Content>
        <SearchMenu setInstitutions={setInstitutions} />
        <Catalog institutions={institutions} setLoad={setLoad} />
      </Content>
    </Container>
  )
}

export default Home;

const Container = styled.article`
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;