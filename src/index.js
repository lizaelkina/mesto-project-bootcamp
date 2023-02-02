import './pages/index.css';
import {configSelectorForm, content, galleryCardList, page} from './components/utils';
import {closePopup, openPopup,} from './components/modal';
import {createCardElement, fillGallery} from './components/card';
import {clearErrorsOfForm, enableValidation, toggleButtonState} from './components/validate';

// вставка изображений
fillGallery();

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

function saveProfile(event) {
  event.preventDefault();
  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;
  profileNameElement.textContent = name;
  profileDescriptionElement.textContent = description;
  closePopup(popupProfile);
}

// попап редактирования аватара

const popupAvatar = page.querySelector('.popup_type_update-avatar');
const buttonEditAvatar = content.querySelector('.profile__avatar-btn-edit');
const formUpdateAvatar = popupAvatar.querySelector('.form');
// const avatarUrlInput = popupAvatar.querySelector('.form__input_type_avatar-url');
const buttonSaveAvatar = popupAvatar.querySelector('.form__btn-save');

function openEditAvatarPopup() {
  formUpdateAvatar.reset();
  clearErrorsOfForm(formUpdateAvatar, configSelectorForm);
  toggleButtonState(buttonSaveAvatar, false, configSelectorForm);
  openPopup(popupAvatar);
}

// function editAvatarPopup(event) {
//   event.preventDefault();
//   const url = avatarUrlInput.value;
// }

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

// слушатель на открытие попапа для редактирования профиля
buttonEditProfile.addEventListener('click', openProfilePopup);

// слушатель на редактирование профиля
formSaveProfile.addEventListener('submit', saveProfile);

// слушатель на открытие попапа для редактирования аватара
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

// слушатель на открытие попапа для добавление изображения
buttonAddPhoto.addEventListener('click', openAddPhotoPopup);

// слушатель на добавление изображения
formAddPhoto.addEventListener('submit', addPhotoPopup);

// включение валидации всех форм
enableValidation(configSelectorForm);
