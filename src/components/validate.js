function showInputError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.textErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.textErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function toggleButtonState(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
  }
}

function clearErrorsOfForm(formElement, config) {
  const inputList = formElement.querySelectorAll('.form__input');
  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    hideInputError(inputElement, errorElement, config);
  })
}

function checkInputValidity(inputElement, formElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const isInputValid = inputElement.validity.valid;
  if (isInputValid) {
    hideInputError(inputElement, errorElement, config);
  } else {
    showInputError(inputElement, errorElement, config);
  }
}

function setFormEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputItem, formElement, config);
    })
  })
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formItem => setFormEventListeners(formItem, config));
}

export {toggleButtonState, clearErrorsOfForm, enableValidation};
