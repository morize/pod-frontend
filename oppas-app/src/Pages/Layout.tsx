import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import { StArticle, StSubArticle } from "../Utils/HTMLComponents";
import Navigation from "./Navigation/MainNavigation";
import SubNavigation from "./Navigation/SubNavigation";
import bgLayout from "../Utils/Images/bg_pattern.png";

const RootLayout = styled.section`
  display: flex;
  min-height: 100vh;
  font-family: "Fira Sans", sans-serif;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const StContent = styled.section`
  width: 100%;
  height: 100vh;
  padding: 60px 0;
  box-sizing: border-box;
  overflow-y: auto;
  background-image: url(${bgLayout});
`;

const checkIfAuthenticationPage = (url: string) => {
  if (
    url === "inloggen" ||
    url === "aanmelden" ||
    url === "wachtwoord-vergeten"
  ) {
    return true;
  }
  return false;
};

const Layout = () => {
  const { pathname } = useLocation();

  const inAuthenticationPage = checkIfAuthenticationPage(
    pathname.split("/")[2]
  );

  return (
    <RootLayout>
      <Navigation />

      <StContent>
        {!inAuthenticationPage && <SubNavigation />}

        {!inAuthenticationPage ? (
          <StSubArticle>
            <Outlet />
          </StSubArticle>
        ) : (
          <StArticle>
            <Outlet />
          </StArticle>
        )}
      </StContent>
    </RootLayout>
  );
};

export default Layout;
