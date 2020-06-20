const editButton           = document.querySelector('.profile__edit-button');
const addCardButton        = document.querySelector('.profile__add-button');
const popupCloseButton     = document.querySelector('.popup__button-close');
const popup                = document.querySelector('.popup');
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

function showPopupPreview(evt) {
  popupPreview.classList.remove('popup_closed');
  popupPreview.classList.add('popup_opened');
  popupPreviewImage.src = evt.src;
  const popupPreviewDescription = popupPreview.querySelector('.popup-preview__description');
  popupPreviewDescription.textContent = evt.parentElement.querySelector('.place__title-text').textContent;
}

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





function showEditProfilePopup() {
  popupFullNameValue.value   = profileFullName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
  popupFormProfileEdit.classList.remove('popup__form_disabled');
  popupFormCardAdd.classList.add('popup__form_disabled');
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  setEventListeners(popupFormProfileEdit);
}

function showAddCardPopup() {
  popupFormProfileEdit.classList.add('popup__form_disabled');
  popupFormCardAdd.classList.remove('popup__form_disabled');
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  setEventListeners(popupFormCardAdd);
}

function closePopup() {
  popup.classList.add('popup_closed');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileFullName.textContent   = popupFullNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  closePopup();
}

function prependCard( placeName, placeLink ) {
  const placeTempate = document.querySelector('#place').content;
  const place = placeTempate.cloneNode(true);
  const placeImage = place.querySelector('.place__image');
  placeImage.src=placeLink;
  placeImage.alt=placeName;
  place.querySelector('.place__title-text').textContent=placeName;
  const places = document.querySelector('.places');
  places.prepend(place);

}

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  prependCard( popupInputPlaceName.value, popupInputImageLink.value );
  closePopup();
}

function closePreviewPopup() {
  popupPreview.classList.add('popup_closed');
  popupPreview.classList.remove('popup_opened');
}

editButton.addEventListener('click', showEditProfilePopup);
popupCloseButton.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click', showAddCardPopup);
popupFormCardAdd.addEventListener('submit', formAddCardSubmitHandler);

popupPreviewCloseButton.addEventListener('click', closePreviewPopup);


function loadDefaultCards(initialCards) {
  initialCards.forEach((item) => {
    prependCard(item.name, item.link);
  });

}

loadDefaultCards(initialCards);

function hasInvalidInput(inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
}


function toggleButtonState(inputList, buttonElement) {
  console.log(inputList);
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button-save_inactive');
  }
};

function setEventListeners(formElement) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  console.log(inputList);
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    isValid(formElement, inputElement)
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Включаем для некоторого поля ввода показ ошибки
function showInputError(formElement, inputElement, errorMessage) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Отключаем для некоторого поля ввода показ ошибки
function hideInputError(formElement, inputElement) {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function isValid(formElement, inputElement) {
  console.log(inputElement.validity);
  console.log(inputElement.validationMessage);
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};



