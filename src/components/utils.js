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

const galleryCardList = content.querySelector('.gallery__cards');

export {page, content, configSelectorForm, galleryCardList};
