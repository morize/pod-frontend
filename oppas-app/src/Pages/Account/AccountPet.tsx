import { useState, useEffect, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PetCard, { PetCardItem } from "../../Components/Card/PetCard/PetCard";
import {
  StH2,
  StH3,
  StSection,
  StP,
  StLabel,
} from "../../Utils/HTMLComponents";

const AccountPet = () => {
  return (
    <>
      <StH2>Huisdieren</StH2>
      <StSection>
        <StH3>Mijn Huisdieren</StH3>
      </StSection>
    </>
  );
};

export default AccountPet;
