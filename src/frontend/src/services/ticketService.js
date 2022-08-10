import fetch from "unfetch";

const TICKET_API_URL = "api/v1/tickets";

export const getAllTickets = () => {
  return fetch(TICKET_API_URL, {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  }).then(checkStatus);
};

export const getTicketByUser = (userId) => {
  return fetch(`${TICKET_API_URL}/:byUser?userId=${userId}`, {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  }).then(checkStatus);
};

export const addNewTicket = (userId, amount) =>
  fetch(TICKET_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify({ userId: userId, amount: amount }),
  }).then(checkStatus);

export const updateTicket = (ticketId, status) =>
  fetch(`${TICKET_API_URL}/${ticketId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ status: status }),
  }).then(checkStatus);

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  }
  // convert non-2xx HTTP responses into errors:
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
};
