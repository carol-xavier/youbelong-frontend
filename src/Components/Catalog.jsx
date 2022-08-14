import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";

function Catalog({ institutions }) {
    const navigate = useNavigate();

    function renderInstitutions() {
        return institutions.map((obj, index) => {
            const { id, name, picture } = obj;
            return <Box key={index} onClick={() => navigate(`/institution/${id}`)}>
                <img src={picture} alt="Foto da instituição" />
                <button><BsHeart /></button>
                <p>{name}</p>
            </Box>
        })
    };

    return (
        <Display>
            {(institutions.length > 0) ? (renderInstitutions()
            ) : ("Nenhuma instituição encontrada nessa categoria")}
        </Display>
    )
}

export default Catalog;

const Box = styled.div`
background-color: #D9D9D9;
    width: 12rem;
    height: 10rem;
    border-radius: 0.2rem;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    

    & > img{
        position: absolute;
        width: 10rem;
        top: 1rem;
    }

    & > button{
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        z-index: 2;
        background: none;
        color: red;
    }

    & > p{
        position: absolute;
        bottom: 0.7rem;
        font-family: 'Roboto', sans-serif;
        color: #5B5858
    }
`;

const Display = styled.section`
    width: 100vw;
    margin-top: 2rem;

    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;