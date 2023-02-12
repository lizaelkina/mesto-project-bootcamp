export const body = document.querySelector('.root');
export const page = document.querySelector('.page');
export const content = document.querySelector('.content');

// профиль пользователя
export const popupProfile = page.querySelector('.popup_type_edit-profile');
export const buttonEditProfile = content.querySelector('.profile__btn-edit');
export const formSaveProfile = popupProfile.querySelector('.form');
export const profileNameInput = formSaveProfile.querySelector('.form__input_type_profile-name');
export const profileDescriptionInput = formSaveProfile.querySelector('.form__input_type_profile-description');
export const buttonSaveProfile = popupProfile.querySelector('.popup__btn_type_form');
export const messageErrorProfile = popupProfile.querySelector('.popup__error');
export const profileNameElement = content.querySelector('.profile__title');
export const profileDescriptionElement = content.querySelector('.profile__subtitle');

// аватар пользователя
export const popupAvatar = page.querySelector('.popup_type_update-avatar');
export const buttonEditAvatar = content.querySelector('.profile__avatar-btn-add');
export const avatarImage = content.querySelector('.profile__avatar');
export const formUpdateAvatar = popupAvatar.querySelector('.form');
export const avatarUrlInput = popupAvatar.querySelector('.form__input_type_avatar-url');
export const buttonSaveAvatar = popupAvatar.querySelector('.popup__btn_type_form');
export const messageErrorAvatar = popupAvatar.querySelector('.popup__error');

// загрузка карточки
export const popupAddPhoto = page.querySelector('.popup_type_add-photo');
export const buttonAddPhoto = content.querySelector('.profile__btn-add');
export const formAddPhoto = popupAddPhoto.querySelector('.form');
export const photoNameInput = popupAddPhoto.querySelector('.form__input_type_photo-name');
export const photoUrlInput = popupAddPhoto.querySelector('.form__input_type_photo-url');
export const buttonSavePhoto = popupAddPhoto.querySelector('.popup__btn_type_form');
export const messageErrorPhoto = popupAddPhoto.querySelector('.popup__error');
export const galleryCardList = content.querySelector('.gallery__cards');
export const cardTemplate = document.querySelector('#card-item-template').content;

// просмотр полного изображения карточки
export const popupViewPhoto = page.querySelector('.popup_type_viewer-photo');
export const popupViewImage = popupViewPhoto.querySelector('.viewer__photo');
export const popupViewTitle = popupViewPhoto.querySelector('.viewer__caption');

// открытие попапа подтверждения
export const popupConfirm = page.querySelector('.popup_type_confirm');
export const buttonConfirm = popupConfirm.querySelector('.popup__btn_type_confirm');
export const messageErrorConfirm = popupConfirm.querySelector('.popup__error');

// форма
export const configSelectorForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__error_active',
  submitButtonSelector: '.popup__btn_type_form',
  inactiveButtonClass: 'popup__btn_disabled'
}

// функция отслеживания состояния загрузки
export function renderLoading(button, isLoading, text) {
  button.textContent = text;
  if (isLoading) {
    button.disabled = 'disabled';
  } else {
    button.disabled = false;
  }
}

export function renderSaveLoading(button, isLoading) {
  if (isLoading) {
    renderLoading(button, isLoading, 'Сохранение...');
  } else {
    renderLoading(button, isLoading, 'Сохранить');
  }
}

// функции показа ошибок сервера
export function showServerError(message, error) {
  message.classList.add('popup__error_active');
  message.textContent = error;
}

export function hideServerError(message) {
  message.classList.remove('popup__error_active');
  message.textContent = '';
}

export function showDataLoadingError (error) {
  content.classList.add('content_inactive');
  const contentLoadingError= document.createElement('section');
  contentLoadingError.classList.add('content__error');
  contentLoadingError.textContent = error;
  content.prepend(contentLoadingError);
}
