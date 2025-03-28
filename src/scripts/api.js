const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "b06e1f78-c3e2-417a-bad6-e3883c876980",
    "Content-Type": "application/json",
  },
};

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function editProfile({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function addCard({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId} `, {
    headers: config.headers,
    method: "PUT",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId} `, {
    headers: config.headers,
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({ avatar }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
