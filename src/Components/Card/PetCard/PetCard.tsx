import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import BaseButton from "../../Button/BaseButton";
import dogPattern from "../../../Utils/Images/dog_pattern.jpg";

const StPetCard = styled(NavLink)`
  display: flex;
  width: 100%;
  height: clamp(60px, 16vh, 200px);
  margin-bottom: 24px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:last-child {
    margin-bottom: 0;
  }
`;

const StPetCardFigure = styled.figure`
  width: 35%;
  margin: 0;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 8px 0 0 8px;
    object-fit: cover;
  }
`;

const StPetCardContent = styled.div`
  width: 65%;
`;

const StPetCardContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
  border-radius: 0 8px 0 0;
  background: #bc9d61;
  font-size: clamp(0.9rem, 0.9vw, 1.2rem);
  color: #ffff;
`;

const StPetCardContentDescription = styled(StPetCardContentHeader)`
  flex-direction: column;
  height: 60%;
  border-radius: 0 0 8px 0;
  background: #e9ce88;
  font-size: clamp(0.8rem, 0.9vw, 1.1rem);
  color: #744226;

  & p {
    margin: 0 0 4px 0;
    color: #744226;
  }
`;

interface ISitterCardItem {
  petName: string;
  petImageUrl: string;
  redirectTo: number;
  owner: string;
  status: string;
}

export const SitterCardItem = (props: ISitterCardItem) => (
  <StPetCard to={`aanvraag/${props.redirectTo}`}>
    <StPetCardFigure>
      <img src={props.petImageUrl} alt="Een huisdier" />
    </StPetCardFigure>

    <StPetCardContent>
      <StPetCardContentHeader>{props.petName}</StPetCardContentHeader>
      <StPetCardContentDescription>
        <p>Eigenaar: {props.owner}</p>
        <p>Status: {props.status}</p>
      </StPetCardContentDescription>
    </StPetCardContent>
  </StPetCard>
);

interface IPetCardItem {
  petName: string;
  petKind: string;
  petBreed: string;
  petImageUrl: string;
  redirectTo: string;
}

export const PetCardItem = (props: IPetCardItem) => (
  <StPetCard to={`profiel/${props.redirectTo}`}>
    <StPetCardFigure>
      <img src={props.petImageUrl} alt="Een huisdier" />
    </StPetCardFigure>

    <StPetCardContent>
      <StPetCardContentHeader>{props.petName}</StPetCardContentHeader>
      <StPetCardContentDescription>
        <p>Soort: {props.petKind}</p>
        <p>Ras: {props.petBreed}</p>
      </StPetCardContentDescription>
    </StPetCardContent>
  </StPetCard>
);

const StPetRequestCardContent = styled(StPetCardContent)`
  border-radius: 8px;
  width: 100%;

  & div {
    border-radius: 8px 8px 0 0;

    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
`;
interface IPetRequestCard {
  sitter_name: string;
  pet_name: string;
  status: string;
  onClick: () => void;
}

export const PetRequestCardItem = ({
  sitter_name,
  pet_name,
  status,
  onClick,
}: IPetRequestCard) => (
  <StPetCard to={""} onClick={onClick}>
    <StPetRequestCardContent>
      <StPetCardContentHeader>Opasser: {sitter_name}</StPetCardContentHeader>
      <StPetCardContentDescription>
        <p>Voor huisdier: {pet_name}</p>
        <p>Uw reactie: {status}</p>
      </StPetCardContentDescription>
    </StPetRequestCardContent>
  </StPetCard>
);

const StPetCardContainer = styled.section`
  padding: 8%;
  border-radius: 8px;
  background-image: url(${dogPattern});
  background-position: center;
  box-sizing: border-box;

  & button {
    margin: 2% 0 0 0;
    background: #a77326;
  }
`;

const StEmptyIndicator = styled.div`
  padding: 5%;
  background: #a46b36;
  font-size: clamp(0.9rem, 0.9vw, 1.2rem);
  border-radius: 8px;
  text-align: center;
  color: #ffff;
  user-select: none;
  box-sizing: border-box;
`;

export interface IPetCard {
  children?: ReactNode;
  cardVariant: "sitter" | "owner";
}

const PetCard = ({ children, cardVariant }: IPetCard) => {
  const navigate = useNavigate();

  const emptyCardList = !children && (
    <StEmptyIndicator>
      {cardVariant === "sitter"
        ? "U heeft geen oppasaanvragen"
        : "U heeft geen aangemelde huisdieren"}
    </StEmptyIndicator>
  );

  return (
    <StPetCardContainer>
      {children}
      {emptyCardList}

      {cardVariant === "owner" && (
        <BaseButton
          label="Huisdier toevoegen voor oppas"
          onClick={() => navigate("nieuw-huisdier")}
        />
      )}
    </StPetCardContainer>
  );
};

export default PetCard;
