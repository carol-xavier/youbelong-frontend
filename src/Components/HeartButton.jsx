import styled from "styled-components";
import DonorContext from "../Context/DonorContext";
import { api } from "./../Assets/Api/api";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useEffect, useContext, useState } from "react";

function HeartButton({ id, heartsTable, setLoad }) {
    const { donorInstitutions, setDonorInstitutions } = useContext(DonorContext);
    const [heartStatus, setHeartStatus] = useState(false);

    function saveInstitution(institutionId) {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };
        if (heartsTable[institutionId] === false) {
            api
                .post(`/donor`, { institutionId }, config)
                .then(() => {
                    heartsTable[institutionId] = true;
                    alert("Insituição salva com sucesso!");
                    setLoad(load => !load);
                    setHeartStatus(heartStatus => !heartStatus);
                })
                .catch((err) => {
                    console.error(err);
                    alert("Não foi possível salvar a instituição. Por favor, tente novamente.");
                });
        } else {
            api
                .delete(`/donor/${institutionId}`, config)
                .then(() => {
                    heartsTable[institutionId] = false;
                    alert("Insituição removida da sua lista com sucesso!");
                    setLoad(load => !load);
                    setHeartStatus(heartStatus => !heartStatus);
                })
                .catch((err) => {
                    console.error(err);
                    alert("Não foi possível remover a instituição. Por favor, tente novamente.");
                });
        }
    }

    return (
        <Button onClick={() => saveInstitution(id)}>
            {heartsTable[id] === true ? 
            <BsHeartFill /> : <BsHeart />}
        </Button>
    )
}

export default HeartButton;

const Button = styled.button`
    background: none;
    color: red;
`