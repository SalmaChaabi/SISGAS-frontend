import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/dashboard";
import DashboardPage from "./pages";
import SignInPage from "./pages/signIn";
import UsersPage from "./pages/users";
import App from "./App";
import WelcomePage from "./pages/welcome";
import Approbations from "./pages/approbations";




ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<App />}>
          <Route element={<Layout />}>
            <Route path="/overview" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/approbations" element={<Approbations />} />
          </Route>
          

          

          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
