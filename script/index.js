import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { FormValidator } from './components/FormValidator.js';
import { UserInfo } from './components/UserInfo.js';
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

const cardRenderer = (placeName, placeLink) => {
  const card = new Card(placeName, placeLink, '#place', (item) => {
    popupPreview.open(item);
  });
  return card.getCard();
}

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();
  const section = new Section(
    {
      items: [{name: popupInputPlaceName.value, link: popupInputImageLink.value}],
      renderer: cardRenderer,
    },
    '.places'
  );
  section.renderAll();

}

const userInfo = new UserInfo({
  userNameSelector: '.profile__full-name',
  userInfoSelector: '.profile__profession'
});

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupFullNameValue.value, popupProfessionValue.value);
}

const popupProfileEdit = new PopupWithForm('.popup_profile', formSubmitHandler);
popupProfileEdit.setEventListeners();

editButton.addEventListener('click', () => {
  popupFullNameValue.value   = userInfo.getUserInfo().userName;
  popupProfessionValue.value = userInfo.getUserInfo().userInfo;
  popupProfileEdit.open();
});

const popupAddCard = new PopupWithForm('.popup_add-card', formAddCardSubmitHandler);
popupAddCard.setEventListeners();

addCardButton.addEventListener('click', () => {
  popupAddCard.open();
});

const section = new Section(
  {
    items: initialCards,
    renderer: cardRenderer,
  },
  '.places'
);

section.renderAll();

