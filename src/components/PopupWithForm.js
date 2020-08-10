import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, cbFormSubmit) {
    // this._popup = document.querySelector(popupSelector);
    super(popupSelector);
    this._cbFormSubmit = cbFormSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__form');
    this._formInputsValues = this._form.querySelectorAll('.popup__input');
  }

  // Метод собирает данные всех полей формы
  _getInputValues() {
    return Array.from(this._formInputsValues).map((item) => {
      return {
        name: item.name,
        value: item.value,
      }
    })
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._cbFormSubmit);
    this._form.addEventListener('submit', _ => this.close());
    super.setEventListeners();
  }

  close() {
    this._formInputsValues.forEach((item) => {
      item.value = '';
    })
    super.close();
  }

}
