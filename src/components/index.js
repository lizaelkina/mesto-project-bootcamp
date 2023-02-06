import '../pages/index.css';
import {getUserInfo} from './api';
import {configSelectorForm, content, galleryCardList, page} from './utils';
import {closePopup, openPopup,} from './modal';
import {createCardElement, loadCards} from './card';
import {clearErrorsOfForm, enableValidation, toggleButtonState} from './validate';

// попап редактирования профиля

const popupProfile = page.querySelector('.popup_type_edit-profile');
const buttonEditProfile = content.querySelector('.profile__btn-edit');
const formSaveProfile = popupProfile.querySelector('.form');
const profileNameInput = formSaveProfile.querySelector('.form__input_type_profile-name');
const profileDescriptionInput = formSaveProfile.querySelector('.form__input_type_profile-description');
const buttonSaveProfile = popupProfile.querySelector('.form__btn-save')
const profileNameElement = content.querySelector('.profile__title');
const profileDescriptionElement = content.querySelector('.profile__subtitle');


function openProfilePopup() {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  clearErrorsOfForm(formSaveProfile, configSelectorForm);
  toggleButtonState(buttonSaveProfile, false, configSelectorForm);
  openPopup(popupProfile);
}

function setProfileName(name) {
  profileNameElement.textContent = name;
}

function setProfileDescription(description) {
  profileDescriptionElement.textContent = description;
}

function saveProfile(event) {
  event.preventDefault();
  setProfileName(profileNameInput.value);
  setProfileDescription(profileDescriptionInput.value);
  closePopup(popupProfile);
}

// попап редактирования аватара

const popupAvatar = page.querySelector('.popup_type_update-avatar');
const buttonEditAvatar = content.querySelector('.profile__avatar-btn-add');
const avatarImage = content.querySelector('.profile__avatar');
const formUpdateAvatar = popupAvatar.querySelector('.form');
const avatarUrlInput = popupAvatar.querySelector('.form__input_type_avatar-url');
const buttonSaveAvatar = popupAvatar.querySelector('.form__btn-save');


function openEditAvatarPopup() {
  formUpdateAvatar.reset();
  clearErrorsOfForm(formUpdateAvatar, configSelectorForm);
  toggleButtonState(buttonSaveAvatar, false, configSelectorForm);
  openPopup(popupAvatar);
}

function setAvatar(url) {
  avatarImage.src = url;
}

function saveAvatar(event) {
  event.preventDefault();
  setAvatar(avatarUrlInput.value);
  closePopup(popupAvatar);
}

// попап добавления изображений

const popupAddPhoto = page.querySelector('.popup_type_add-photo');
const buttonAddPhoto = content.querySelector('.profile__btn-add');
const formAddPhoto = popupAddPhoto.querySelector('.form');
const photoNameInput = popupAddPhoto.querySelector('.form__input_type_photo-name');
const photoUrlInput = popupAddPhoto.querySelector('.form__input_type_photo-url');
const buttonSavePhoto = popupAddPhoto.querySelector('.form__btn-save');

function openAddPhotoPopup() {
  formAddPhoto.reset();
  clearErrorsOfForm(formAddPhoto, configSelectorForm);
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

function loadUserProfile() {
  getUserInfo()
      .then(userInfo => {
        setAvatar(userInfo.avatar);
        setProfileName(userInfo.name);
        setProfileDescription(userInfo.about);
      });
}

// загрузка данных пользователя
loadUserProfile();

// загрузка карточек в галерею
loadCards();

// слушатель на открытие попапа для редактирования профиля
buttonEditProfile.addEventListener('click', openProfilePopup);

// слушатель на редактирование профиля
formSaveProfile.addEventListener('submit', saveProfile);

// слушатель на открытие попапа для редактирования аватара
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

// слушатель на добавление аватара
formUpdateAvatar.addEventListener('submit', saveAvatar);

// слушатель на открытие попапа для добавление изображения
buttonAddPhoto.addEventListener('click', openAddPhotoPopup);

// слушатель на добавление изображения
formAddPhoto.addEventListener('submit', addPhotoPopup);

// включение валидации всех форм
enableValidation(configSelectorForm);
