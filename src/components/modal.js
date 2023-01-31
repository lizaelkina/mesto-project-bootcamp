import {configSelectorForm, content, galleryCardList, page} from './utils';
import {createCardElement} from './card';
import {hideInputError, toggleButtonState} from './validate';

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

// попап редактирования профиля

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

function saveProfile(event) {
  event.preventDefault();
  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;
  profileNameElement.textContent = name;
  profileDescriptionElement.textContent = description;
  closePopup(popupProfile);
}

// попап добавления изображений

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

function addPhotoPopup(event) {
  event.preventDefault();
  const title = photoNameInput.value;
  const url = photoUrlInput.value;
  const cardData = {
    name: title,
    link: url
  }
  const cardElement = createCardElement(cardData);
  galleryCardList.prepend(cardElement);
  closePopup(popupAddPhoto);
}

export {
  openPopup,
  closePopup,
  buttonEditProfile,
  formSaveProfile,
  openProfilePopup,
  saveProfile,
  buttonAddPhoto,
  formAddPhoto,
  openAddPhotoPopup,
  addPhotoPopup
};
