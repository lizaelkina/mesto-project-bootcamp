import './pages/index.css';
import {configSelectorForm} from './components/utils';
import {
  addPhotoPopup,
  buttonAddPhoto,
  buttonEditProfile,
  formAddPhoto,
  formSaveProfile,
  openAddPhotoPopup,
  openProfilePopup,
  saveProfile
} from './components/modal';
import {fillGallery} from './components/card';
import {enableValidation} from './components/validate';

// вставка изображений
fillGallery();

// слушатель на открытие попапа для добавление изображения
buttonAddPhoto.addEventListener('click', openAddPhotoPopup);

// слушатель на добавление изображения
formAddPhoto.addEventListener('submit', addPhotoPopup);

// слушатель на открытие попапа для редактирования профиля
buttonEditProfile.addEventListener('click', openProfilePopup);

// слушатель на редактирование профиля
formSaveProfile.addEventListener('submit', saveProfile);

// включение валидации всех форм
enableValidation(configSelectorForm);
