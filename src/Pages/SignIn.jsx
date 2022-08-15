import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DonorContext from "../Context/DonorContext";
import BackImage from "./../Assets/images/you-belong.jpg";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./../Assets/Api/api";

function SignIn() {
  const navigate = useNavigate();
  const { donorInstitutions, setDonorInstitutions } = useContext(DonorContext);
  const [isLoading, setIsLoading] = useState(false);
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

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
      navigate("/");
    }
  }, [donorInstitutions]);

  const handleSignIn = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { email, password } = signInInfo;

    api
      .post("/sign-in", {
        email,
        password,
      })
      .then(({ data }) => {
        setDonorInstitutions(data.savedInstitutions);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        navigate("/")
      })
      .catch(() => {
        setIsLoading(false);
        alert("Não foi possível efetuar o login. Tente novamente!");
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
              "Entrar"
            )}
          </button>
        </Form>
        <div>
          <Link to={"/sign-in"}>Não tem uma comta? Clique aqui!</Link>
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

  & > img {
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

    & > p{
      font-size: 1.5rem;
      color: rgba(1, 41, 44, 1);
      text-shadow: 0 4px 4px 0 #000000;
    }

    & > div{
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