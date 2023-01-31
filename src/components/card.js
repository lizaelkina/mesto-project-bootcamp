import {dataCards} from './data';
import {galleryCardList, page} from './utils';
import {openPopup} from './modal';

// вставка изображений

const cardTemplate = document.querySelector('#card-item-template').content;
const popupViewPhoto = page.querySelector('.popup_type_viewer-photo');
const popupViewImage = popupViewPhoto.querySelector('.viewer__photo');
const popupViewTitle = popupViewPhoto.querySelector('.viewer__caption');

function createCardElement(cardData) {
  const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery__photo');
  const cardTextElement = cardElement.querySelector('.gallery__text');
  const buttonLikeCard = cardElement.querySelector('.gallery__like');
  const buttonDeleteCard = cardElement.querySelector('.gallery__delete');
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
    buttonLikeCard.classList.toggle('gallery__like_active');
  }

  buttonLikeCard.addEventListener('click', toggleLike);

  function deleteCard() {
    cardElement.remove();
  }

  buttonDeleteCard.addEventListener('click', deleteCard);

  return cardElement;
}

function fillGallery() {
  dataCards.forEach(card => {
    const cardElement = createCardElement(card);
    galleryCardList.append(cardElement);
  })
}

export {createCardElement, fillGallery};
