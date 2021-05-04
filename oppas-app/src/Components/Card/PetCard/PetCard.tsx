import { ReactNode } from "react";
import styled from "styled-components";

import dogPattern from "../../../Utils/Images/dog_pattern.jpg";

export interface IPetCard {
  children?: ReactNode;
}

const PetCardContainer = styled.div`
  display: flex;
  align-items: center;
  height: 160px;
  margin-bottom: 32px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  & figure {
    display: flex;
    width: 35%;
    height: 100%;
    margin: 0;
    background: none;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 8px 0 0 10px;
      object-fit: cover;
    }
  }
`;

const PetCardContent = styled.div`
  width: 65%;
  height: 100%;
`;

const PetCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;

  font-size: 120%;
  border-radius: 0 8px 0 0;
  background: #bc9d61;
  color: #ffff;
`;

const PetCardDescription = styled(PetCardHeader)`
  height: 60%;
  border-radius: 0 0 8px 0;
  font-size: 100%;
  background: #e9ce88;
  color: #744226;
`;

export const PetCardItem = () => {
  return (
    <PetCardContainer>
      <figure>
        <img
          src="https://pbs.twimg.com/media/CyTv5WOWEAASezv.jpg"
          alt="Een huisdier"
        />
      </figure>

      <PetCardContent>
        <PetCardHeader>Baco </PetCardHeader>
        <PetCardDescription>wat the fuc</PetCardDescription>
      </PetCardContent>
    </PetCardContainer>
  );
};

export const StPetItemsContainer = styled.section`
  display: grid;
  justify-content: center;

  padding: 40px 32px;

  background-image: url(${dogPattern});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & p {
    align-self: center;
    margin: 0;
    padding: 16px;
    border-radius: 8px;
    background: #e9ce88;
    color: #744226;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const PetCard = ({ children }: IPetCard) => {
  const emptyList = !children && <p>U heeft geen oppasaanvragen</p>;

  return (
    <StPetItemsContainer>
      {children}
      {emptyList}
    </StPetItemsContainer>
  );
};

export default PetCard;