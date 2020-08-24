import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.setConfirmAction();
    });
    this._form.addEventListener('submit', _ => this.close());
    super.setEventListeners();
  }

}
