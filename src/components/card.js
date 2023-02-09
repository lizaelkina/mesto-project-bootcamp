import {cardTemplate} from './utils';
import {deleteLike, putLike} from "./api";

// проверки на владельца и на лайки
function checkCardIsMy(card, userId) {
  return card.owner._id === userId;
}

function checkCardIsLiked(card, userId) {
  return card.likes.some((like) => {
    return like._id === userId;
  })
}

// формирование элемента карточки в DOM
export function createCardElement(cardData, userId, callbackOpenViewer, callbackOpenConfirm) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardData.element = cardElement;
  const cardImage = cardElement.querySelector('.card__photo');
  const cardTextElement = cardElement.querySelector('.card__text');
  const buttonLikeCard = cardElement.querySelector('.card__btn-like');
  const counterLikesCard = cardElement.querySelector('.card__like-counter');
  const buttonDeleteCard = cardElement.querySelector('.card__btn-delete');
  cardImage.src = cardData.link;
  cardImage.setAttribute('alt', cardData.name);
  cardTextElement.textContent = cardData.name;
  counterLikesCard.textContent = cardData.likes.length;

  cardImage.addEventListener('click', () => {
    callbackOpenViewer(cardData);
  });

  if (checkCardIsLiked(cardData, userId)) {
    buttonLikeCard.classList.add('card__btn-like_active');
  }

  function toggleLikeElement() {
    if (buttonLikeCard.classList.contains('card__btn-like_active')) {
      deleteLike(cardData._id)
          .then((card) => {
            buttonLikeCard.classList.remove('card__btn-like_active');
            counterLikesCard.textContent = card.likes.length;
          }).catch(error => console.log(error));
    } else {
      putLike(cardData._id)
          .then((card) => {
            buttonLikeCard.classList.add('card__btn-like_active');
            counterLikesCard.textContent = card.likes.length;
          }).catch(error => console.log(error));
    }
  }

  buttonLikeCard.addEventListener('click', toggleLikeElement);

  if (checkCardIsMy(cardData, userId)) {
    buttonDeleteCard.addEventListener('click', () => {
      callbackOpenConfirm(cardData, cardElement);
    });
  } else {
    buttonDeleteCard.remove();
  }

  return cardElement;
}
