import fetch from "unfetch";

const PRODUCT_API_URL = "api/v1/products";

export const getAllProducts = () => {
  return fetch(PRODUCT_API_URL, {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  }).then(checkStatus);
};

export const getSuggestion = (userId) => {
  return fetch(`${PRODUCT_API_URL}/:suggestion?userId=${userId}`, {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  }).then(checkStatus);
};

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  }
  // convert non-2xx HTTP responses into errors:
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
};
