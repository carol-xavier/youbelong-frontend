import { useState } from "react";
import { getContext } from "../Context/ContextAPI";
import { api } from "../Assets/Api/api";
import { GiPlantRoots, GiClothes } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { MdOutlinePets, MdOutlineNightShelter, MdFoodBank } from "react-icons/md";
import { BiFootball } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import styled from "styled-components";
import SearchButton from "./SearchButton";

function SearchMenu() {
    const { setInstitutions } = getContext();
    const [color, setColor] = useState({ active: 0 });

    const categories = [
        { id: 1, dbId: 1, type: "institution", category: "Meio Ambiente", icon: <GiPlantRoots /> },
        { id: 2, dbId: 2, type: "institution", category: "Education", icon: <IoSchool /> },
        { id: 3, dbId: 4, type: "institution", category: "Abrigos", icon: <MdOutlineNightShelter /> },
        { id: 4, dbId: 3, type: "institution", category: "Animais", icon: <MdOutlinePets /> },
        { id: 5, dbId: 2, type: "article", category: "Roupas", icon: <GiClothes /> },
        { id: 6, dbId: 3, type: "article", category: "Brinquedos", icon: <BiFootball /> },
        { id: 7, dbId: 1, type: "article", category: "Alimentos", icon: <MdFoodBank /> },
        { id: 8, dbId: 4, type: "article", category: "Móveis e utensílios", icon: <FaHome /> }
    ];

    function handleClick(type, dbId) {
        (type === "institution") ? (
            getInstitutionsByCategory(dbId)
        ) : (getInstitutionsByArticle(dbId));
    };

    function getInstitutionsByCategory(categoryId) {
        api
            .get(
                `/institutions/${categoryId}`
            )
            .then((res) => setInstitutions(res.data))
            .catch((err) => console.log(err));
    };

    function getInstitutionsByArticle(articleId) {
        api
            .get(
                `/articles/${articleId}`
            )
            .then((res) => setInstitutions(res.data))
            .catch((err) => console.log(err));
    };

    function renderOptions(data) {
        return data.map((obj) => {
            const { id, dbId, type, category, icon } = obj;

            return (
                <div key={id} onClick={() => handleClick(type, dbId)}>
                    <SearchButton id={id}
                        category={category}
                        icon={icon}
                        color={color}
                        setColor={setColor} />
                </div>
            )
        })
    };

    return (
        <Container>
            <section>
                {renderOptions(categories)}
            </section>
        </Container>
    )
}

export default SearchMenu;

const Container = styled.section`
    width: 75%;
    background-color: #D9D9D9;
    border-radius: 0.5rem;
    margin-top: 15vh;
    display: flex;
    justify-content: center;

    & > section{
        margin-bottom: 3vh;
        display: grid;
        grid-auto-flow: row;
        grid-gap: 2rem;
        grid-template-rows: 7rem 7rem; 
        grid-template-columns: 7rem 7rem 7rem 7rem; 
        padding: 2rem;
    }
`;