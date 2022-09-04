import React, { useState, useEffect, useContext } from "react";

import classes from "./Ticket.module.css";

import AuthContext from "../../context/auth-context";

import {
  getAllTickets,
  getTicketByUser,
  updateTicket,
} from "../../services/ticketService";

const Ticket = () => {
  const context = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  const approveTicketHandler = (ticket) => {
    updateTicket(ticket.id, "APPROVED").then(() => {
      onReload();
    });
  };

  const completeTicketHandler = (ticket) => {
    updateTicket(ticket.id, "COMPLETED").then(() => {
      onReload();
    });
  };

  const onReload = () => {
    if (context.storedRole === "ADMIN")
      getAllTickets().then((data) => {
        setTickets(
          data.map((ticket) => {
            return (
              <div
                key={ticket.id}
                className={`${classes.ticket} ${classes.clearfix}`}
              >
                <div className={classes.ticketId}>
                  <strong className={classes.ticketLabel}>#&nbsp;&nbsp;</strong>
                  <span className={classes.ticketValue}>{ticket.id}</span>
                </div>
                <div className={classes.ticketAmount}>
                  <strong className={classes.ticketLabel}>
                    Amount:&nbsp;&nbsp;
                  </strong>
                  <span className={classes.ticketValue}>${ticket.amount}</span>
                </div>
                <div className={classes.ticketStatus}>
                  <strong className={classes.ticketLabel}>
                    Status:&nbsp;&nbsp;
                  </strong>
                  <span className={classes.ticketValue}>{ticket.status}</span>
                </div>
                {ticket.status === "CREATED" && (
                  <button
                    className={`${classes.ticketBtn} ${classes.bgBlue}`}
                    onClick={() => {
                      approveTicketHandler(ticket);
                    }}
                  >
                    Approve
                  </button>
                )}
                {ticket.status === "PROCESSING" && (
                  <button
                    className={`${classes.ticketBtn} ${classes.bgGreen}`}
                    onClick={() => {
                      completeTicketHandler(ticket);
                    }}
                  >
                    Complete
                  </button>
                )}
              </div>
            );
          })
        );
      });
    else
      getTicketByUser(context.storedUserId).then((data) => {
        setTickets(
          data.map((ticket) => {
            return (
              <div
                key={ticket.id}
                className={`${classes.ticket} ${classes.clearfix}`}
              >
                <div className={classes.ticketId}>
                  <strong className={classes.ticketLabel}>
                    Id:&nbsp;&nbsp;
                  </strong>
                  <span className={classes.ticketValue}>{ticket.id}</span>
                </div>
                <div className={classes.ticketAmount}>
                  <strong className={classes.ticketLabel}>
                    Amount:&nbsp;&nbsp;
                  </strong>
                  <span className={classes.ticketValue}>${ticket.amount}</span>
                </div>
                <div className={classes.ticketStatus}>
                  <strong className={classes.ticketLabel}>
                    Status:&nbsp;&nbsp;
                  </strong>
                  <span className={classes.ticketValue}>{ticket.status}</span>
                </div>
              </div>
            );
          })
        );
      });
  };

  useEffect(() => {
    onReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${classes.tickets} ${classes.clearfix}`}>
      <h3>Available tickets</h3>
      {tickets}
    </div>
  );
};
export default Ticket;
