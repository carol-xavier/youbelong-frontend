import React from "react";
import styled from "styled-components";
import { api } from "../Assets/Api/api";
import Top from "../Components/Top";
import SearchMenu from "../Components/SearchMenu";
import Catalog from "../Components/Catalog";

function Home() {
  const [institutions, setInstitutions] = React.useState([]);
  const [start, setStart] = React.useState(false);
  console.log("TESTE", institutions);
  
  React.useEffect(() => {
    api
      .get("/institutions")
      .then((res) => {
        setInstitutions(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Houve um erro ao buscar os dados. Por favor, recarregue a página!");
      });
  }, [start]);

  return (
    <Container>
      <Top />
      <Content>
        <SearchMenu setInstitutions={setInstitutions} />
        <Catalog institutions={institutions} />
      </Content>
    </Container>
  )
}

export default Home;

const Container = styled.article`

`;

const Content = styled.div`
 //width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`


