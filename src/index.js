import css from '../pages/index.css';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { FormValidator } from './components/FormValidator.js';
import { UserInfo } from './components/UserInfo.js';
import { Api } from './components/Api.js';
import { initialCards } from './initial-cards.js';
import { apiSettings } from './constants.js';
import { PopupWithConfirm } from './components/PopupWithConfirm.js';

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

const popupWithConfirm = new PopupWithConfirm('.popup_confirm');
popupWithConfirm.setEventListeners();

const cardRenderer = (placeName, placeLink, likes, ownerId, cardId) => {
  const card = new Card(
    {
      data: {
        placeName: placeName,
        placeLink: placeLink,
        likes: likes,
        ownerId,
        cardId,
      },
      handleCardClick: () => {
        popupPreview.open({link: card.link, title: card.title});
      },
      handleDeleteIconClick: (evt) => {
        popupWithConfirm.open();
        popupWithConfirm.setConfirmAction = () => {
          api.deleteCard(card.cardId).then(
            evt.target.parentElement.remove()
          );
        };
      },
    },
    '#place',
  );
  return card.getCard();
}

const section = new Section(
  {
    renderer: cardRenderer,
  },
  '.places'
);

api.getInitialCards().then((items) => {
  section.renderAll(items);
});

const formAddCardSubmitHandler = () => {
  api.addCard({name: popupInputPlaceName.value, link: popupInputImageLink.value})
    .then(data => {
      section.addItem(
        cardRenderer(
          data.name,
          data.link,
          data.likes.length,
          data.owner._id,
          data._id
        )
      );
    })
};


const userInfo = new UserInfo({
  userNameSelector: '.profile__full-name',
  userInfoSelector: '.profile__profession'
});

api.getUserInfo().then(({name, about, avatar}) => {
  const inputFullName = document.querySelector('.profile__full-name');
  const inputProfession = document.querySelector('.profile__profession');
  inputFullName.textContent = name;
  inputProfession.textContent = about;
  document.querySelector('.profile__photo').src = avatar;
});

const formSubmitHandler = (inputValues) => {
  api.updateUserInfo({name: inputValues.name, about: inputValues.profession}).then((user) => {
    userInfo.setUserInfo({name: user.name, profession: user.about});
  });
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


