import { apiSettings } from '../constants.js';

export class Card {
  constructor({data, handleCardClick, handleDeleteIconClick, handleLikeClick}, cardSelector) {
    const { placeName, placeLink, likes, ownerId, cardId} = data;
    this.title = placeName;
    this.link = placeLink;
    this.likes = likes;
    this._ownerId = ownerId;
    this.cardId = cardId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleCardDelete = handleDeleteIconClick.bind(this);
    this._handleLikeClick = handleLikeClick;
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
    card.querySelector('.place__title-like-count').textContent=this.likes.length;
    if (apiSettings.myId !== this._ownerId) {
      card.querySelector('.place__image-del').classList.add('place__image-del_hidden');
    }
    if (this.likedMe()) {
      card.querySelector('.place__title-like').classList.add('place__title-like_selected');
    }
    cardImage.src=this.link;
    cardImage.alt=this.title;
    this._setEventListeners(card);

    return card;
  }

  _classImageClickLike(evt) {
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
      card.querySelector('.place__title-like').addEventListener('click', this._handleLikeClick);
      card.querySelector('.place__image-del').addEventListener('click', this._handleCardDelete);
      card.querySelector('.place__image').addEventListener('click', () => this._classShowPreview());
  }

  likedMe() {
    console.log(this.likes);
    return this.likes.some((element) => {
      return element._id === apiSettings.myId ? 1 : 0;
    })
  }

  getCard() {
    return this._makeCard();
  }
}
