import {page} from './utils';

// открытие попапов

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// закрытие попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
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
