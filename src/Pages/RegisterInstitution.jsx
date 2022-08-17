import styled from "styled-components";
import { api } from "../Assets/Api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function RegisterInstiution() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [articleIds, serArticleIds] = useState([]);
    console.log("TESTE", articleIds);
    const [info, setInfo] = useState({
        name: "",
        description: "",
        values: null,
        mission: null,
        picture: null,
        video: null,
        contact: "",
        categoryId: 0
    });

    function registerNeededArticles(institutionId) {
        const object = { institutionId, articleIds};
        console.log(object);
        api
        .post("/articles", object)
        .then(() => {
            alert("Sua instituição foi cadastrada com sucesso!");
            navigate("/")})
        .catch(() => {
            setIsLoading(false);
            alert("Não foi possível registrar a instituição. Tente novamente!");
        });
    };

    const handleRegistration = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let id = 0;
        Object.keys(info).forEach(key => {
            if (info[key] === null) {
              delete info[key];
            }});
       
        api
            .post("/institutions", info)
            .then(({data}) => {
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
        <Form onSubmit={handleRegistration}>
            <input
                type="text"
                placeholder="Nome"
                value={info.name}
                onChange={(e) =>
                    setInfo({ ...info, name: e.target.value })
                }
                disabled={isLoading}
                required
            />
            <input
                type="text"
                placeholder="Descrição"
                value={info.description}
                onChange={(e) =>
                    setInfo({ ...info, description: e.target.value })
                }
                disabled={isLoading}
                required
            />
            <input
                type="text"
                placeholder="Contato"
                value={info.contact}
                onChange={(e) =>
                    setInfo({ ...info, contact: e.target.value })
                }
                disabled={isLoading}
                required
            />
            <input
                type="text"
                placeholder="Missão"
                value={info.mission}
                onChange={(e) =>
                    setInfo({ ...info, mission: e.target.value })
                }
                disabled={isLoading}
            />
            <input
                type="text"
                placeholder="Valores"
                value={info.values}
                onChange={(e) =>
                    setInfo({ ...info, values: e.target.value })
                }
                disabled={isLoading}
            />
            <input
                type="text"
                placeholder="Link Imagem"
                value={info.picture}
                onChange={(e) =>
                    setInfo({ ...info, picture: e.target.value })
                }
                disabled={isLoading}
            />
            <input
                type="text"
                placeholder="Link Vídeo"
                value={info.video}
                onChange={(e) =>
                    setInfo({ ...info, video: e.target.value })
                }
                disabled={isLoading}
            />
            <section>
                <p>O foco da sua instituição se encaixa melhor em qual dessas categorias?</p>
                <div>
                    <div onClick={() => setInfo({...info, categoryId: 1})}>Meio Ambiente</div>
                    <div onClick={() => setInfo({...info, categoryId: 2})}>Educação</div>
                    <div onClick={() => setInfo({...info, categoryId: 3})}>Animais</div>
                    <div onClick={() => setInfo({...info, categoryId: 4})}>Abrigos</div>
                </div>
            </section>
            <section>
                <p>Quais desses artigos a sua instituição precisa?</p>
                <div>
                    <div onClick={() => serArticleIds([...articleIds, 1])}>Alimentos</div>
                    <div onClick={() => serArticleIds([...articleIds, 2])}>Roupas</div>
                    <div onClick={() => serArticleIds([...articleIds, 3])}>Brinquedos</div>
                    <div onClick={() => serArticleIds([...articleIds, 4])}>Móveis e utensílios</div>
                </div>
            </section>
            <button>
                {isLoading ? (
                    <ThreeDots color="#FFFFFF" width="51px" height="13px" />
                ) : (
                    "Registrar Insituição"
                )}
            </button>
        </Form>
    )
}

export default RegisterInstiution;

const Form = styled.form`
    
`;