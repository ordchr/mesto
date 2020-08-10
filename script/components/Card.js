export class Card {
  constructor(title, link, cardSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    card.querySelector('.place__title-text').textContent=this._title;
    cardImage.src=this._link;
    cardImage.alt=this._title;
    this._setEventListeners(card);

    return card;
  }

  _classImageClickLike(evt) {
    evt.target.classList.toggle('place__title-like_selected');
  }

  _classImageClickDel(evt) {
    evt.target.parentElement.remove();
  }

  _classShowPreview() {
    this._handleCardClick({ link: this._link, title: this._title });
  }

  _setEventListeners(card) {
      card.querySelector('.place__title-like').addEventListener('click', this._classImageClickLike);
      card.querySelector('.place__image-del').addEventListener('click', this._classImageClickDel);
      card.querySelector('.place__image').addEventListener('click', () => this._classShowPreview());
  }

  getCard() {
    return this._makeCard();
  }
}
