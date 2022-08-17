import { useState } from "react";
import styled from "styled-components";
import BackImage from "./../Assets/images/you-belong.jpg";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./../Assets/Api/api";

function SignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [signUpInfos, setSignUpInfos] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSignUp = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const { name, email, password, password_confirmation } = signUpInfos;
        if (password !== password_confirmation) {
            alert("As senhas não coincidem! Por favor, digite novamente.");
            setIsLoading(false);
            return;
        }

        api
            .post("/sign-up", {
                name,
                email,
                password,
            })
            .then(() => navigate("/sign-in"))
            .catch(() => {
                setIsLoading(false);
                alert("Não foi possível criar a conta. Tente novamente!");
            });
    };

    return (
        <Container>
            <img src={BackImage} alt="Background" />
            <Content>
                <LeftBox>
                    <Header>
                    <h1>WELCOME</h1>
                    <h2>Cadastre-de abaixo</h2>
                    </Header>
                    <Form onSubmit={handleSignUp}>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={signUpInfos.name}
                            onChange={(e) =>
                                setSignUpInfos({ ...signUpInfos, name: e.target.value })
                            }
                            disabled={isLoading}
                            required
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={signUpInfos.email}
                            onChange={(e) =>
                                setSignUpInfos({ ...signUpInfos, email: e.target.value })
                            }
                            disabled={isLoading}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={signUpInfos.password}
                            onChange={(e) =>
                                setSignUpInfos({ ...signUpInfos, password: e.target.value })
                            }
                            disabled={isLoading}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirme a sua senha"
                            value={signUpInfos.password_confirmation}
                            onChange={(e) =>
                                setSignUpInfos({
                                    ...signUpInfos,
                                    password_confirmation: e.target.value,
                                })
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
                    <Link to={"/sign-in"}><p>Já tem uma conta? Clique aqui!</p></Link>
                </LeftBox>
                <RightBox>
                    <h3> Todos os seres humanos são 99,9% geneticamente idênticos. Fazemos parte do todo, então trabalhemos pelos todo.
                        <br />
                        Basta se cadastrar no formulário ao lado
                        e escolher uma organização para fazer a doação.
                        <br />
                        Você pertence. YouBelong!
                    </h3>
                    
                    <Link to={"/"}>
                        <p>Acha que a sua instituição pode se beneficiar fazendo
                        parte da YouBelong? Descubra mais clicando aqui!</p>
                    </Link>
                </RightBox>
            </Content>
        </Container>
    )
}

export default SignUp;

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
    left: 10%;
    width: 80%;
    height: 80%;
    padding: 1%;
    border-radius: 15px; //not working well with percentage
    background: rgba(214,198,198,0.80);
    z-index: 1;

    display: flex;
    justify-content: space-between;

`;

const Header = styled.div`
    display: flex;
      flex-direction: column;
      text-align: center;

    & > h1{
      font-size: 1.5rem;
      color: rgba(1, 41, 44, 1);
      text-shadow: 0 4px 4px 0 #000000;
    }

    & >  h2{
      font-size: 1.2rem;
      color: rgba(1, 41, 44, 1);
      text-shadow: 0 4px 4px 0 #000000;
    }
`;

const LeftBox = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    p{
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
    border-radius: 0.4rem;
    background-color: #C1DBBB;
  }

  button{
    width: 7rem;
    height: 2rem;
    background: rgba(1, 41, 44, 1);
    border-radius: 0.4rem;
    border: none;
    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const RightBox = styled.div`
    width: 50%;

    & > h3{
        width: 80%;
        margin-top: 8rem;
        font-size: 1rem;
        text-align: center;
        color: rgba(1, 41, 44, 1);
    }

    p{
        width: 80%;
        text-align: center;
        font-size: 0.7rem;
        margin-top: 10rem;
    }
`;