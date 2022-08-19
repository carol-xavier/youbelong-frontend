import { useEffect } from "react";
import { getContext } from "../Context/ContextAPI";
import { api } from "../Assets/Api/api";
import styled from "styled-components";
import Top from "../Components/Top";
import Catalog from "../Components/Catalog";

function User() {
    const {
        setInstitutions,
        donorInstitutions,
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
        } else {
            alert("É necessário estar logado para acessar essa página");
        }

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
                <Catalog institutions={donorInstitutions} />
            </Content>
        </Container>
    )
}

export default User;

const Container = styled.article`
`;

const Content = styled.div`
    margin-top:15vh;

    display: flex;
    flex-direction: column;
    align-items: center;
`;