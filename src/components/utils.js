const page = document.querySelector('.page');
const content = page.querySelector('.content');
const galleryCardList = content.querySelector('.gallery__cards');

const configSelectorForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_error',
  textErrorClass: 'form__error_active',
  submitButtonSelector: '.popup__btn_type_form',
  inactiveButtonClass: 'popup__btn_disabled'
}

// функция отслеживания состояния загрузки
function renderLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = 'disabled';
    button.textContent = 'Сохранение...';
  } else {
    button.disabled = false;
    button.textContent = 'Сохранить';
  }
}

export {page, content, configSelectorForm, galleryCardList, renderLoading};
