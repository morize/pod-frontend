import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import Variants, { TVariants } from "./Variants";

export const StH1 = styled.h1`
  margin: 0 0 3.4% 0;
  font-size: clamp(1.6rem, 2vw, 3rem);
  color: ${Variants.default};

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const StH2 = styled.h2`
  margin: 2% 0 4% 0;
  font-size: clamp(1.3rem, 1.5vw, 2.4rem);
  color: ${Variants.default};

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const StH3 = styled.h3`
  margin: 0 0 2.8% 0;
  font-size: clamp(1rem, 1.2vw, 2rem);
  color: ${Variants.default};
`;

interface IStP {
  variant?: TVariants;
  bold?: boolean;
}

export const StP = styled.p<IStP>`
  margin: 0;
  font-size: clamp(0.9rem, 0.9vw, 1.1rem);
  font-weight: ${(props) => (props.bold ? 600 : 500)};
  color: ${(props) => Variants[props.variant!]};
  white-space: pre-wrap;
`;

export const StLabel = styled.label`
  display: block;
  font-size: clamp(0.9rem, 0.9vw, 1.2rem);
  color: ${Variants.primary};
  font-weight: 600;
  color: ${Variants.primary};
  user-select: none;
`;

export const StSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2% 0;

  &:last-child {
    margin: 2% 0 0 0;
  }
`;

export const StArticle = styled.article<{ admin?: boolean }>`
  display: flex;
  flex-direction: column;
  width: clamp(500px, 50%, 800px);
  min-width: ${(props) => (props.admin ? "100%" : "auto")};
  margin: 0 auto;
  overflow: ${(props) => (props.admin ? "auto" : "unset")};

  @media (max-width: 600px) {
    margin: 4vh auto 0 auto;
    padding: 0 8vw;
    overflow-y: auto;
  }

  @media (min-width: 600px) {
    &::after {
      min-height: 8vh;
      content: "";
    }
  }
`; 

export const StSubArticle = styled(StArticle)`
  width: clamp(400px, 50%, 800px);
  margin: 2vh auto 0 auto;
`;

export const StForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;

  & div {
    user-select: none;
  }
`;

export const StErrorMessage = styled.p`
  margin: -2% 0 4.5% 0;
  color: ${Variants.danger};
`;

const StProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StBackAnchor = styled.div`
margin-top: 4%;
font-size: clamp(0.9rem, 1.2vw, 1.2rem);
text-align: center;
text-decoration: underline;
cursor: pointer;
`

export const LoadingComponent = () => (
  <StProgressContainer>
    <CircularProgress />
  </StProgressContainer>
);
