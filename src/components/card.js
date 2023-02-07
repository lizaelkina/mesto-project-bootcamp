import {page} from './utils';
import {openPopup} from './modal';

// формирование элемента карточки в DOM

const cardTemplate = document.querySelector('#card-item-template').content;
const popupViewPhoto = page.querySelector('.popup_type_viewer-photo');
const popupViewImage = popupViewPhoto.querySelector('.viewer__photo');
const popupViewTitle = popupViewPhoto.querySelector('.viewer__caption');
const popupConfirm = page.querySelector('.popup_type_confirm');

function createCardElement(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__photo');
  const cardTextElement = cardElement.querySelector('.card__text');
  const buttonLikeCard = cardElement.querySelector('.card__btn-like');
  const counterLikesCard = cardElement.querySelector('.card__like-counter');
  const buttonDeleteCard = cardElement.querySelector('.card__btn-delete');
  cardImage.src = cardData.link;
  cardImage.setAttribute('alt', cardData.name);
  cardTextElement.textContent = cardData.name;
  counterLikesCard.textContent = cardData.likes.length;

  function openViewPhotoPopup() {
    popupViewImage.src = cardData.link;
    popupViewImage.setAttribute('alt', cardData.name);
    popupViewTitle.textContent = cardData.name;
    openPopup(popupViewPhoto);
  }

  cardImage.addEventListener('click', openViewPhotoPopup);

  function toggleLikeElement() {
    buttonLikeCard.classList.toggle('card__btn-like_active');
  }

  buttonLikeCard.addEventListener('click', toggleLikeElement);

  function deleteCardElement() {
    cardElement.remove();
  }

  function openConfirmPopup() {
    openPopup(popupConfirm, confirmed => {
      if (confirmed) {
        deleteCardElement();
      }
    });
  }

  if (cardData.isMy) {
    buttonDeleteCard.addEventListener('click', openConfirmPopup);
  } else {
    buttonDeleteCard.remove();
  }

  return cardElement;
}

export {createCardElement};
