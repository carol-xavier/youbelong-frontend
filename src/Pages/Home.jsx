import { useEffect } from "react";
import { api } from "../Assets/Api/api";
import { getContext } from "../Context/ContextAPI";
import styled from "styled-components";
import Top from "../Components/Top";
import SearchMenu from "../Components/SearchMenu";
import Catalog from "../Components/Catalog";
import Footer from "../Components/Footer";

function Home() {
  const {
    institutions,
    setInstitutions,
    setDonorInstitutions,
    load
  } = getContext();

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
  }, [load, setDonorInstitutions, setInstitutions]);

  return (
    <Container>
      <Top />
      <Content>
        <SearchMenu />
        <Catalog institutions={institutions} />
        {/* <Catalog institutions={institutions} setLoad={setLoad} /> */}
      </Content>
      <Footer />
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