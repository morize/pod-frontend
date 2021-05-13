import { Route, Routes, Outlet } from "react-router-dom";

import PrivateRoute from "../Routes/PrivateRoute";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import AccountGegevens from "../Pages/Account/AccountDetail";
import AccountMedia from "../Pages/Account/AccountMedia";
import AccountSitter from "../Pages/Account/AccountSitter";
import AccountPet from "../Pages/Account/AccountPet";
import PetCreate from "../Pages/Pet/PetCreate";
import PetProfile from "../Pages/Pet/PetProfile";
import PetOverview from "../Pages/Overview/PetOverview";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword";

const PODRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/*" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="account" element={<Outlet />}>
          <Route path="inloggen" element={<Login />} />
          <Route path="aanmelden" element={<Register />} />
          <Route path="wachtwoord-vergeten" element={<ForgotPassword />} />
          <Route
            path="wachtwoord-vergeten/:token/:email"
            element={<ResetPassword />}
          />
          <PrivateRoute element={<AccountGegevens />} />
          <PrivateRoute path="algemeen" element={<AccountGegevens />} />
          <PrivateRoute path="media" element={<AccountMedia />} />
          <PrivateRoute path="opasser" element={<AccountSitter />} />
          <PrivateRoute path="huisdieren" element={<AccountPet />} />
          <PrivateRoute
            path="huisdieren/nieuw-huisdier"
            element={<PetCreate />}
          />
          <PrivateRoute
            path="huisdieren/:id/profiel"
            element={<PetProfile />}
          />
        </Route>

        <PrivateRoute path="overzicht" element={<Outlet />}>
          <PrivateRoute element={<PetOverview />} />
          <PrivateRoute path="huisdieren" element={<PetOverview />} />
          <PrivateRoute
            path=":id/profiel"
            element={<PetProfile />}
          />
        </PrivateRoute>
      </Route>
    </Routes>
  );
};

export default PODRoutes;
