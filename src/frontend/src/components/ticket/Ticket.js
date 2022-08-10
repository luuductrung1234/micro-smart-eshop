import React, { useState, useEffect, useContext, useRef } from "react";

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
                  <strong>Id:&nbsp;&nbsp;</strong>
                  {ticket.id}
                </div>
                <div className={classes.ticketAmount}>
                  <strong>Amount:&nbsp;&nbsp;</strong>
                  {ticket.amount}
                </div>
                <div className={classes.ticketStatus}>
                  <strong>Status:&nbsp;&nbsp;</strong>
                  {ticket.status}
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
                    className={classes.ticketBtn}
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
                  <strong>Id:&nbsp;&nbsp;</strong>
                  {ticket.id}
                </div>
                <div className={classes.ticketAmount}>
                  <strong>Amount:&nbsp;&nbsp;</strong>
                  {ticket.amount}
                </div>
                <div className={classes.ticketStatus}>
                  <strong>Status:&nbsp;&nbsp;</strong>
                  {ticket.status}
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
