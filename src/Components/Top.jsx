import styled from "styled-components";
import { useState, useEffect } from "react";
import { getContext } from "../Context/ContextAPI";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Top() {
    const navigate = useNavigate();
    const { setDonorInstitutions } = getContext();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) setStatus(true);
    }, [status]);

    function closeApp() {
        setDonorInstitutions([]);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        setStatus(false);
        navigate("/");
    };

    function goBack() {
        const address = window.location.href;
        const host = window.location.host;
        const route = address.replace(host, "");

        if (route === "https:///") {
            window.location.reload();
        } else {
            navigate("/");
        }
    }

    return (
        <FixPosition>
            <Container>
                <h1>YouBelong</h1>
                <Menu>
                    <button className="home" onClick={goBack}>
                        Home
                    </button>
                    <button className="aboutUs">
                        Sobre nós
                    </button>
                    <button className="newInstitution" onClick={() => navigate("/register-institution")}>
                        Cadastrar Institutição
                    </button>
                    {status ? (
                        <div>
                            <button className="authentication" onClick={closeApp}>
                                SAIR
                            </button>
                            <CgProfile
                                className="donorProfile"
                                onClick={() => navigate("/user-page")} />
                        </div>
                    ) : (
                        <button className="authentication" onClick={() => navigate("/sign-in")}>
                            Log In
                        </button>
                    )}
                </Menu>
            </Container>
        </FixPosition>
    )
}

export default Top;

const FixPosition = styled.section`
    width: 100%;
    height: 10vh;
    background-color: rgba(1, 41, 44, 1);
    top: 0;
    position: fixed;
    z-index: 5;   
`

const Container = styled.section`
    position: relative;
    width: 100%;
    height: 10vh;
    margin-top: 0;
    background-color: rgba(1, 41, 44, 1);
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    text-shadow: 0rem;

    & > h1{
        font-size: 2.2rem;
        position: absolute;
        bottom: 0.8rem;
        left: 2%;
    }
`;

const Menu = styled.div`
    position: relative;
    width: 30rem;
    position: absolute;
    right: 2%;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;

    & > h1{
        font-size: 2.2rem;
        position: absolute;
        bottom: 10%;
        left: 2%;
    }

    & > div{
        display: flex;
    }

    button{
        color: #FFFFFF;
        height: 2rem;
        border-radius: 0.2rem;
        display: flex;
        align-items: center;
    }

    .home{
        background-color: #D3AD8E;
    }

    .aboutUs{
        background-color: #A7516B;
    }

    .newInstitution{
        background-color: #F7F2EF;
        color: #5B5858;
    }

    .authentication{
        background-color: #79BFD6;
    }

    .donorProfile{
        margin-left: 0.3rem;
        margin-bottom: 0.2rem;
        color: #79BFD6;
        font-size: 2.2rem;
    }
`;