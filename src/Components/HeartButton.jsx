import styled from "styled-components";
import { getContext } from "../Context/ContextAPI";
import { api } from "./../Assets/Api/api";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function HeartButton({ id, heartsTable }) {
    const { 
        setLoad, 
        setHeartStatus, 
        donorInstitutions, 
        setDonorInstitutions } = getContext();

    function manageInstitution(institutionId) {
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
                    alert("Você fez login? Não foi possível salvar a instituição. Por favor, tente novamente ou faça login.");
                });
        } else {
            api
                .delete(`/donor/${institutionId}`, config)
                .then(() => {
                    heartsTable[institutionId] = false;
                    alert("Insituição removida da sua lista com sucesso!");
                    setLoad(load => !load);
                    setHeartStatus(heartStatus => !heartStatus);
                    setDonorInstitutions(donorInstitutions.filter(obj => obj.id !== institutionId));
                })
                .catch((err) => {
                    console.error(err);
                    alert("Não foi possível remover a instituição. Por favor, tente novamente.");
                });
        }
    }

    return (
        <Button onClick={() => manageInstitution(id)}>
            {heartsTable[id] === true ?
                <BsHeartFill /> : <BsHeart />}
        </Button>
    )
}

export default HeartButton;

const Button = styled.button`
    background: none;
    color: #CA0D0D;
`;