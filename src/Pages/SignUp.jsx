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
            .then(() => navigate("/user-page"))
            .catch(() => {
                setIsLoading(false);
                alert("Não foi possível criar a conta. Tente novamente!");
            });
    };

    return (
        <Container>
            <img src={BackImage} alt="Background" />
            <Content>
                <div>
                    <p>WELCOME</p>
                    <p>Cadastre-de abaixo</p>
                    <form onSubmit={handleSignUp}>
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
                    </form>
                    <Link to={"/sign-in"}>Já tem uma conta? Clique aqui!</Link>
                </div>
                <div>
                    <p> Todos os seres humanos são 99,9% geneticamente idênticos. Fazemos parte do todo, então trabalhemos pelos todo.
                        <br />
                        Basta se cadastrar no formulário ao lado
                        e escolher uma organização para fazer a doação.
                        <br />
                        Você pertence. YouBelong!
                    </p>
                    <Link to={"/"}>
                        Acha que a sua instituição pode se beneficiar fazendo
                        parte da YouBelong? Descubra mais clicando aqui!
                    </Link>
                </div>
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

    & > div{
        width: 50%;
    }
`;