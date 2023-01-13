const page = document.querySelector('.page');
const content = page.querySelector('.content');

// открытие попапов

const popup = page.querySelector('.popup');
const editProfilePopup = page.querySelector('.popup_edit-profile');
const addPhotoPopup = page.querySelector('.popup_add-photo');
const viewPhotoPopup = page.querySelector('.popup_viewer-photo');

const editProfileBtn = content.querySelector('.profile__btn-edit');
const addPhotoBtn = content.querySelector('.profile__btn-add');
const viewPhotoButtons = content.querySelectorAll('.gallery__photo');

const closePopupButtons = page.querySelectorAll('.popup__btn-close');

let initProfileName;
let initProfileDesc;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

editProfileBtn.addEventListener('click', function () {
  openPopup(editProfilePopup);
  initProfileName = profileNameInput.value;
  initProfileDesc = profileDescInput.value;
  checkIsActiveBtnSave();
});

addPhotoBtn.addEventListener('click', function () {
  openPopup(addPhotoPopup);
});

for (let i = 0; i < viewPhotoButtons.length; i++) {
  viewPhotoButtons[i].addEventListener('click', function () {
    openPopup(viewPhotoPopup);
  });
}

// закрытие попапов

function closePopup(event) {
  event.target.parentElement.parentElement.classList.remove('popup_opened');
}

for (let i = 0; i < closePopupButtons.length; i++) {
  closePopupButtons[i].addEventListener('click', closePopup);
}

// активность кнопки сохранить в попапе профиля

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
    popupBtnSave.setAttribute('disabled', 'true');
    popupBtnSave.classList.add('popup__btn-save_disabled');
    popupBtnSave.classList.remove('hover');
    popupBtnSave.classList.remove('hover_button_save');
  }
}

profileNameInput.addEventListener('keyup', checkIsActiveBtnSave);
profileDescInput.addEventListener('keyup', checkIsActiveBtnSave);

// кнопка добавления изображений

const profileBtnAdd = content.querySelector('.profile__btn-add');
const galleryContainer = content.querySelector('.gallery__cards');
const titleArrays = ['Балаково', 'Кандалакша', 'Иркутск'];
const imgPathArrays = ['./images/kazan.jpeg', './images/moscow.jpeg', './images/spb.jpeg'];
const imgAltArrays = ['текст1', 'текст2', 'текст3'];

function addRandomCard() {
  let title = getRandomElement(titleArrays);
  let imgPath = getRandomElement(imgPathArrays);
  let imgAlt = getRandomElement(imgAltArrays);
  addCard(title, imgPath, imgAlt);
}

function getRandomElement(array) {
  let random = Math.random();
  let randomIndex = Math.floor(array.length * random);
  return array[randomIndex];
}

function addCard(title, imgPath, imgAlt) {
  galleryContainer.insertAdjacentHTML(
      'beforeend', `<li class="gallery__card">
        <img class="gallery__photo" src="${imgPath}" alt="${imgAlt}">
        <div class="gallery__caption">
           <h2 class="gallery__text">${title}</h2>
           <button class="gallery__like hover hover_button_like" type="button"
                    aria-label="Поставить like"></button>
        </div>
      </li>`
  );
}

profileBtnAdd.addEventListener('click', addRandomCard);


// установка лайков

const likeButtons = content.querySelectorAll('.gallery__like');

function toggleLike(event) {
  event.target.classList.toggle('gallery__like_active');
}

for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', toggleLike);
}
