export const page = document.querySelector('.page');
export const content = page.querySelector('.content');

// профиль пользователя
export const popupProfile = page.querySelector('.popup_type_edit-profile');
export const buttonEditProfile = content.querySelector('.profile__btn-edit');
export const formSaveProfile = popupProfile.querySelector('.form');
export const profileNameInput = formSaveProfile.querySelector('.form__input_type_profile-name');
export const profileDescriptionInput = formSaveProfile.querySelector('.form__input_type_profile-description');
export const buttonSaveProfile = popupProfile.querySelector('.popup__btn_type_form');
export const profileNameElement = content.querySelector('.profile__title');
export const profileDescriptionElement = content.querySelector('.profile__subtitle');

// аватар пользователя
export const popupAvatar = page.querySelector('.popup_type_update-avatar');
export const buttonEditAvatar = content.querySelector('.profile__avatar-btn-add');
export const avatarImage = content.querySelector('.profile__avatar');
export const formUpdateAvatar = popupAvatar.querySelector('.form');
export const avatarUrlInput = popupAvatar.querySelector('.form__input_type_avatar-url');
export const buttonSaveAvatar = popupAvatar.querySelector('.popup__btn_type_form');

// загрузка карточки
export const popupAddPhoto = page.querySelector('.popup_type_add-photo');
export const buttonAddPhoto = content.querySelector('.profile__btn-add');
export const formAddPhoto = popupAddPhoto.querySelector('.form');
export const photoNameInput = popupAddPhoto.querySelector('.form__input_type_photo-name');
export const photoUrlInput = popupAddPhoto.querySelector('.form__input_type_photo-url');
export const buttonSavePhoto = popupAddPhoto.querySelector('.popup__btn_type_form');
export const galleryCardList = content.querySelector('.gallery__cards');

// формирование элемента карточки
export const cardTemplate = document.querySelector('#card-item-template').content;
export const popupViewPhoto = page.querySelector('.popup_type_viewer-photo');
export const popupViewImage = popupViewPhoto.querySelector('.viewer__photo');
export const popupViewTitle = popupViewPhoto.querySelector('.viewer__caption');
export const popupConfirm = page.querySelector('.popup_type_confirm');

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
export function renderLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = 'disabled';
    button.textContent = 'Сохранение...';
  } else {
    button.disabled = false;
    button.textContent = 'Сохранить';
  }
}
