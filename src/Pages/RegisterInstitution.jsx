import styled from "styled-components";
import Top from "../Components/Top";
import Footer from "../Components/Footer";
import { api } from "../Assets/Api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function RegisterInstiution() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [articleIds, serArticleIds] = useState([]);
    const [info, setInfo] = useState({
        name: "",
        description: "",
        values: "",
        mission: "",
        picture: "",
        video: "",
        contact: "",
        categoryId: 0
    });

    function registerNeededArticles(institutionId) {
        const object = { institutionId, articleIds };
        api
            .post("/articles", object)
            .then(() => {
                alert("Sua instituição foi cadastrada com sucesso!");
                navigate("/")
            })
            .catch(() => {
                setIsLoading(false);
                alert("Não foi possível registrar a instituição. Tente novamente!");
            });
    };

    function handleInstitutionCategory(event) {
        event.preventDefault();
        const categoryId = parseInt(event.currentTarget.id);
        setInfo({ ...info, categoryId });
    }

    function handleArticles(event) {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id);
        //TOFIX: incluir new Map() para checar se o item já existe 
        serArticleIds([...articleIds, id]);
    }

    const handleRegistration = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let id = 0;
        Object.keys(info).forEach(key => {
            if (info[key] === "") {
                delete info[key];
            }
        });

        api
            .post("/institutions", info)
            .then(({ data }) => {
                id = data.institutionId;
                console.log(id);
                registerNeededArticles(id)
            })
            .catch(() => {
                setIsLoading(false);
                alert("Não foi possível registrar a instituição. Tente novamente!");
            });
    };

    return (
        <Container>
            <Top />
            <h1>Registre a sua instituição abaixo!</h1>
            <Form onSubmit={handleRegistration}>
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    id="name"
                    value={info.name}
                    onChange={(e) =>
                        setInfo({ ...info, name: e.target.value })
                    }
                    disabled={isLoading}
                    required
                />
                <label htmlFor="description">Descrição</label>
                <input
                    type="text"
                    id="description"
                    value={info.description}
                    onChange={(e) =>
                        setInfo({ ...info, description: e.target.value })
                    }
                    disabled={isLoading}
                    required
                />
                <label htmlFor="contact">Contato</label>
                <input
                    type="tel"
                    id="contact"
                    value={info.contact}
                    onChange={(e) =>
                        setInfo({ ...info, contact: e.target.value })
                    }
                    disabled={isLoading}
                    required
                />
                <label htmlFor="mission">Missão</label>
                <input
                    type="text"
                    id="mission"
                    value={info.mission}
                    onChange={(e) =>
                        setInfo({ ...info, mission: e.target.value })
                    }
                    disabled={isLoading}
                />
                <label htmlFor="values">Valores</label>
                <input
                    type="text"
                    id="values"
                    value={info.values}
                    onChange={(e) =>
                        setInfo({ ...info, values: e.target.value })
                    }
                    disabled={isLoading}
                />
                <label htmlFor="picture">Foto da instituição</label>
                <input
                    type="url"
                    id="picture"
                    placeholder="Link Imagem"
                    value={info.picture}
                    onChange={(e) =>
                        setInfo({ ...info, picture: e.target.value })
                    }
                    disabled={isLoading}
                />
                <label htmlFor="video">Vídeo da instituição</label>
                <input
                    type="url"
                    id="video"
                    placeholder="Link Vídeo"
                    value={info.video}
                    onChange={(e) =>
                        setInfo({ ...info, video: e.target.value })
                    }
                    disabled={isLoading}
                />
                <p>O foco da sua instituição se encaixa melhor em qual dessas categorias? <br />
                    Escolha apenas uma.</p>
                <section>
                    <div id="1" className={info.categoryId === 1 ? "categorySelected" : "category"} onClick={handleInstitutionCategory}>Meio Ambiente</div>
                    <div id="2" className={info.categoryId === 2 ? "categorySelected" : "category"} onClick={handleInstitutionCategory}>Educação</div>
                    <div id="3" className={info.categoryId === 3 ? "categorySelected" : "category"} onClick={handleInstitutionCategory}>Animais</div>
                    <div id="4" className={info.categoryId === 4 ? "categorySelected" : "category"} onClick={handleInstitutionCategory}>Abrigos</div>
                </section>
                <p>Quais desses artigos a sua instituição precisa? <br />
                    Escolha quantas precisar.</p>
                <section>
                    <div id="1" className={articleIds.includes(1) ? "categorySelected" : "category"} onClick={handleArticles}>Alimentos</div>
                    <div id="2" className={articleIds.includes(2) ? "categorySelected" : "category"} onClick={handleArticles}>Roupas</div>
                    <div id="3" className={articleIds.includes(3) ? "categorySelected" : "category"} onClick={handleArticles}>Brinquedos</div>
                    <div id="4" className={articleIds.includes(4) ? "categorySelected" : "category"} onClick={handleArticles}>Móveis e utensílios</div>
                </section>
                <article>
                    <button>
                        {isLoading ? (
                            <ThreeDots color="#FFFFFF" width="51px" height="13px" />
                        ) : (
                            "Registrar Insituição"
                        )}
                    </button>
                </article>
            </Form>
            <Footer />
        </Container>
    )
}

export default RegisterInstiution;

const Container = styled.section`
    margin-top: 15vh; 

    & > h1{
        font-size: 1.5rem;
        font-weight: 700;
        margin-left: 2rem;
        color: rgba(1, 41, 44, 1);
        text-shadow: 0 4px 4px 0 #000000;
    }
`;

const Form = styled.form`
    margin-top: 2vh; 
    margin-left: 4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    & > input{
        width: 80%;
        border: 1px solid gray;
        border-radius: 0.4rem;
    }

    & > section{
        width: 70%;
        display: flex;
        justify-content: space-evenly;
    }

    & > article{
        width: 95%;
        margin-top: 2rem;
        display: flex;
        justify-content: space-evenly;
    }

  button{
        width: 10rem;
        height: 3rem;
        background: rgba(1, 41, 44, 1);
        border-radius: 0.4rem;
        border: none;
        color: #ffffff;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    & > p{
        margin-top: 1rem;
        font-family: 'Roboto', serif;
        font-weight: 500;
        font-size: 1rem;
        color: rgba(1, 41, 44, 1);
    }

    div{
        width: 10rem;
        height: 2rem;
        border-radius: 0.4rem;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .category{
        background-color: #CDD1B0;
    }

    .categorySelected{
        background-color: #A7516B;
    }
`;