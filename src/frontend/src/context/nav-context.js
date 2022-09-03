import React, { useState, useEffect } from "react";

const NavContext = React.createContext({
  currentPage: "home",
  onGoToHome: () => {
    /* TODO need to implement */
  },
  onGoToTickets: () => {
    /* TODO need to implement */
  },
  onGoToHouse: () => {
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

  const goToHouseHandler = () => {
    setCurrentPage("house");
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
        onGoToHouse: goToHouseHandler,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
