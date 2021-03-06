import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import {
  StH2,
  StH3,
  StSection,
  StP,
  StLabel,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import { sendEmailVerificationLink, logout } from "../../Api/AuthCalls";
import { getUserDetails } from "../../Api/UserCalls";
import BaseButton from "../../Components/Button/BaseButton";

const StAccountDetails = styled.section`
  & div {
    display: flex;
    margin-bottom: 2%;

    &:last-child {
      margin-bottom: 0;
    }

    & p {
      margin-left: auto;
    }
  }
`;

const StSectionVerify = styled(StSection)`
  margin-bottom: 4%;
  text-align: center;

  & p {
    margin-bottom: 4%;
  }
`;

const AccountGegevens = () => {
  const navigate = useNavigate();

  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: accountData, isValidating: isAccountDataLoaded } = useSWR(
    `api/user/${userId}`,
    getUserDetails,
    { revalidateOnFocus: false }
  );

  const onLogoutClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout().then(() => navigate("../../home"));
  };

  return !isAccountDataLoaded ? (
    <>
      <StH2>Algemeen</StH2>

      <StSection>
        <StH3>Account Gegevens</StH3>
        <StAccountDetails>
          <div>
            <StLabel>Gebruikersnaam:</StLabel>
            <StP>{accountData?.name ? accountData.name : "-"}</StP>
          </div>
          <div>
            <StLabel>Email:</StLabel>
            <StP>{accountData?.email ? accountData.email : "-"}</StP>
          </div>
          <div>
            <StLabel>Email Status:</StLabel>
            <StP>
              {accountData?.email_verified_at
                ? "Geverifieerd"
                : "Niet geverifieerd"}
            </StP>
          </div>
          <div>
            <StLabel>Account Status:</StLabel>
            <StP>
              {accountData?.status === "blocked" ? "Geblokkeerd" : "Actief"}
            </StP>
          </div>
        </StAccountDetails>
      </StSection>

      <StSection>
        <StH3>Acties</StH3>
        {!accountData?.email_verified_at && (
          <StSectionVerify>
            <StP variant="info" bold={true}>
              Verifieer uw account om verder gebruik te maken van Passen op je
              Dier.
            </StP>
            <BaseButton
              label="Emailverificatie sturen"
              variant="primary"
              onClick={() => sendEmailVerificationLink()}
            />
          </StSectionVerify>
        )}

        <BaseButton
          label="Uitloggen"
          variant="secondary"
          onClick={onLogoutClicked}
        />
      </StSection>
    </>
  ) : (
    <LoadingComponent />
  );
};

export default AccountGegevens;
