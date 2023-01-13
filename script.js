const page = document.querySelector('.page');
const content = page.querySelector('.content');

// открытие и закрытие попапа

const popup = page.querySelector('.popup');
const popupBtnClose = popup.querySelector('.popup__btn-close');
const profileBtnEdit = content.querySelector('.profile__btn-edit');
let initProfileName;
let initProfileDesc;

function openPopup() {
    popup.classList.add('popup_opened');
    initProfileName = profileNameInput.value;
    initProfileDesc = profileDescInput.value;
    checkIsActiveBtnSave();
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

profileBtnEdit.addEventListener('click', openPopup);
popupBtnClose.addEventListener('click', closePopup);

// активность кнопки сохранить в попапе

const popupBtnSave = popup.querySelector('.popup__btn-save');
const profileNameInput = popup.querySelector('#profile-name');
const profileDescInput = popup.querySelector('#profile-description');

function checkIsActiveBtnSave() {
    const profileName = profileNameInput.value;
    const profileDesc = profileDescInput.value;
    const isActive = profileName.length > 0 && profileDesc.length > 0 && (profileName !== initProfileName || profileDesc !== initProfileDesc);

    if (isActive) {
        popupBtnSave.removeAttribute('disabled');
        popupBtnSave.classList.remove('popup__btn-save_disabled');
        popupBtnSave.classList.add('hover');
        popupBtnSave.classList.add('hover_button_save');
    } else {
        popupBtnSave.setAttribute('disabled', true);
        popupBtnSave.classList.add('popup__btn-save_disabled');
        popupBtnSave.classList.remove('hover');
        popupBtnSave.classList.remove('hover_button_save');
    }
}

profileNameInput.addEventListener('keyup', checkIsActiveBtnSave);
profileDescInput.addEventListener('keyup', checkIsActiveBtnSave);

// установка лайков

const likeButtons = content.querySelectorAll('.gallery__like');

function toggleLike(event) {
    event.target.classList.toggle('gallery__like_active');
}

for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', toggleLike);
}

