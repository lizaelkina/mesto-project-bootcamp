import {page} from './utils';

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function confirmPopup() {
  const popup = page.querySelector('.popup_opened');
  closePopup(popup, true);
}

// открытие попапов

function openPopup(popup, callback) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.callback = callback;
  const buttonConfirm = popup.querySelector('.popup__btn_type_confirm');
  if (buttonConfirm !== null) {
    buttonConfirm.addEventListener('click', confirmPopup);
  }
}

// закрытие попапов

function closePopup(popup, confirmed = false) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  const buttonConfirm = popup.querySelector('.popup__btn_type_confirm');
  if (buttonConfirm !== null) {
    buttonConfirm.removeEventListener('click', confirmPopup);
  }
  if (popup.callback !== undefined) {
    popup.callback(confirmed);
  }
}

const popupList = page.querySelectorAll('.popup');

popupList.forEach(popup => {
  const buttonClosePopup = popup.querySelector('.popup__btn-close');
  buttonClosePopup.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
})

export {openPopup, closePopup};
