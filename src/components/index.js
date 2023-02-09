import '../pages/index.css';
import {addCard, getCards, getUserInfo, updateAvatar, updateProfile} from './api';
import {
  avatarImage,
  avatarUrlInput,
  buttonAddPhoto,
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
  popupAvatar,
  popupProfile,
  popupViewImage,
  popupViewPhoto,
  popupViewTitle,
  profileDescriptionElement,
  profileDescriptionInput,
  profileNameElement,
  profileNameInput,
  renderLoading
} from './utils';
import {closePopup, openPopup,} from './modal';
import {createCardElement} from './card';
import {clearErrorsOfForm, enableValidation, toggleButtonState} from './validate';

let userId;

// просмотр полного изображения карточки
function openViewPhotoPopup(cardData) {
  popupViewImage.src = cardData.link;
  popupViewImage.setAttribute('alt', cardData.name);
  popupViewTitle.textContent = cardData.name;
  openPopup(popupViewPhoto);
}


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
                checkCardIsMy(card);
                checkCardIsLiked(card);
                const cardElement = createCardElement(card, openViewPhotoPopup);
                galleryCardList.append(cardElement);
              })
            }).catch(error => console.log(error));
      }).catch(error => console.log(error));
}

function checkCardIsMy(card) {
  card.isMy = card.owner._id === userId;
}

function checkCardIsLiked(card) {
  card.isLiked = card.likes.some((like) => {
    return like._id === userId;
  })
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
  renderLoading(buttonSaveProfile, true);
  updateProfile(profileNameInput.value, profileDescriptionInput.value)
      .then(profile => {
        setProfileName(profile.name);
        setProfileDescription(profile.about);
        closePopup(popupProfile);
      })
      .catch(error => console.log(error))
      .finally(() => renderLoading(buttonSaveProfile, false));

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
  renderLoading(buttonSaveAvatar, true);
  updateAvatar(avatarUrlInput.value)
      .then(avatar => {
        setAvatar(avatar.avatar);
        closePopup(popupAvatar);
      })
      .catch(error => console.log(error))
      .finally(() => renderLoading(buttonSaveAvatar, false));
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
  renderLoading(buttonSavePhoto, true);
  addCard(photoNameInput.value, photoUrlInput.value)
      .then(card => {
        checkCardIsMy(card);
        checkCardIsLiked(card);
        const cardElement = createCardElement(card, openViewPhotoPopup);
        galleryCardList.prepend(cardElement);
        closePopup(popupAddPhoto);
      })
      .catch(error => console.log(error))
      .finally(() => renderLoading(buttonSavePhoto, false));
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
