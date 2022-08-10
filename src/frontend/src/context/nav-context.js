import React, { useState, useEffect } from "react";

const NavContext = React.createContext({
  currentPage: "home",
  onGoToHome: () => {
    /* TODO need to implement */
  },
  onGoToTickets: () => {
    /* TODO need to implement */
  },
  onGoToProfile: () => {
    /* TODO need to implement */
  },
});

export const NavContextProvider = (props) => {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "1") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.role === "ADMIN"
        ? setCurrentPage("tickets")
        : setCurrentPage("home");
    }
  }, []);

  const goToTicketsHandler = () => {
    setCurrentPage("tickets");
  };

  const goToProfileHandler = () => {
    setCurrentPage("profile");
  };

  const goToHomeHandler = () => {
    setCurrentPage("home");
  };

  return (
    <NavContext.Provider
      value={{
        currentPage: currentPage,
        onGoToHome: goToHomeHandler,
        onGoToTickets: goToTicketsHandler,
        onGoToProfile: goToProfileHandler,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
