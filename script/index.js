import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { FormValidator } from './components/FormValidator.js';
import { UserInfo } from './components/UserInfo.js';
import { initialCards } from './initial-cards.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// const popupAddCard = document.querySelector('.popup_add-card');
const popupEditProfile = document.querySelector('.popup_profile');
const popupFormCardAdd = document.querySelector('.popup__form-card-add');
const popupFormProfileEdit = document.querySelector('.popup__form-edit_profile');
const profileFullName = document.querySelector('.profile__full-name');
const profileProfession = document.querySelector('.profile__profession');
const popupFullNameValue = document.querySelector('.popup__input_full-name');
const popupProfessionValue = document.querySelector('.popup__input_profession');

// Форма для добавления карточки
const popupInputPlaceName = document.querySelector('.popup__input_place-name');
const popupInputImageLink = document.querySelector('.popup__input_place-image-link');

// Превью изображения
const popupPreview = document.querySelector('.popup-preview');
const popupPreviewImage = popupPreview.querySelector('.popup-preview__image');
const popupPreviewDescription = popupPreview.querySelector('.popup-preview__description');

const closePopup = (popupForClose) => {
  popupForClose.classList.add('popup_closed');
  popupForClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkEscKeyForPopup);
}

// const showPopup = (targetPopup) => {
  // targetPopup.classList.remove('popup_closed');
  // targetPopup.classList.add('popup_opened');

  // // Перехватываем нажатие клавиши Esc для закрытия окна popup
  // document.addEventListener('keydown', checkEscKeyForPopup);
// }

const checkEscKeyForPopup = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// const showPopupPreview = (evtTarget) => {
  // popupPreviewImage.src = evtTarget.src;
  // popupPreviewDescription.textContent = evtTarget.parentElement.querySelector('.place__title-text').textContent;
  // showPopup(popupPreview);
// }

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

// const showPopupForm = (targetPopup, formCardAddValidator) => {
  // const popupForm = targetPopup.querySelector('.popup__form');
  // if (formCardAddValidator) {
    // formCardAddValidator.prepareClearForm();
  // }
  // showPopup(targetPopup);
// };

const popupPreview_ = new PopupWithImage('.popup-preview');
popupPreview_.setEventListeners();

const cardRenderer = (placeName, placeLink) => {
  const card = new Card(placeName, placeLink, '#place', (item) => {
    popupPreview_.open(item);
  });
  return card.getCard();
}

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();
  console.log(evt);
  const section = new Section(
    {
      items: [{name: popupInputPlaceName.value, link: popupInputImageLink.value}],
      renderer: cardRenderer,
    },
    '.places'
  );
  section.renderAll();

  // closePopup(popupAddCard);
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__full-name',
  userInfoSelector: '.profile__profession'
});

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupFullNameValue.value, popupProfessionValue.value);
  // profileFullName.textContent   = popupFullNameValue.value;
  // profileProfession.textContent = popupProfessionValue.value;
  // closePopup(document.querySelector('.popup_opened'));
}

// popupFormCardAdd.addEventListener('submit', formAddCardSubmitHandler);
popupFormProfileEdit.addEventListener('submit', formSubmitHandler);

const popupProfileEdit_ = new PopupWithForm('.popup_profile', formSubmitHandler);
popupProfileEdit_.setEventListeners();


editButton.addEventListener('click', () => {
  // showPopupForm(popupEditProfile);
  popupFullNameValue.value   = userInfo.getUserInfo().userName;
  popupProfessionValue.value = userInfo.getUserInfo().userInfo;
  popupProfileEdit_.open();
});

const popupAddCard_ = new PopupWithForm('.popup_add-card', formAddCardSubmitHandler);
popupAddCard_.setEventListeners();
addCardButton.addEventListener('click', () => {
  popupAddCard_.open();
});

// const setPopupHandlers = (targetPopup) => {
  // const buttonClose = targetPopup.querySelector('.popup__button-close')
  // buttonClose.addEventListener('click', () => closePopup(targetPopup));
  // targetPopup.addEventListener('click', () => closePopup(targetPopup));
  // const popupContainer = targetPopup.querySelector('.popup-container');
  // popupContainer.addEventListener('click', (evt) => {
    // // Остановим обработку события в контейнере, чтобы событие не попало в блок popup
    // evt.stopPropagation();
  // });

// }

// setPopupHandlers(popupPreview);

// document.querySelectorAll('.popup').forEach(function(targetPopup) {
  // setPopupHandlers(targetPopup);
// });

const section = new Section(
  {
    items: initialCards,
    renderer: cardRenderer,
  },
  '.places'
);

section.renderAll();

// const loadDefaultCards = (initialCards) => {
  // initialCards.forEach((item) => {
    // prependCard(item.name, item.link);
  // });
// }

// loadDefaultCards(initialCards);

