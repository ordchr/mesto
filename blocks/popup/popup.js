const editButton           = document.querySelector('.profile__edit-button');
const popupCloseButton     = document.querySelector('.popup__button-close');
const popup                = document.querySelector('.popup');
const editProfileForm      = document.querySelector('.popup__form');
const profileFullName      = document.querySelector('.profile__full-name');
const profileProfession    = document.querySelector('.profile__profession');
const popupFullNameValue   = document.querySelector('.popup__input_full-name');
const popupProfessionValue = document.querySelector('.popup__input_profession');


function showEditProfilePopup() {
  popupFullNameValue.value   = profileFullName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');

}

function closeEditProfilePopup() {
  popup.classList.add('popup_closed');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileFullName.textContent   = popupFullNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  closeEditProfilePopup();
}

editButton.addEventListener('click', showEditProfilePopup);
popupCloseButton.addEventListener('click', closeEditProfilePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
