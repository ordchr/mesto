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

const showPopup = (targetPopup, submitHandler) => {
  targetPopup.classList.remove('popup_closed');
  targetPopup.classList.add('popup_opened');

  addEscEventListenerPopup();
  targetPopup.addEventListener('click', () => closePopup(targetPopup));

  const popupContainer = targetPopup.querySelector('.popup-container');
  popupContainer.addEventListener('click', (evt) => {
    // Остановим обработку события в контейнере, чтобы событие не попало в блок popup
    evt.stopPropagation();
  });

  const popupCloseButton = targetPopup.querySelector('.popup__button-close');
  popupCloseButton.addEventListener('click', () => closePopup(targetPopup));
}

const checkEscKeyForPopup = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const addEscEventListenerPopup = () => {
  // Перехватываем нажатие клавиши Esc для закрытия окна popup
  document.addEventListener('keydown', checkEscKeyForPopup);
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

const showPopupForm = (targetPopup, submitHandler) => {
  const popupForm = targetPopup.querySelector('.popup__form');
  validateForm(validateOptions, popupForm);
  popupForm.addEventListener('submit', submitHandler);
  showPopup(targetPopup);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileFullName.textContent   = popupFullNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  closePopup(document.querySelector('.popup_opened'));
}

const createCard = (placeName, placeLink) => {
  const placeTempate = document.querySelector('#place').content;
  const place = placeTempate.cloneNode(true);
  const placeImage = place.querySelector('.place__image');
  place.querySelector('.place__title-text').textContent=placeName;
  placeImage.src=placeLink;
  placeImage.alt=placeName;
  return place;
}

const prependCard = (placeName, placeLink) => {
  const places = document.querySelector('.places');
  places.prepend(createCard(placeName, placeLink));
}

const formAddCardSubmitHandler = (evt) => {
  evt.preventDefault();
  prependCard( popupInputPlaceName.value, popupInputImageLink.value );
  popupInputPlaceName.value = '';
  popupInputImageLink.value = '';
  closePopup(document.querySelector('.popup_opened'));
}

editButton.addEventListener('click', () => {
  popupFullNameValue.value   = profileFullName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
  showPopupForm(popupEditProfile, formSubmitHandler);
});

addCardButton.addEventListener('click', () => showPopupForm(popupAddCard, formAddCardSubmitHandler));

const loadDefaultCards = (initialCards) => {
  initialCards.forEach((item) => {
    prependCard(item.name, item.link);
  });
}

loadDefaultCards(initialCards);

document.querySelectorAll('.popup__form').forEach(function(formItem) {
  enableValidation(formItem, validateOptions);
});

