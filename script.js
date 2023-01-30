const page = document.querySelector('.page');
const content = page.querySelector('.content');

const configSelectorForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-save',
  inactiveButtonClass: 'form__btn-save_disabled',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__error_active'
}

// открытие попапов

let closePopupOnEscapeListener;

function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupOnEscapeListener = event => {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  }
  document.addEventListener('keyup', closePopupOnEscapeListener);
}

// закрытие попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEscapeListener);
}

const popupList = page.querySelectorAll('.popup');

popupList.forEach(popup => {
  const buttonClosePopup = popup.querySelector('.popup__btn-close');
  buttonClosePopup.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
})


// редактирование профиля

const popupProfile = page.querySelector('.popup_type_edit-profile');
const buttonEditProfile = content.querySelector('.profile__btn-edit');
const formSaveProfile = popupProfile.querySelector('.form');
const profileNameInput = formSaveProfile.querySelector('.form__input_type_profile-name');
const profileDescriptionInput = formSaveProfile.querySelector('.form__input_type_profile-description');
const profileNameErrorElement = formSaveProfile.querySelector('.profile-name-error');
const profileDescriptionErrorElement = formSaveProfile.querySelector('.profile-description-error');
const buttonSaveProfile = popupProfile.querySelector('.form__btn-save')
const profileNameElement = content.querySelector('.profile__title');
const profileDescriptionElement = content.querySelector('.profile__subtitle');


function openProfilePopup() {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  hideInputError(profileNameInput, profileNameErrorElement, configSelectorForm);
  hideInputError(profileDescriptionInput, profileDescriptionErrorElement, configSelectorForm);
  toggleButtonState(buttonSaveProfile, false, configSelectorForm);
  openPopup(popupProfile);
}

buttonEditProfile.addEventListener('click', openProfilePopup);

function saveProfile(event) {
  event.preventDefault();
  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;
  profileNameElement.textContent = name;
  profileDescriptionElement.textContent = description;
  closePopup(popupProfile);
}

formSaveProfile.addEventListener('submit', saveProfile);

// добавление изображений

const cardTemplate = document.querySelector('#card-item-template').content;
const galleryCardsElement = content.querySelector('.gallery__cards');
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

const galleryCards = [
  {
    name: 'Санкт-Петербург',
    link: './images/spb.jpeg'
  },
  {
    name: 'Москва',
    link: './images/moscow.jpeg'
  },
  {
    name: 'Казань',
    link: './images/kazan.jpeg'
  },
  {
    name: 'Выборг',
    link: './images/vyborg.jpeg'
  },
  {
    name: 'Псков',
    link: './images/pskov.jpeg'
  },
  {
    name: 'Приозерск',
    link: './images/korela.jpeg'
  }
];

function fillGallery() {
  galleryCards.forEach(card => {
    const cardElement = createCardElement(card);
    galleryCardsElement.append(cardElement);
  })
}

fillGallery();

// кнопка добавления изображений

const popupAddPhoto = page.querySelector('.popup_type_add-photo');
const buttonAddPhoto = content.querySelector('.profile__btn-add');
const formAddPhoto = popupAddPhoto.querySelector('.form');
const photoNameInput = popupAddPhoto.querySelector('.form__input_type_photo-name');
const photoUrlInput = popupAddPhoto.querySelector('.form__input_type_photo-url');
const photoNameErrorElement = popupAddPhoto.querySelector('.photo-name-error');
const photoUrlErrorElement = popupAddPhoto.querySelector('.photo-url-error');
const buttonSavePhoto = popupAddPhoto.querySelector('.form__btn-save')

function openAddPhotoPopup() {
  formAddPhoto.reset();
  hideInputError(photoNameInput, photoNameErrorElement, configSelectorForm);
  hideInputError(photoUrlInput, photoUrlErrorElement, configSelectorForm);
  toggleButtonState(buttonSavePhoto, false, configSelectorForm);
  openPopup(popupAddPhoto);
}

buttonAddPhoto.addEventListener('click', openAddPhotoPopup);

function addPhotoPopup(event) {
  event.preventDefault();
  const title = photoNameInput.value;
  const url = photoUrlInput.value;
  const cardData = {
    name: title,
    link: url
  }
  const cardElement = createCardElement(cardData);
  galleryCardsElement.prepend(cardElement);
  closePopup(popupAddPhoto);
}

formAddPhoto.addEventListener('submit', addPhotoPopup);

// валидация форм

function showInputError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.textErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.textErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function toggleButtonState(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.classList.add('hover');
    buttonElement.classList.add('hover_button_save');
  } else {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.classList.remove('hover');
    buttonElement.classList.remove('hover_button_save');
  }
}

function checkInputValidity(inputElement, formElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const isInputValid = inputElement.validity.valid;
  if (isInputValid) {
    hideInputError(inputElement, errorElement, config);
  } else {
    showInputError(inputElement, errorElement, config);
  }
}

function setFormEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  formElement.addEventListener('submit', (event) => event.preventDefault());

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputItem, formElement, config);
    })
  })
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formItem => setFormEventListeners(formItem, config));
}

enableValidation(configSelectorForm);