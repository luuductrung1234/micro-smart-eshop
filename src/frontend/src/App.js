import React, { useContext } from "react";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Ticket from "./components/ticket/Ticket";

import "./App.css";

import AuthContext from "./context/auth-context";
import NavContext from "./context/nav-context";
import House from "./components/house/House";

function App() {
  const authContext = useContext(AuthContext);
  const navContext = useContext(NavContext);
  return (
    <div>
      {authContext.isLoggedIn && <Header />}
      <br />
      <main>
        {!authContext.isLoggedIn && <Login />}
        {authContext.isLoggedIn &&
          navContext.currentPage === "home" &&
          authContext.storedRole !== "ADMIN" && <Home />}
        {authContext.isLoggedIn &&
          navContext.currentPage === "home" &&
          authContext.storedRole === "ADMIN" && <Ticket />}
        {authContext.isLoggedIn && navContext.currentPage === "tickets" && (
          <Ticket />
        )}
        {authContext.isLoggedIn &&
          navContext.currentPage === "house" &&
          authContext.storedRole !== "ADMIN" && <House />}
      </main>
    </div>
  );
}

export default App;
