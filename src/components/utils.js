const page = document.querySelector('.page');
const content = page.querySelector('.content');

const configSelectorForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__error_active',
  submitButtonSelector: '.form__btn-save',
  inactiveButtonClass: 'form__btn-save_disabled'
}

const galleryCardList = content.querySelector('.gallery__cards');

export {page, content, configSelectorForm, galleryCardList};
