import styled from "styled-components";
import { getContext } from "../Context/ContextAPI";
import { useParams } from "react-router-dom";
import Whatsapp from "../Assets/images/whatsapp-logo.png"
import ReactPlayer from "react-player";
import Top from "../Components/Top";

function Institution() {
  const { institutions } = getContext();
  const { institutionId } = useParams();
  const refId = parseInt(institutionId);
  const institutionInfo = institutions.find((obj) => obj.id === refId);

  const { name, picture, description, mission, values, video, contact } = institutionInfo;

  return (
    <Container>
      <Top />
      <Content>
        <Test>
          <h1>{name}</h1>
          <div>
            <img src={picture} alt="Foto da instituição" className="mainPicture" />
          </div>
          <p>{description}</p>
          {values && <h3>Valores</h3>}
          <p>{values}</p>
          {mission && <h3>Missão</h3>}
          <p>{mission}</p>
          {video && <h3>Vídeo</h3>}
          <div>
            <ReactPlayer url={video} />
          </div>
          <a href={`https://wa.me/55${contact}`}>
            <img src={Whatsapp} alt="Whatsapp-logo" className="wappLogo" />
            <p>Gostaria de agendar um momento para nos conhecer? Clique aqui!</p>
          </a>
        </Test>
      </Content>
    </Container>
  )
};

export default Institution;

const Container = styled.article`
`;

const Content = styled.div`
    margin-top:15vh;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Test = styled.div`
  width: 80%;

  & > div{
    display: flex;
    justify-content: center;
  }

  .mainPicture{
    width: 60%;
  }

  & > h1{
    margin-bottom: 0.5rem;
    color: rgba(1, 41, 44, 1);
    font-family: 'Roboto', serif;
    font-weight: 700;
    font-size: 2rem;
  }

  & > h3{
    margin-top: 1rem;
    color: rgba(1, 41, 44, 1);
    font-family: 'Roboto', serif;
    font-weight: 700;
    font-size: 1.3rem;
  }

  & > p{
    margin-top: 1rem;
    font-family: 'Roboto', serif;
    font-weight: 400;
    font-size: 1rem;
  }

  .wappLogo{
    width: 2rem;
    margin-right: 0.3rem;
  }

  a{
    margin-top: 3rem;
    display: flex;
    align-items: center;
  }
`;