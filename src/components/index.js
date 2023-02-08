import '../pages/index.css';
import {addCard, getCards, getUserInfo, updateAvatar, updateProfile} from './api';
import {configSelectorForm, content, galleryCardList, page, renderLoading} from './utils';
import {closePopup, openPopup,} from './modal';
import {createCardElement} from './card';
import {clearErrorsOfForm, enableValidation, toggleButtonState} from './validate';

let myProfile;

function loadUserProfile() {
  getUserInfo()
      .then(userInfo => {
        myProfile = userInfo;
        setAvatar(userInfo.avatar);
        setProfileName(userInfo.name);
        setProfileDescription(userInfo.about);

        getCards()
            .then(cards => {
              cards.forEach(card => {
                checkCardIsMy(card);
                checkCardIsLiked(card);
                const cardElement = createCardElement(card);
                galleryCardList.append(cardElement);
              })
            })
      }).catch(error => console.log(error));
}

function checkCardIsMy(card) {
  card.isMy = card.owner._id === myProfile._id;
}

function checkCardIsLiked(card) {
  card.isLiked = card.likes.some((like) => {
    return like._id === myProfile._id;
  })
}

// редактирование данных профиля

const popupProfile = page.querySelector('.popup_type_edit-profile');
const buttonEditProfile = content.querySelector('.profile__btn-edit');
const formSaveProfile = popupProfile.querySelector('.form');
const profileNameInput = formSaveProfile.querySelector('.form__input_type_profile-name');
const profileDescriptionInput = formSaveProfile.querySelector('.form__input_type_profile-description');
const buttonSaveProfile = popupProfile.querySelector('.popup__btn_type_form')
const profileNameElement = content.querySelector('.profile__title');
const profileDescriptionElement = content.querySelector('.profile__subtitle');


function openProfilePopup() {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  clearErrorsOfForm(formSaveProfile, configSelectorForm);
  renderLoading(buttonSaveProfile, false);
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
  renderLoading(buttonSaveProfile, true);
  updateProfile(profileNameInput.value, profileDescriptionInput.value)
      .then(profile => {
        setProfileName(profile.name);
        setProfileDescription(profile.about);
        closePopup(popupProfile);
      }).catch(error => console.log(error));
}

// редактирование аватара профиля

const popupAvatar = page.querySelector('.popup_type_update-avatar');
const buttonEditAvatar = content.querySelector('.profile__avatar-btn-add');
const avatarImage = content.querySelector('.profile__avatar');
const formUpdateAvatar = popupAvatar.querySelector('.form');
const avatarUrlInput = popupAvatar.querySelector('.form__input_type_avatar-url');
const buttonSaveAvatar = popupAvatar.querySelector('.popup__btn_type_form');


function openEditAvatarPopup() {
  formUpdateAvatar.reset();
  clearErrorsOfForm(formUpdateAvatar, configSelectorForm);
  renderLoading(buttonSaveAvatar, false);
  toggleButtonState(buttonSaveAvatar, false, configSelectorForm);
  openPopup(popupAvatar);
}

function setAvatar(url) {
  avatarImage.src = url;
}

function saveAvatar(event) {
  event.preventDefault();
  renderLoading(buttonSaveAvatar, true);
  updateAvatar(avatarUrlInput.value)
      .then(avatar => {
        setAvatar(avatar.avatar);
        closePopup(popupAvatar);
      }).catch(error => console.log(error));
}

// добавление изображений

const popupAddPhoto = page.querySelector('.popup_type_add-photo');
const buttonAddPhoto = content.querySelector('.profile__btn-add');
const formAddPhoto = popupAddPhoto.querySelector('.form');
const photoNameInput = popupAddPhoto.querySelector('.form__input_type_photo-name');
const photoUrlInput = popupAddPhoto.querySelector('.form__input_type_photo-url');
const buttonSavePhoto = popupAddPhoto.querySelector('.popup__btn_type_form');

function openAddPhotoPopup() {
  formAddPhoto.reset();
  clearErrorsOfForm(formAddPhoto, configSelectorForm);
  renderLoading(buttonSavePhoto, false);
  toggleButtonState(buttonSavePhoto, false, configSelectorForm);
  openPopup(popupAddPhoto);
}

function addPhotoPopup(event) {
  event.preventDefault();
  renderLoading(buttonSavePhoto, true);
  addCard(photoNameInput.value, photoUrlInput.value)
      .then(card => {
        checkCardIsMy(card);
        checkCardIsLiked(card);
        const cardElement = createCardElement(card);
        galleryCardList.prepend(cardElement);
        closePopup(popupAddPhoto);
      }).catch(error => console.log(error));
}

// вызов функции получения данных пользователя от сервера
loadUserProfile();

// слушатель на открытие попапа для редактирования профиля
buttonEditProfile.addEventListener('click', openProfilePopup);

// слушатель на сохранение изменений в данных профиля
formSaveProfile.addEventListener('submit', saveProfile);

// слушатель на открытие попапа для редактирования аватара
buttonEditAvatar.addEventListener('click', openEditAvatarPopup);

// слушатель на сохранение изменений в аватаре профиля
formUpdateAvatar.addEventListener('submit', saveAvatar);

// слушатель на открытие попапа для добавление изображения
buttonAddPhoto.addEventListener('click', openAddPhotoPopup);

// слушатель на сохранение изменений при добавлении изображения
formAddPhoto.addEventListener('submit', addPhotoPopup);

// включение валидации всех форм
enableValidation(configSelectorForm);
