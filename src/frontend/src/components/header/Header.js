import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import NavContext from "../../context/nav-context";
import Button from "../../shared/Button";

import classes from "./Header.module.css";

function Header() {
  const authContext = useContext(AuthContext);
  const navContext = useContext(NavContext);

  return (
    <header className={`${classes.header} ${classes.clearfix}`}>
      <div className={`${classes.navMain}`}>
        <h1>EShop</h1>
        <ul>
          {authContext.storedRole === "CUSTOMER" && (
            <li className={classes.navItem}>
              <a
                className={classes.navLink}
                href="#0"
                onClick={navContext.onGoToHome}
              >
                Home
              </a>
            </li>
          )}
          <li className={classes.navItem}>
            <a
              className={classes.navLink}
              href="#0"
              onClick={navContext.onGoToTickets}
            >
              Tickets
            </a>
          </li>
        </ul>
      </div>
      <div className={`${classes.navControl} ${classes.clearfix}`}>
        {authContext.isLoggedIn && (
          <p className={classes.navUser}>{authContext.storedEmail}</p>
        )}
        {authContext.isLoggedIn && (
          <Button className={classes.navLogout} onClick={authContext.onLogout}>
            logout
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
