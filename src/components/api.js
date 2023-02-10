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
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка получения данных профиля: ${response.status} ${response.statusText}`);
});

export const getCards = () => fetch(`${config.url}/cards`, {
  method: 'GET',
  headers: config.headers
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка получения карточек: ${response.status} ${response.statusText}`);
});

export const updateProfile = (name, description) => fetch(`${config.url}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: description
  })
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка обновления профиля: ${response.status}. Попробуйте ещё раз.`);
});

export const updateAvatar = url => fetch(`${config.url}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: url
  })
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка обновления аватара: ${response.status}. Попробуйте ещё раз.`);
});

export const addCard = (name, url) => fetch(`${config.url}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    link: url
  })
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка добавления карточки: ${response.status}. Попробуйте ещё раз.`);
});

export const deleteCard = cardId => fetch(`${config.url}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка удаления карточки: ${response.status}. Попробуйте ещё раз.`);
});

export const putLike = cardId => fetch(`${config.url}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка установки лайка: ${response.status} ${response.statusText}`);
});

export const deleteLike = cardId => fetch(`${config.url}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка удаления лайка: ${response.status} ${response.statusText}`);
});
