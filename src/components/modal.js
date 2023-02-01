import {page} from './utils';

// открытие попапов

let closePopupOnEscapeListener;

function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupOnEscapeListener = event => {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  }
  document.addEventListener('keyup', closePopupOnEscapeListener);
}

// закрытие попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupOnEscapeListener);
}

const popupList = page.querySelectorAll('.popup');

popupList.forEach(popup => {
  const buttonClosePopup = popup.querySelector('.popup__btn-close');
  buttonClosePopup.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
})

export {openPopup, closePopup};
