import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_add-card');
const popupEditProfile = document.querySelector('.popup_profile');

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

const closePopup = (popupForClose) => {
  popupForClose.classList.add('popup_closed');
  popupForClose.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkEscKeyForPopup);
}

const showPopup = (targetPopup) => {
  targetPopup.classList.remove('popup_closed');
  targetPopup.classList.add('popup_opened');

  // Перехватываем нажатие клавиши Esc для закрытия окна popup
  document.addEventListener('keydown', checkEscKeyForPopup);
}

const checkEscKeyForPopup = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const showPopupPreview = (evt) => {
  popupPreviewImage.src = evt.src;
  const popupPreviewDescription = popupPreview.querySelector('.popup-preview__description');
  popupPreviewDescription.textContent = evt.parentElement.querySelector('.place__title-text').textContent;
  showPopup(popupPreview);
}

const validateOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Карточки
const places = document.querySelector('.places');
places.addEventListener('click', (evt) => {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains('place__title-like')) {
    eventTarget.classList.toggle('place__title-like_selected');
  } else if (eventTarget.classList.contains('place__image-del')) {
    eventTarget.parentElement.remove();
  } else if ( eventTarget.classList.contains('place__image') ) {
    showPopupPreview(eventTarget);
  }
});


const showPopupForm = (targetPopup) => {
  const popupForm = targetPopup.querySelector('.popup__form');
  const formValidator = new FormValidator(validateOptions, popupForm);
  formValidator.validateForm();
  showPopup(targetPopup);
};

const prependCard = (placeName, placeLink) => {
  const places = document.querySelector('.places');

  const card = new Card(placeName, placeLink, '#place');
  places.prepend(card.getCard());
}

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();
  prependCard( popupInputPlaceName.value, popupInputImageLink.value );
  popupInputPlaceName.value = '';
  popupInputImageLink.value = '';
  closePopup(popupAddCard);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileFullName.textContent   = popupFullNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  closePopup(document.querySelector('.popup_opened'));
}

document.querySelector('.popup__form-card-add').addEventListener('submit', formAddCardSubmitHandler);
document.querySelector('.popup__form-edit_profile').addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', () => {
  popupFullNameValue.value   = profileFullName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
  showPopupForm(popupEditProfile);
});

addCardButton.addEventListener('click', () => showPopupForm(popupAddCard));

const setPopupHandlers = (targetPopup) => {
  const buttonClose = targetPopup.querySelector('.popup__button-close')
  buttonClose.addEventListener('click', () => closePopup(targetPopup));

  targetPopup.addEventListener('click', () => closePopup(targetPopup));
  const popupContainer = targetPopup.querySelector('.popup-container');
  popupContainer.addEventListener('click', (evt) => {
    // Остановим обработку события в контейнере, чтобы событие не попало в блок popup
    evt.stopPropagation();
  });

}

setPopupHandlers(popupPreview);

document.querySelectorAll('.popup').forEach(function(targetPopup) {
  setPopupHandlers(targetPopup);
});

const loadDefaultCards = (initialCards) => {
  initialCards.forEach((item) => {
    prependCard(item.name, item.link);
  });
}

loadDefaultCards(initialCards);

document.querySelectorAll('.popup__form').forEach(function(formItem) {
  //enableValidation(formItem, validateOptions);
  const formValidator = new FormValidator(validateOptions, formItem);
  formValidator.enableValidation();
});

