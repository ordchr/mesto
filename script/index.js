const editButton           = document.querySelector('.profile__edit-button');
const addCardButton        = document.querySelector('.profile__add-button');
const popupCloseButton     = document.querySelector('.popup__button-close');
const popup                = document.querySelector('.popup');
const popupContainer       = document.querySelector('.popup__container');
const editProfileForm      = document.querySelector('.popup__form');
const profileFullName      = document.querySelector('.profile__full-name');
const profileProfession    = document.querySelector('.profile__profession');
const popupFullNameValue   = document.querySelector('.popup__input_full-name');
const popupProfessionValue = document.querySelector('.popup__input_profession');

const popupFormProfileEdit = document.querySelector('.popup__form-profile-edit');
const popupFormCardAdd     = document.querySelector('.popup__form-card-add');
// Форма для добавления карточки

const popupInputPlaceName = document.querySelector('.popup__input_place-name');
const popupInputImageLink = document.querySelector('.popup__input_place-image-link');

const showPopupPreview = (evt) => {
  popupPreview.classList.remove('popup_closed');
  popupPreview.classList.add('popup_opened');
  popupPreviewImage.src = evt.src;
  const popupPreviewDescription = popupPreview.querySelector('.popup-preview__description');
  popupPreviewDescription.textContent = evt.parentElement.querySelector('.place__title-text').textContent;
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

// Превью изображения
const popupPreview = document.querySelector('.popup-preview');
const popupPreviewImage = popupPreview.querySelector('.popup-preview__image');
const popupPreviewCloseButton = document.querySelector('.popup-preview__button-close');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const checkEscKeyInEvent = (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
}

const addEscEventListener = () => {
  // Перехватываем нажатие клавиши Esc для закрытия окна popup
  document.addEventListener('keydown', checkEscKeyInEvent);
}


const showEditProfilePopup = () => {
  popupFullNameValue.value   = profileFullName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
  popupFormProfileEdit.classList.remove('popup__form_disabled');
  popupFormCardAdd.classList.add('popup__form_disabled');
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  validateForm(validateOptions, popupFormProfileEdit);
  addEscEventListener();
}

const showAddCardPopup = () => {
  popupFormProfileEdit.classList.add('popup__form_disabled');
  popupFormCardAdd.classList.remove('popup__form_disabled');
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  validateForm(validateOptions, popupFormCardAdd);
  addEscEventListener();
}

const closePopup = () => {
  popup.classList.add('popup_closed');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkEscKeyInEvent);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileFullName.textContent   = popupFullNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  closePopup();
}

const prependCard = (placeName, placeLink) => {
  const placeTempate = document.querySelector('#place').content;
  const place = placeTempate.cloneNode(true);
  const placeImage = place.querySelector('.place__image');
  placeImage.src=placeLink;
  placeImage.alt=placeName;
  place.querySelector('.place__title-text').textContent=placeName;
  const places = document.querySelector('.places');
  places.prepend(place);

}

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();
  prependCard( popupInputPlaceName.value, popupInputImageLink.value );
  closePopup();
}

const closePreviewPopup = () => {
  popupPreview.classList.add('popup_closed');
  popupPreview.classList.remove('popup_opened');
}

editButton.addEventListener('click', showEditProfilePopup);
popupCloseButton.addEventListener('click', closePopup);

popupContainer.addEventListener('click', (evt) => {
  // Остановим обработку события в контейнере, чтобы событие не попало в блок popup
  evt.stopPropagation();
});
popup.addEventListener('click', closePopup);

editProfileForm.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click', showAddCardPopup);
popupFormCardAdd.addEventListener('submit', formAddCardSubmitHandler);

popupPreviewCloseButton.addEventListener('click', closePreviewPopup);

const loadDefaultCards = (initialCards) => {
  initialCards.forEach((item) => {
    prependCard(item.name, item.link);
  });

}

loadDefaultCards(initialCards);

enableValidation(validateOptions);
