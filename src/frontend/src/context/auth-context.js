import React, { useState, useEffect } from "react";
import { getAllUsers } from "../services/userService";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isRegistering: false,
  storedUserId: 0,
  storedEmail: "",
  storedRole: "",
  onLogout: () => {
    /* TODO need to implement */
  },
  onLogin: () => {
    /* TODO need to implement */
  },
  onRegister: () => {
    /* TODO need to implement */
  },
  onSwitchToRegister: () => {
    /* TODO need to implement */
  },
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUserId, setStoredUserId] = useState(0);
  const [storedEmail, setStoredEmail] = useState("");
  const [storedRole, setStoredRole] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "1") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(true);
      setStoredUserId(storedUser.id);
      setStoredEmail(storedUser.email);
      setStoredRole(storedUser.role);
    }
  }, []);

  const registerHandler = (email, password) => {
    // just a dummy demo, no need to store registered account
    setIsRegistering(false);
  };

  const switchToRegisterHandler = () => {
    setIsRegistering(true);
  };

  const loginHandler = (email, password) => {
    getAllUsers(email).then((users) => {
      let user = users[0];
      if (user.password !== password) return;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "1");
      setIsLoggedIn(true);
      setStoredUserId(user.id);
      setStoredEmail(user.email);
      setStoredRole(user.role);
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setStoredUserId(0);
    setStoredEmail("");
    setStoredRole("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isRegistering: isRegistering,
        storedUserId: storedUserId,
        storedEmail: storedEmail,
        storedRole: storedRole,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: registerHandler,
        onSwitchToRegister: switchToRegisterHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
