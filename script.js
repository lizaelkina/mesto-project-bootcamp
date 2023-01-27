const page = document.querySelector('.page');
const content = page.querySelector('.content');

// открытие попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// закрытие попапов

const closePopupButtons = page.querySelectorAll('.popup__btn-close');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closePopupButtons.forEach(button => {
  button.addEventListener('click', event => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
})

// редактирование профиля

const editProfilePopup = page.querySelector('.popup_type_edit-profile');
const editProfileButton = content.querySelector('.profile__btn-edit');
const saveProfileForm = editProfilePopup.querySelector('.form');
const profileNameInput = saveProfileForm.querySelector('.form__input_type_profile-name');
const profileDescriptionInput = saveProfileForm.querySelector('.form__input_type_profile-description');
const profileNameElement = content.querySelector('.profile__title');
const profileDescriptionElement = content.querySelector('.profile__subtitle');


editProfileButton.addEventListener('click', () => {
  profileNameInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileDescriptionElement.textContent;
  openPopup(editProfilePopup);
});

function saveProfile(event) {
  event.preventDefault();
  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;
  profileNameElement.textContent = name;
  profileDescriptionElement.textContent = description;
  closePopup(editProfilePopup);
}

saveProfileForm.addEventListener('submit', saveProfile);

// добавление изображений

const cardTemplate = document.querySelector('#card-item-template').content;
const galleryCardsElement = content.querySelector('.gallery__cards');

function addCard(cardData) {
  const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery__photo');
  const cardTextElement = cardElement.querySelector('.gallery__text');
  const likeButton = cardElement.querySelector('.gallery__like');
  const deleteButton = cardElement.querySelector('.gallery__delete');
  cardImage.src = cardData.link;
  cardImage.setAttribute('alt', cardData.name);
  cardTextElement.textContent = cardData.name;
  galleryCardsElement.prepend(cardElement);

  const viewPhotoPopup = page.querySelector('.popup_type_viewer-photo');
  const viewPhotoImage = viewPhotoPopup.querySelector('.viewer__photo');
  const viewPhotoTitle = viewPhotoPopup.querySelector('.viewer__caption');

  cardImage.addEventListener('click', () => {
    viewPhotoImage.src = cardData.link;
    viewPhotoImage.setAttribute('alt', cardData.name);
    viewPhotoTitle.textContent = cardData.name;
    openPopup(viewPhotoPopup);
  })

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('gallery__like_active');
  })

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  })
}

const galleryCards = [
  {
    name: 'Санкт-Петербург',
    link: './images/spb.jpeg'
  },
  {
    name: 'Москва',
    link: './images/moscow.jpeg'
  },
  {
    name: 'Казань',
    link: './images/kazan.jpeg'
  },
  {
    name: 'Выборг',
    link: './images/vyborg.jpeg'
  },
  {
    name: 'Псков',
    link: './images/pskov.jpeg'
  },
  {
    name: 'Приозерск',
    link: './images/korela.jpeg'
  }
];

galleryCards.reverse().forEach(card => {
  addCard(card);
})

// кнопка добавления изображений

const addPhotoPopup = page.querySelector('.popup_type_add-photo');
const addPhotoButton = content.querySelector('.profile__btn-add');
const photoNameInput = addPhotoPopup.querySelector('.form__input_type_photo-name');
const photoUrlInput = addPhotoPopup.querySelector('.form__input_type_photo-url');

addPhotoButton.addEventListener('click', () => {
  photoNameInput.value = '';
  photoUrlInput.value = '';
  openPopup(addPhotoPopup);
});

const addPhotoForm = addPhotoPopup.querySelector('.form');

addPhotoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = photoNameInput.value;
  const url = photoUrlInput.value;
  const cardData = {
    name: title,
    link: url
  }
  addCard(cardData);
  closePopup(addPhotoPopup);
})
