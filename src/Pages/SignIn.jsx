import React from "react";
import styled from "styled-components";
import BackImage from "./../Assets/images/you-belong.jpg";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./../Assets/Api/api";

function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [signInInfo, setSignInInfo] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if(localStorage.getItem("token")){
        navigate("/user-page");
    }
  });

  const handleSignIn = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password } = signInInfo;

    api
      .post("/sign-in", {
        email,
        password,
      })
      .then((response) => {
        const {data} = response;
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        navigate("/")
      })
      .catch(() => {
        setIsLoading(false);
        alert("Não foi possível criar a conta. Tente novamente!");
      });
  };

  return (
    <Container>
      <img src={BackImage} alt="Background" />
      <Content>
        <p>WELCOME!</p>
        <p>Se você já é um doador, <br /> faça o log in abaixo</p>
        <Form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="E-mail"
            value={signInInfo.email}
            onChange={(e) =>
              setSignInInfo({ ...signInInfo, email: e.target.value })
            }
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={signInInfo.password}
            onChange={(e) =>
              setSignInInfo({ ...signInInfo, password: e.target.value })
            }
            disabled={isLoading}
            required
          />
          <button>
            {isLoading ? (
              <ThreeDots color="#FFFFFF" width="51px" height="13px" />
            ) : (
              "Criar Conta"
            )}
          </button>
        </Form>
        <div>
        <Link to={"/sign-in"}>Já tem uma conta? Clique aqui!</Link>
        <Link to={"/"}>
          Acha que a sua instituição pode se beneficiar fazendo
          parte da YouBelong? Descubra mais clicando aqui!
        </Link>
        </div>
      </Content>
    </Container>
  )
}

export default SignIn;

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`;

const Content = styled.div`
    position: absolute;
    top: 10%;
    right: 5%;
    width: 35%;
    height: 80%;
    padding: 1%;
    border-radius: 15px; //not working well with percentage
    background: rgba(214,198,198,0.80);
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;

    p{
      font-size: 1.5rem;
      color: rgba(1, 41, 44, 1);
      text-shadow: 0 4px 4px 0 #000000;
    }

    div{
      position: absolute;
      bottom: 10%;
      padding: 5%;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 0.7rem;
    }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  input{
    border: none;
    border-radius: 5px;
    background-color: #C1DBBB;
  }

  button{
    width: 100px;
    height: 20px;
    background: rgba(1, 41, 44, 1);
    border-radius: 5px;
    border: none;
    color: #ffffff;
  }
`;