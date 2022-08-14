import styled from "styled-components";
import { api } from "../Assets/Api/api";
import { GiPlantRoots, GiClothes } from "react-icons/gi";
import { IoSchool } from "react-icons/io5";
import { MdOutlinePets, MdOutlineNightShelter, MdFoodBank } from "react-icons/md";
import { BiFootball } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

function SearchMenu({ setInstitutions }) {
    const institutionCategories = [
        { id: 1, type: "institution", category: "Meio Ambiente", icon: <GiPlantRoots /> },
        { id: 2, type: "institution", category: "Education", icon: <IoSchool /> },
        { id: 4, type: "institution", category: "Abrigos", icon: <MdOutlineNightShelter /> },
        { id: 3, type: "institution", category: "Animais", icon: <MdOutlinePets /> }
    ];
    const articleCategories = [
        { id: 2, type: "article", category: "Roupas", icon: <GiClothes /> },
        { id: 3, type: "article", category: "Brinquedos", icon: <BiFootball /> },
        { id: 1, type: "article", category: "Alimentos", icon: <MdFoodBank /> },
        { id: 4, type: "article", category: "Móveis e utensílios", icon: <FaHome /> }
    ];

    function getInstitutionsByCategory(categoryId) {
        api
            .get(
                `/institutions/${categoryId}`
            )
            .then((res) => setInstitutions(res.data))
            .catch((err) => console.log(err));
    }

    function getInstitutionsByArticle(categoryId) { //FAZER NO BACK AINDA
        api
            .get(
                `/articles/${categoryId}`
            )
            .then((res) => setInstitutions(res.data))
            .catch((err) => console.log(err));
    }

    function renderOptions(data) {
        return data.map((obj, index) => {
            const { id, type, category, icon } = obj;
            return <Box key={index} onClick={() => {(type === "institution") ? (
                getInstitutionsByCategory(id)
                ) : (getInstitutionsByArticle(id))
            }}>
                <Image>{icon}</Image>
                <h2>{category}</h2>
            </Box>
        })
    };

    return (
        <Container>
            <section>
                {renderOptions(institutionCategories)}
            </section>
            <section>
                {renderOptions(articleCategories)}
            </section>
        </Container>
    )
}

export default SearchMenu;

const Container = styled.section`
    width: 70%;
    background-color: #D9D9D9;
    border-radius: 0.5rem;
    padding: 2rem;

    & > section{
        margin-bottom: 2%;
        display: flex;
        justify-content: space-evenly;
    }
`
const Box = styled.div`
    background-color: #CAC1C1;
    width: 6.4rem;
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    & > h2{
        font-size: 1rem;
        margin-bottom: 0.2rem;
        color: #5B5858;
    }
`
const Image = styled.div`
    font-size: 4rem;
    color: #D9D9D9;
`