const baseUrl = "http://localhost:3001";

export const checkResponse = async (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  try {
    return await res.json();
  } catch {
    return {};
  }
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
};

export const removeCard = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const addCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const removeCardLike = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
