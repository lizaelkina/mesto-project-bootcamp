const config = {
  url: 'https://mesto.nomoreparties.co/v1/wbf-cohort-5',
  headers: {
    "Content-Type": "application/json",
    "authorization": "96531009-4ee7-4854-9cab-762893291a9b"
  }
}

export const getUserInfo = () => fetch(`${config.url}/users/me`, {
  method: 'GET',
  headers: config.headers
}).then(response => {
  return response.json();
});

export const getCards = () => fetch(`${config.url}/cards`, {
  method: 'GET',
  headers: config.headers
}).then(response => {
  return response.json();
});

export const updateProfile = (name, description) => fetch(`${config.url}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: description
  })
}).then(response => {
  return response.json();
});

export const updateAvatar = url => fetch(`${config.url}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: url
  })
}).then(response => {
  return response.json();
});

export const addCard = (name, url) => fetch(`${config.url}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    link: url
  })
}).then(response => {
  return response.json();
});

export const deleteCard = cardId => fetch(`${config.url}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
}).then(response => {
  return response.json();
});

export const putLike = cardId => fetch(`${config.url}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers
}).then(response => {
  return response.json();
});

export const deleteLike = cardId => fetch(`${config.url}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
}).then(response => {
  return response.json();
});
