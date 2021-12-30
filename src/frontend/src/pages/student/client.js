import fetch from "unfetch";

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  }
  // convert non-2xx HTTP responses into errors:
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
};

export const getAllStudents = (searchText) => {
  let parameters = "?";
  if (searchText) {
    parameters += `searchText=${searchText}`;
  }
  return fetch(`api/v1/students${parameters}`, {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  }).then(checkStatus);
};

export const addNewStudent = (student) =>
  fetch("api/v1/students", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(student),
  }).then(checkStatus);
