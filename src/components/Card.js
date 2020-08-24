import { apiSettings } from '../constants.js';

export class Card {
  constructor({data, handleCardClick, handleDeleteIconClick}, cardSelector) {
    const { placeName, placeLink, likes, ownerId, cardId} = data;
    this.title = placeName;
    this.link = placeLink;
    this._likes = likes;
    this._ownerId = ownerId;
    this.cardId = cardId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleCardDelete = handleDeleteIconClick.bind(this);
  }

  _getTemplate() {
    const cardTempate = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardTempate;
  }

  _makeCard()  {
    const card = this._getTemplate();
    const cardImage = card.querySelector('.place__image');
    card.querySelector('.place__title-text').textContent=this.title;
    card.querySelector('.place__title-like-count').textContent=this._likes;
    if (apiSettings.myId !== this._ownerId) {
      card.querySelector('.place__image-del').classList.add('place__image-del_hidden');
    }
    cardImage.src=this.link;
    cardImage.alt=this.title;
    this._setEventListeners(card);

    return card;
  }

  _classImageClickLike(evt) {
    evt.target.classList.toggle('place__title-like_selected');
  }

  // _classImageClickDel(evt) {
    // console.log(this._cardId);
    // console.log(this._handleCardDelete);
    // this._handleCardDelete(this._cardId, );
  // }

  _classShowPreview() {
    this._handleCardClick({ link: this.link, title: this.title });
  }

  _setEventListeners(card) {
      card.querySelector('.place__title-like').addEventListener('click', this._classImageClickLike);
      card.querySelector('.place__image-del').addEventListener('click', this._handleCardDelete);
      card.querySelector('.place__image').addEventListener('click', () => this._classShowPreview());
  }

  getCard() {
    return this._makeCard();
  }
}
