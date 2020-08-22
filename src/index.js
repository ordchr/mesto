import css from '../pages/index.css';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { FormValidator } from './components/FormValidator.js';
import { UserInfo } from './components/UserInfo.js';
import { Api } from './components/Api.js';
import { initialCards } from './initial-cards.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupFormCardAdd = document.querySelector('.popup__form-card-add');
const popupFormProfileEdit = document.querySelector('.popup__form-edit_profile');
const popupFullNameValue = document.querySelector('.popup__input_full-name');
const popupProfessionValue = document.querySelector('.popup__input_profession');

// Форма для добавления карточки
const popupInputPlaceName = document.querySelector('.popup__input_place-name');
const popupInputImageLink = document.querySelector('.popup__input_place-image-link');

const validateOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Установка слушателей для валидации форм
const formCardAddValidator = new FormValidator(validateOptions, popupFormCardAdd);
formCardAddValidator.enableValidation();
const formProfileEditValidator = new FormValidator(validateOptions, popupFormProfileEdit);
formProfileEditValidator.enableValidation();

const popupPreview = new PopupWithImage('.popup-preview');
popupPreview.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headersAuthorization: 'e334a560-7923-4c10-ad97-03986e985b68',
});

const cardRenderer = (placeName, placeLink) => {
  const card = new Card(placeName, placeLink, '#place', (item) => {
    popupPreview.open(item);
  });
  return card.getCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: cardRenderer,
  },
  '.places'
);

section.renderAll();

const formAddCardSubmitHandler = () => {
  section.addItem(cardRenderer(popupInputPlaceName.value, popupInputImageLink.value));
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__full-name',
  userInfoSelector: '.profile__profession'
}, api);

userInfo.loadUserInfo(({name, about}) => {
  console.log(name);
  const inputFullName = document.querySelector('.profile__full-name');
  const inputProfession = document.querySelector('.profile__profession');
  inputFullName.textContent = name;
  inputProfession.textContent = about;
});

const formSubmitHandler = (inputValues) => {
  userInfo.setUserInfo(inputValues);
}

const popupProfileEdit = new PopupWithForm('.popup_profile', formSubmitHandler);
popupProfileEdit.setEventListeners();

editButton.addEventListener('click', () => {
  // userInfo.getUserInfo({
    // inputSelectorFullName: '.popup__input_full-name',
    // inputSelectorProfession: '.popup__input_profession',
  // });
  popupFullNameValue.value   = userInfo.getUserInfo().userName;
  popupProfessionValue.value = userInfo.getUserInfo().userInfo;
  popupProfileEdit.open();
});

const popupAddCard = new PopupWithForm('.popup_add-card', formAddCardSubmitHandler);
popupAddCard.setEventListeners();

addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});


