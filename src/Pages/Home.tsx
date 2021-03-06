import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { StH1, StH2, StP, StSection } from "../Utils/HTMLComponents";
import CardButton from "../Components/Button/CardButton/CardButton";

const StCardFigure = styled.figure`
  width: 100%;
  height: clamp(300px, 40vh, 600px);
  margin: 32px 0;

  & figcaption {
    font-size: clamp(0.9rem, 1vw, 2rem);
  }

  @media (max-width: 600px) {
    height: clamp(200px, 30vh, 600px);
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <StSection>
        <StH1>Home</StH1>
        <StH2>Hoe werkt het?</StH2>
        <StP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
          felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
          pellentesque metus odio quis massa.
        </StP>

        <StP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
          felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
          pellentesque metus odio quis massa, nulla quam ullamcorper eros, ac
          pellentesque.
        </StP>

        <StCardFigure onClick={() => navigate("../aanmelden")}>
          <CardButton
            src="https://dogtime.com/assets/uploads/2018/10/how-to-get-pet-sitter-job.jpg"
            buttonText="Meld je aan om te starten!"
          />
        </StCardFigure>
      </StSection>

      <StSection>
        <StH2>Wie zijn wij?</StH2>
        <StP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus,
          felis laoreet dignissim pharetra, nulla quam ullamcorper eros, ac
          pellentesque metus odio quis massa. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. In cursus, felis laoreet dignissim
          pharetra, nulla quam ullamcorper eros, ac pellentesque metus odio quis
          massa. Nulla quam ullamcorper eros, ac pellentesque metus odio quis
          massa, nulla quam ullamcorper eros, ac pellentesque.
        </StP>
      </StSection>
    </>
  );
};

export default Home;
