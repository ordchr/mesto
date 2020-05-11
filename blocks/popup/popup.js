let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__button-close');
let popupSaveButton = document.querySelector('.popup__button-save');
let popup = document.querySelector('.popup');
let profileFullName = document.querySelector('.profile__full-name');
let profileProfession = document.querySelector('.profile__profession');
let popupFullNameValue = document.querySelector('.popup__full-name');
let popupProfessionValue = document.querySelector('.popup__profession');


function showEditProfilePopup() {
  popupFullNameValue.value = profileFullName.textContent;
  popupProfessionValue.value = profileProfession.textContent;
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');

}

function closeEditProfilePopup() {
  popup.classList.add('popup_closed');
  popup.classList.remove('popup_opened');
}

function SaveProfile() {
  profileFullName.textContent = popupFullNameValue.value;
  profileProfession.textContent = popupProfessionValue.value;
  closeEditProfilePopup();
}

editButton.addEventListener('click', showEditProfilePopup);
popupSaveButton.addEventListener('click', SaveProfile);
popupCloseButton.addEventListener('click', closeEditProfilePopup);

