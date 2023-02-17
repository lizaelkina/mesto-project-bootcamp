import {addBrokenImage, addLoadingImage, cardTemplate, removeLoadingImage} from './utils';

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
export function createCardElement(cardData, userId, callbackOpenViewer, callbackOpenConfirm, callbackSetLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardData.element = cardElement;
  const cardImage = cardElement.querySelector('.card__photo');
  const cardTextElement = cardElement.querySelector('.card__text');
  const buttonLikeCard = cardElement.querySelector('.card__btn-like');
  const counterLikesCard = cardElement.querySelector('.card__like-counter');
  const buttonDeleteCard = cardElement.querySelector('.card__btn-delete');
  const loaderPhoto = cardElement.querySelector('.loader_type_card');
  cardImage.onload = () => removeLoadingImage(loaderPhoto);
  cardImage.onerror = () => addBrokenImage(cardImage);
  addLoadingImage(cardImage);
  cardImage.src = cardData.link;
  cardImage.setAttribute('alt', cardData.name);
  cardTextElement.textContent = cardData.name;
  counterLikesCard.textContent = cardData.likes.length;

  if (checkCardIsLiked(cardData, userId)) {
    buttonLikeCard.classList.add('card__btn-like_active');
  }

  if (checkCardIsMy(cardData, userId)) {
    buttonDeleteCard.addEventListener('click', () => {
      callbackOpenConfirm(cardData, cardElement);
    });
  } else {
    buttonDeleteCard.remove();
  }

  cardImage.addEventListener('click', () => {
    callbackOpenViewer(cardData);
  });

  buttonLikeCard.addEventListener('click', () => {
    callbackSetLike(
        cardData,
        cardElement,
        buttonLikeCard.classList.contains('card__btn-like_active')
    );
  });

  return cardElement;
}

export function toggleLike(cardElement, likes) {
  const buttonLikeCard = cardElement.querySelector('.card__btn-like');
  const counterLikesCard = cardElement.querySelector('.card__like-counter');
  buttonLikeCard.classList.toggle('card__btn-like_active');
  counterLikesCard.textContent = likes.length;
}
