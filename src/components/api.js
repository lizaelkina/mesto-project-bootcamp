const config = {
  url: 'https://mesto.nomoreparties.co/v1/wbf-cohort-5',
  headers: {
    "Content-Type": "application/json",
    "authorization": "96531009-4ee7-4854-9cab-762893291a9b"
  }
}

export function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers
  }).then(response => {
    return response.json();
  })
}

export function getCards() {
  return fetch(`${config.url}/cards`, {
    method: 'GET',
    headers: config.headers
  }).then(response => {
    return response.json();
  })
}

export function updateProfile(name, description) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  }).then(response => {
    return response.json();
  })
}

export function updateAvatar(url) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  }).then(response => {
    return response.json();
  })
}

export function addCard(name, url) {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: url
    })
  }).then(response => {
    return response.json();
  })
}

export function deleteCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(response => {
    return response.json();
  })
}

export function putLike(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(response => {
    return response.json();
  })
}

export function deleteLike(cardId) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(response => {
    return response.json();
  })
}
