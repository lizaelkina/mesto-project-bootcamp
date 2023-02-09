import '../pages/index.css';
import {addCard, deleteCard, getCards, getUserInfo, updateAvatar, updateProfile} from './api';
import {
  avatarImage,
  avatarUrlInput,
  buttonAddPhoto, buttonConfirm,
  buttonEditAvatar,
  buttonEditProfile,
  buttonSaveAvatar,
  buttonSavePhoto,
  buttonSaveProfile,
  configSelectorForm,
  formAddPhoto,
  formSaveProfile,
  formUpdateAvatar,
  galleryCardList,
  photoNameInput,
  photoUrlInput,
  popupAddPhoto,
  popupAvatar, popupConfirm,
  popupProfile,
  popupViewImage,
  popupViewPhoto,
  popupViewTitle,
  profileDescriptionElement,
  profileDescriptionInput,
  profileNameElement,
  profileNameInput,
  renderLoading, renderSaveLoading
} from './utils';
import {closePopup, openPopup,} from './modal';
import {createCardElement} from './card';
import {clearErrorsOfForm, enableValidation, toggleButtonState} from './validate';

// просмотр полного изображения карточки
function openViewPhotoPopup(cardData) {
  popupViewImage.src = cardData.link;
  popupViewImage.setAttribute('alt', cardData.name);
  popupViewTitle.textContent = cardData.name;
  openPopup(popupViewPhoto);
}

// удаление карточки
let cardDataToDelete;
let cardElementToDelete;

function openConfirmPopup(cardData, cardElement) {
  cardDataToDelete = cardData;
  cardElementToDelete = cardElement;
  openPopup(popupConfirm);
}

function deleteCardElement() {
  renderLoading(buttonConfirm, true, 'Удаление...');
  deleteCard(cardDataToDelete._id)
      .then(() => {
        cardElementToDelete.remove();
        closePopup(popupConfirm);
      })
      .catch(error => console.log(error))
      .finally(() => renderLoading(buttonConfirm, false, 'Да'));
}

buttonConfirm.addEventListener('click', deleteCardElement);

// загрузка данных полбзователя
let userId;

function loadUserProfile() {
  getUserInfo()
      .then(userInfo => {
        userId = userInfo._id;
        setAvatar(userInfo.avatar);
        setProfileName(userInfo.name);
        setProfileDescription(userInfo.about);

        getCards()
            .then(cards => {
              cards.forEach(card => {
                const cardElement = createCardElement(card, userId, openViewPhotoPopup, openConfirmPopup);
                galleryCardList.append(cardElement);
              })
            }).catch(error => console.log(error));
      }).catch(error => console.log(error));
}

// редактирование данных профиля
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
  renderSaveLoading(buttonSaveProfile, true);
  updateProfile(profileNameInput.value, profileDescriptionInput.value)
      .then(profile => {
        setProfileName(profile.name);
        setProfileDescription(profile.about);
        closePopup(popupProfile);
      })
      .catch(error => console.log(error))
      .finally(() => renderSaveLoading(buttonSaveProfile, false));
}

// редактирование аватара профиля
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
  renderSaveLoading(buttonSaveAvatar, true);
  updateAvatar(avatarUrlInput.value)
      .then(avatar => {
        setAvatar(avatar.avatar);
        closePopup(popupAvatar);
      })
      .catch(error => console.log(error))
      .finally(() => renderSaveLoading(buttonSaveAvatar, false));
}

// добавление изображений
function openAddPhotoPopup() {
  formAddPhoto.reset();
  clearErrorsOfForm(formAddPhoto, configSelectorForm);
  toggleButtonState(buttonSavePhoto, false, configSelectorForm);
  openPopup(popupAddPhoto);
}

function addPhotoPopup(event) {
  event.preventDefault();
  renderSaveLoading(buttonSavePhoto, true);
  addCard(photoNameInput.value, photoUrlInput.value)
      .then(card => {
        const cardElement = createCardElement(card, userId, openViewPhotoPopup, openConfirmPopup);
        galleryCardList.prepend(cardElement);
        closePopup(popupAddPhoto);
      })
      .catch(error => console.log(error))
      .finally(() => renderSaveLoading(buttonSavePhoto, false));
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
