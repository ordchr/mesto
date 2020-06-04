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

// Карточки
const places = document.querySelector('.places');
places.addEventListener('click', (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('place__title-like_selected');
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

loadDefaultCards(initialCards);




function showEditProfilePopup() {
  popupFullNameValue.value   = profileFullName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
  popupFormProfileEdit.classList.remove('popup__form_disabled');
  popupFormCardAdd.classList.add('popup__form_disabled');
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');

}

function showAddCardPopup() {
  popupFormProfileEdit.classList.add('popup__form_disabled');
  popupFormCardAdd.classList.remove('popup__form_disabled');
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');

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

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  console.log(popupInputPlaceName);
  unshiftOneCard( popupInputPlaceName.value, popupInputImageLink.value );
  closePopup();
}

editButton.addEventListener('click', showEditProfilePopup);
popupCloseButton.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click', showAddCardPopup);
popupFormCardAdd.addEventListener('submit', formAddCardSubmitHandler);

function loadDefaultCards(initialCards) {
  //console.log(initialCards);
  const place_tempate = document.querySelector('#place').content;
  initialCards.forEach((item) => {
    unshiftOneCard(item.name, item.link);
  });

}

function unshiftOneCard( popupInputPlaceName, popupInputImageLink ) {
  console.log(popupInputPlaceName, popupInputImageLink);
  const place_tempate = document.querySelector('#place').content;
  const place = place_tempate.cloneNode(true);
  //console.log(place);
  place.querySelector('.place__image').src=popupInputImageLink;
  place.querySelector('.place__image').alt=popupInputPlaceName;
  place.querySelector('.place__title-text').textContent=popupInputPlaceName;
  const places = document.querySelector('.places');
  places.prepend(place);

}

