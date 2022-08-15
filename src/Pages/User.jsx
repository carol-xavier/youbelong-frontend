import styled from "styled-components";
import { getContext } from "../Context/ContextAPI";
import Top from "../Components/Top";
import Catalog from "../Components/Catalog";

function User() {
    const { donorInstitutions } = getContext();

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