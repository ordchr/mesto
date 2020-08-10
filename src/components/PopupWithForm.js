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
    const formValues = {};
    this._formInputsValues.forEach( input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._cbFormSubmit(this._getInputValues());
    });
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
