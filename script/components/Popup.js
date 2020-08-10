export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__button-close')
    this._popupContainer = this._popup.querySelector('.popup-container');
  }

  _checkEscKeyForPopup = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleEscClose() {
    document.addEventListener('keydown', this._checkEscKeyForPopup);
  }

  _removeHandleEscClose() {
    document.removeEventListener('keydown', this._checkEscKeyForPopup);
  }

  open() {
    this._popup.classList.remove('popup_closed');
    this._popup.classList.add('popup_opened');
    this._handleEscClose();
  }

  close() {
    console.log(this._popup);
    this._popup.classList.remove('popup_opened');
    this._popup.classList.add('popup_closed');
    this._removeHandleEscClose();
  }

  setEventListeners() {
    this._popupContainer.addEventListener('click', (evt) => {
      // Остановим обработку события в контейнере, чтобы событие не попало в блок popup
      evt.stopPropagation();
    });
    // Закрытие по кнопке
    this._buttonClose.addEventListener('click', _ => this.close());
    // Закрытие по оверлею
    this._popup.addEventListener('click', () => this.close());
  }

}
