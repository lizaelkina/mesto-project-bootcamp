import {body, page} from './utils';

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// открытие попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  body.classList.add('root_popup-open');
  document.addEventListener('keydown', closePopupByEsc);
}

// закрытие попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  body.classList.remove('root_popup-open');
  document.removeEventListener('keydown', closePopupByEsc);
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
