import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DonorContext from "../Context/DonorContext";
import { useNavigate } from "react-router-dom";
import HeartButton from "./HeartButton";

function Catalog({ institutions, setLoad }) {
    const navigate = useNavigate();
    const { donorInstitutions, setDonorInstitutions } = useContext(DonorContext);
    const heartsTable = {};

    institutions.map((num) => heartsTable[num.id] = false);
    if (donorInstitutions) {
        donorInstitutions.map((obj, index) => {
            const { id } = obj;
            if (heartsTable[id] === false) heartsTable[id] = true;
        });
    }

    function renderInstitutions() {
        return institutions.map((obj, index) => {
            const { id, name, picture } = obj;

            return <Box key={index} >
                <div><HeartButton 
                    id={id} 
                    heartsTable={heartsTable} 
                    setLoad={setLoad}/>
                </div>
                <img src={picture} alt="Foto da instituição" onClick={() => navigate(`/institution/${id}`)} />
                <p onClick={() => navigate(`/institution/${id}`)}>{name}</p>
            </Box>
        })
    };

    return (
        <Display>
            {(institutions.length > 0 && heartsTable) ? (renderInstitutions()
            ) : ("Nenhuma instituição encontrada nessa categoria")}
        </Display>
    )
}

export default Catalog;

const Box = styled.div`
    background-color: #D9D9D9;
    width: 12rem;
    height: 10rem;
    margin-bottom: 1rem;
    margin-right: 1rem;
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

    & > div{
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        z-index: 2;
    }

    & > p{
        position: absolute;
        bottom: 0.7rem;
        font-family: 'Roboto', sans-serif;
        color: #5B5858
    }
`;

const Display = styled.div`
    width: 90%;
    margin-top: 2rem;

    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;