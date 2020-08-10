import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPreviewImage = this._popup.querySelector('.popup-preview__image');
    this._popupPreviewDescription = this._popup.querySelector('.popup-preview__description');
  }

  open({link, title}) {
    this._popupPreviewImage.src = link;
    this._popupPreviewDescription.textContent = title;
    super.open();
  }
}
