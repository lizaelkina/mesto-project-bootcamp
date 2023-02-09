import {buttonConfirm, cardTemplate, popupConfirm} from './utils';
import {closePopup, openPopup} from './modal';
import {deleteCard, deleteLike, putLike} from "./api";

// формирование элемента карточки в DOM

let cardDataToDelete;
let cardElementToDelete;

function deleteCardElement() {
  deleteCard(cardDataToDelete._id)
      .then(() => {
        cardElementToDelete.remove();
        closePopup(popupConfirm);
      })
      .catch(error => console.log(error));
}

buttonConfirm.addEventListener('click', deleteCardElement);

export function createCardElement(cardData, callbackOpenViewer) {
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

  if (cardData.isLiked) {
    buttonLikeCard.classList.add('card__btn-like_active');
  }

  function toggleLikeElement() {
    if (cardData.isLiked) {
      deleteLike(cardData._id)
          .then((card) => {
            cardData.isLiked = false;
            buttonLikeCard.classList.remove('card__btn-like_active');
            counterLikesCard.textContent = card.likes.length;
          }).catch(error => console.log(error));
    } else {
      putLike(cardData._id)
          .then((card) => {
            cardData.isLiked = true;
            buttonLikeCard.classList.add('card__btn-like_active');
            counterLikesCard.textContent = card.likes.length;
          }).catch(error => console.log(error));
    }
  }

  buttonLikeCard.addEventListener('click', toggleLikeElement);

  function openConfirmPopup() {
    cardDataToDelete = cardData;
    cardElementToDelete = cardElement;
    openPopup(popupConfirm);
  }

  if (cardData.isMy) {
    buttonDeleteCard.addEventListener('click', openConfirmPopup);
  } else {
    buttonDeleteCard.remove();
  }

  return cardElement;
}
