import { useContext } from "react";
import styled from "styled-components";
import DonorContext from "../Context/DonorContext";
import Top from "../Components/Top";
import Catalog from "../Components/Catalog";

function User() {
    const { donorInstitutions, setDonorInstitutions } = useContext(DonorContext);

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