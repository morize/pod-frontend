import styled from "styled-components";
import { StH1, StArticle } from "../Utils/HTMLComponents";
import BaseInput from "../Components/Input/BaseInput";

const StForm = styled.form`
  & div {
    margin-bottom: 30px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;

const Account = () => {
  return (
    <StArticle>
      <StH1>Account</StH1>
      <StForm>
        <BaseInput
          label="Gebruikersnaam:"
          placeholder="Voer uw gebruikersnaam in"
        />
        <BaseInput label="Email:" placeholder="Voer uw email in" />
      </StForm>
    </StArticle>
  );
};

export default Account;