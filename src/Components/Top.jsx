import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillProfile } from "react-icons/ai";

function Top() {
    const navigate = useNavigate();
    const [status, setStatus] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem("token")) setStatus(true);
    }, [status]);

    function closeApp() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        setStatus(false);
        navigate("/");
    }

    return (
        <Container>
            <h1>YouBelong</h1>
            <Menu>
                <button className="home" onClick={() => navigate("/")}>
                    Home
                </button>
                <button className="aboutUs">
                    Sobre nós
                </button>
                {status ? (
                    <div>
                        <button className="logoff" onClick={closeApp}>
                            SAIR
                        </button>
                        <AiFillProfile
                            className="donorProfile"
                            onClick={() => navigate("/user-page")} />
                    </div>
                ) : (
                    <button className="login" onClick={() => navigate("/sign-in")}>
                        Log In
                    </button>
                )}
            </Menu>
        </Container>
    )
}

export default Top;

const Container = styled.section`
    width: 100vw;
    height: 10vh;
    margin-top: 0;
    margin-bottom: 2rem;
    background-color: rgba(1, 41, 44, 1);
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    text-shadow: 0rem;
    position: relative;

    h1{
        font-size: 2.2rem;
        position: absolute;
        bottom: 10%;
        left: 2%;
    }
`;

const Menu = styled.div`
    width: 300px;
    position: absolute;
    right: 2%;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;

    div{
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

    .login{
        background-color: #1E97D9;
    }

    .logoff{
        background-color: #1E97D9;
    }

    .donorProfile{
        color: #1E97D9;
        font-size: 2.5rem;
    }
`;