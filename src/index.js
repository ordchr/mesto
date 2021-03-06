import css from '../pages/index.css';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { FormValidator } from './components/FormValidator.js';
import { UserInfo } from './components/UserInfo.js';
import { Api } from './components/Api.js';
import { apiSettings } from './constants.js';
import { PopupWithConfirm } from './components/PopupWithConfirm.js';

const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupFormCardAdd = document.querySelector('.popup__form-card-add');
const popupFormProfileEdit = document.querySelector('.popup__form-edit_profile');
const popupFormUpdateAvatar = document.querySelector('.popup__form-update-avatar');
const popupFullNameValue = document.querySelector('.popup__input_full-name');
const popupProfessionValue = document.querySelector('.popup__input_profession');
const popupProfilePhoto = document.querySelector('.profile__photo');

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
const formUpdateAvatarValidator = new FormValidator(validateOptions, popupFormUpdateAvatar);
formUpdateAvatarValidator.enableValidation();

const popupPreview = new PopupWithImage('.popup-preview');
popupPreview.setEventListeners();

const api = new Api({
  baseUrl: apiSettings.baseUrl,
  headersAuthorization: apiSettings.headersAuthorization,
});

const popupWithConfirm = new PopupWithConfirm('.popup_confirm');
popupWithConfirm.setEventListeners();

const cardRenderer = (placeName, placeLink, likes, ownerId, cardId, myUserId) => {
  const card = new Card(
    {
      data: {
        placeName: placeName,
        placeLink: placeLink,
        likes: likes,
        ownerId: ownerId,
        cardId: cardId,
        myUserId: myUserId,
      },
      handleCardClick: () => {
        popupPreview.open({link: card.link, title: card.title});
      },
      handleDeleteIconClick: (evt) => {
        popupWithConfirm.open();
        popupWithConfirm.setConfirmAction = () => {
          api.deleteCard(card.cardId)
            .then(
              evt.target.parentElement.remove()
            )
            .catch(err => {
              console.log(err);
            });
        };
      },
      handleLikeClick: (evt) => {
        if (card.likedMe()) {
          api.dislikeCard(card.cardId)
            .then(data => {
              card.likes = data.likes;
              evt.target.parentElement.querySelector('.place__title-like-count').textContent = card.likes.length;
              evt.target.classList.toggle('place__title-like_selected');
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          api.likeCard(card.cardId)
            .then(data => {
                card.likes = data.likes;
                evt.target.parentElement.querySelector('.place__title-like-count').textContent = card.likes.length;
                evt.target.classList.toggle('place__title-like_selected');
            })
            .catch(err => {
              console.log(err);
            });
        }
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

const userInfo = new UserInfo({
  userNameSelector: '.profile__full-name',
  userInfoSelector: '.profile__profession'
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, initialCards]) => {
    // Обработка данных пользователя
    const {avatar, _id: myUserId} = userData;
    userInfo.setUserInfo(userData);
    popupProfilePhoto.style.backgroundImage = `url(${avatar})`;
    // Отрисовка карточек
    section.renderAll(initialCards, myUserId);

    // Хэндлер для добавления новой карточки
    const formAddCardSubmitHandler = (evt, popupCloseFunc) => {
      evt.submitter.textContent = 'Сохранение...';
      api.addCard({name: popupInputPlaceName.value, link: popupInputImageLink.value})
        .then(data => {
          section.addItem(
            cardRenderer(
              data.name,
              data.link,
              data.likes,
              data.owner._id,
              data._id,
              myUserId,
            )
          );
        })
        .catch(err => {
          console.log(err);
        })
        .finally(_ => {
          evt.submitter.textContent = 'Сохранить';
          popupCloseFunc();
        });
    };

    const popupAddCard = new PopupWithForm('.popup_add-card', formAddCardSubmitHandler);
    popupAddCard.setEventListeners();

    addCardButton.addEventListener('click', () => {
      popupAddCard.open();
    });

  })
  .catch((err) => {
    // попадаем сюда если один из промисов завершится ошибкой
    console.log(err);
  });


const formSubmitHandler = (evt, popupCloseFunc, inputValues) => {
  evt.submitter.textContent = 'Сохранение...';
  api.updateUserInfo({
    name: inputValues.name,
    about: inputValues.profession
  })
    .then(user => {
      userInfo.setUserInfo(user);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(_ => {
      evt.submitter.textContent = 'Сохранить';
      popupCloseFunc();
    });
}

const popupProfileEdit = new PopupWithForm('.popup_profile', formSubmitHandler);
popupProfileEdit.setEventListeners();

editButton.addEventListener('click', () => {
  popupFullNameValue.value   = userInfo.getUserInfo().userName;
  popupProfessionValue.value = userInfo.getUserInfo().userInfo;
  popupProfileEdit.open();
});

const popupAvatarEdit = new PopupWithForm('.popup_update-avatar', (evt, popupCloseFunc, inputValues) => {
  evt.submitter.textContent = 'Сохранение...';
  api.updateAvatar({
    avatar: inputValues['popup__input_update-avatar-link']
  })
    .then(user => {
      popupProfilePhoto.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(_ => {
      evt.submitter.textContent = 'Сохранить';
      popupCloseFunc();
    });

});

popupAvatarEdit.setEventListeners();
popupProfilePhoto.addEventListener('click', () => {
  popupAvatarEdit.open();
});


