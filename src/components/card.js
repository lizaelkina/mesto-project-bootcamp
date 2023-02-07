import {galleryCardList, page} from './utils';
import {openPopup} from './modal';
import {getCards} from "./api";

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
  const buttonDeleteCard = cardElement.querySelector('.card__btn-delete');
  cardImage.src = cardData.link;
  cardImage.setAttribute('alt', cardData.name);
  cardTextElement.textContent = cardData.name;

  function openViewPhotoPopup() {
    popupViewImage.src = cardData.link;
    popupViewImage.setAttribute('alt', cardData.name);
    popupViewTitle.textContent = cardData.name;
    openPopup(popupViewPhoto);
  }

  cardImage.addEventListener('click', openViewPhotoPopup);

  function toggleLike() {
    buttonLikeCard.classList.toggle('card__btn-like_active');
  }

  buttonLikeCard.addEventListener('click', toggleLike);

  function deleteCard() {
    cardElement.remove();
  }

  function openConfirmPopup() {
    openPopup(popupConfirm, confirmed => {
      if (confirmed) {
        deleteCard();
      }
    });
  }

  buttonDeleteCard.addEventListener('click', openConfirmPopup);

  return cardElement;
}

function loadCards() {
  getCards()
      .then(cards => {
        cards.forEach(card => {
          const cardElement = createCardElement(card);
          galleryCardList.append(cardElement);
        })
      })
}

export {createCardElement, loadCards};
