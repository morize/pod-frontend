import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { StH1, StArticle, StLabel } from "../Utils/HTMLComponents";
import Variants from "../Utils/Variants";
import BaseInput from "../Components/Input/BaseInput";
import BaseButton from "../Components/Button/BaseButton";
import Checkbox from "../Components/Checkbox/Checkbox";

import { login } from "../Hooks/Api";

const StErrorMessage = styled.p`
  color: red;
  margin: -20px 0 30px 0;
`;

const StForm = styled.form`
  position: relative;

  & div {
    margin-bottom: 30px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;

const StPasswordAnchor = styled.a`
  position: absolute;
  right: 0;

  & label {
    cursor: pointer;
    font-size: 14px;
    color: ${Variants.info};
    text-decoration: underline;
  }
`;

const Login = () => {
  const [formEmail, setFormEmail] = useState("mauricemr@outlook.com");
  const [formPassword, setFormPassword] = useState("Hilol123.");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  // Redux storechange logic
  // Not needed because its not persistent when the page refreshes
  // But i'll leave it here just in case its somehow better than localstorage.
  // ------------ LOGIC ---------------
  // const dispatch = useDispatch();
  // const dispatchUserDetails = (
  //   username: string,
  //   isBlocked: number,
  //   isAdmin: number
  // ) => {
  //   dispatch(
  //     setUserDetails({
  //       userDetails: {
  //         username: username,
  //         isAdmin: isAdmin,
  //         isBlocked: isBlocked,
  //       },
  //     })
  //   );
  // };

  const submitLoginData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    login(formEmail, formPassword)
      .then(() => {
        navigate("../../account");
      })
      .catch(() => {
        setFormError(true);
      });
  };

  const onPasswordResetClicked = (e: React.MouseEvent<HTMLAnchorElement>) =>
    navigate("../wachtwoord-vergeten");

  return (
    <StArticle>
      <StH1>Inloggen</StH1>
      <StForm>
        <BaseInput
          label="Email:"
          placeholder="Voer uw email in"
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <StPasswordAnchor onClick={onPasswordResetClicked}>
          <StLabel>Wachtwoord vergeten?</StLabel>
        </StPasswordAnchor>

        <BaseInput
          label="Wachtwoord:"
          type="password"
          placeholder="Voer uw wachtwoord in"
          onChange={(e) => setFormPassword(e.target.value)}
        />

        {formError && (
          <StErrorMessage>
            De aanmelding is mislukt, probeer nogmaals.
          </StErrorMessage>
        )}

        <Checkbox label="Ingelogd blijven" margin="-25px 0 15px -8px" />

        <BaseButton type="submit" label="Inloggen" onClick={submitLoginData} />
      </StForm>
    </StArticle>
  );
};

export default Login;
