import {closePopup} from "./modal";

const config = {
  url: 'https://mesto.nomoreparties.co/v1/wbf-cohort-5',
  headers: {
    "Content-Type": "application/json",
    "authorization": "96531009-4ee7-4854-9cab-762893291a9b"
  }
}

function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers
  }).then(response => {
    return response.json();
  })
}

function getCards() {
  return fetch(`${config.url}/cards`, {
    method: 'GET',
    headers: config.headers
  }).then(response => {
    return response.json();
  })
}

function updateProfile(name, description) {
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

function addCard(name, url) {
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

export {getUserInfo, getCards, updateProfile, addCard}



